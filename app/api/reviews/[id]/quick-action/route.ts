import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyActionToken } from '@/lib/email-tokens'

function htmlResponse(title: string, message: string, color = '#16a34a') {
  return new NextResponse(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif;
             background: #f2f2f7; display: flex; align-items: center; justify-content: center;
             min-height: 100vh; margin: 0; }
      .card { background: white; border-radius: 20px; padding: 40px 48px; text-align: center;
              box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06); max-width: 400px; }
      .icon { font-size: 2.5rem; margin-bottom: 16px; }
      h1 { font-size: 1.4rem; color: #1c1c1e; margin: 0 0 8px; font-weight: 600; }
      p { color: #6c6c70; font-size: 0.9rem; margin: 0 0 24px; line-height: 1.5; }
      a { display: inline-block; background: ${color}; color: white; text-decoration: none;
          padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 0.875rem; }
    </style></head>
    <body><div class="card">
      <div class="icon">${color === '#16a34a' ? '✓' : '🗑️'}</div>
      <h1>${title}</h1><p>${message}</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Go to dashboard</a>
    </div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token  = req.nextUrl.searchParams.get('token')
  const action = req.nextUrl.searchParams.get('action')

  // Validate token
  if (!token || !action) {
    return htmlResponse('Invalid link', 'This link is missing required parameters.', '#ff3b30')
  }

  const verified = verifyActionToken(token)
  if (!verified || verified.reviewId !== params.id || verified.action !== action) {
    return htmlResponse('Link expired', 'This link has expired or is invalid. Open the dashboard to take action.', '#ff9500')
  }

  if (!['approve', 'discard'].includes(action)) {
    return htmlResponse('Invalid action', 'This action is not supported via email link.', '#ff3b30')
  }

  const admin = createAdminClient()

  // Fetch review
  const { data: review, error } = await admin
    .from('reviews')
    .select('*, businesses!inner(user_id)')
    .eq('id', params.id)
    .single()

  if (error || !review) {
    return htmlResponse('Review not found', 'This review may have already been handled.', '#ff9500')
  }

  if (review.status !== 'pending_approval') {
    return htmlResponse(
      'Already handled',
      `This review has already been ${review.status === 'posted' ? 'approved and posted' : review.status}.`,
      '#ff9500'
    )
  }

  const now = new Date().toISOString()

  if (action === 'discard') {
    await admin.from('reviews').update({ status: 'discarded', discarded_at: now }).eq('id', params.id)
    return htmlResponse('Review discarded', 'The review has been discarded successfully.', '#6c6c70')
  }

  // approve — call n8n to post reply to Google
  const n8nUrl = process.env.N8N_WEBHOOK_URL
  let n8nFailed = false

  if (n8nUrl) {
    try {
      const res = await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          review_id: params.id,
          final_reply: review.draft_reply,
          business_id: review.business_id,
        }),
      })
      if (!res.ok) n8nFailed = true
    } catch {
      n8nFailed = true
    }
  }

  await admin.from('reviews').update({
    status:      n8nFailed ? 'pending_approval' : 'posted',
    final_reply: review.draft_reply,
    posted_at:   n8nFailed ? null : now,
  }).eq('id', params.id)

  if (!n8nFailed) {
    // Append to past_responses
    const { data: biz } = await admin.from('businesses').select('past_responses').eq('id', review.business_id).single()
    const updated = [...(biz?.past_responses ?? []), review.draft_reply].slice(-20)
    await admin.from('businesses').update({ past_responses: updated }).eq('id', review.business_id)
  }

  if (n8nFailed) {
    return htmlResponse('Saved — posting delayed', 'Reply saved but posting to Google could not be reached. Check your dashboard.', '#ff9500')
  }

  return htmlResponse('Reply posted ✓', 'Your reply has been posted to Google. The reviewer will see it shortly.')
}
