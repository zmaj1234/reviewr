import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ReviewAction } from '@/lib/types'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { action: ReviewAction; final_reply?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { action, final_reply } = body

  if (!['approve', 'edit_and_post', 'edit_save', 'discard'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  // Fetch review and verify ownership
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('*, businesses!inner(user_id)')
    .eq('id', params.id)
    .single()

  if (reviewError || !review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  const isOwner = review.businesses.user_id === user.id

  // Allow managers (team members) to act on behalf of the owner
  if (!isOwner) {
    const { data: membership } = await supabase
      .from('team_members')
      .select('id')
      .eq('member_user_id', user.id)
      .eq('owner_id', review.businesses.user_id)
      .not('accepted_at', 'is', null)
      .maybeSingle()

    if (!membership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const now = new Date().toISOString()

  if (action === 'discard') {
    await supabase
      .from('reviews')
      .update({ status: 'discarded', discarded_at: now })
      .eq('id', params.id)

    return NextResponse.json({ ok: true })
  }

  if (action === 'edit_save') {
    await supabase
      .from('reviews')
      .update({ draft_reply: final_reply, edited_at: now })
      .eq('id', params.id)

    return NextResponse.json({ ok: true })
  }

  // approve or edit_and_post — call n8n webhook
  const n8nUrl = process.env.N8N_WEBHOOK_URL
  let n8nFailed = false

  if (n8nUrl) {
    try {
      const res = await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          review_id: params.id,
          final_reply: final_reply ?? review.draft_reply,
          business_id: review.business_id,
        }),
      })
      if (!res.ok) n8nFailed = true
    } catch {
      n8nFailed = true
    }
  }

  // Update review status in Supabase
  await supabase
    .from('reviews')
    .update({
      status: n8nFailed ? 'pending_approval' : 'posted',
      final_reply: final_reply ?? review.draft_reply,
      posted_at: n8nFailed ? null : now,
    })
    .eq('id', params.id)

  // Append final_reply to businesses.past_responses (max 20 entries)
  if (!n8nFailed) {
    const postedReply = final_reply ?? review.draft_reply
    const { data: biz } = await supabase
      .from('businesses')
      .select('past_responses')
      .eq('id', review.business_id)
      .single()

    const existing: string[] = biz?.past_responses ?? []
    const updated = [...existing, postedReply].slice(-20)

    await supabase
      .from('businesses')
      .update({ past_responses: updated })
      .eq('id', review.business_id)
  }

  if (n8nFailed) {
    return NextResponse.json({
      ok: true,
      warning: 'Reply saved but posting to Google may be delayed. The n8n workflow could not be reached.',
    })
  }

  return NextResponse.json({ ok: true })
}
