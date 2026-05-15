import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendReviewNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== process.env.N8N_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    business_id: string
    review_id: string
    rating: number
    review_text?: string
    reviewer_name?: string
    review_time?: string
    language?: string
    sentiment?: string
    draft_reply?: string
    flags?: string[]
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reviews')
    .upsert(
      {
        business_id:   body.business_id,
        review_id:     body.review_id,
        rating:        body.rating,
        review_text:   body.review_text   ?? null,
        reviewer_name: body.reviewer_name ?? null,
        review_time:   body.review_time   ?? null,
        language:      body.language      ?? 'en',
        sentiment:     body.sentiment     ?? null,
        draft_reply:   body.draft_reply   ?? null,
        flags:         body.flags         ?? [],
        status:        'pending_approval',
      },
      { onConflict: 'business_id,review_id' }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send email notification if business has an owner_email
  if (body.draft_reply) {
    const { data: business } = await supabase
      .from('businesses')
      .select('owner_email, business_name')
      .eq('id', body.business_id)
      .single()

    if (business?.owner_email) {
      try {
        await sendReviewNotification({
          toEmail:      business.owner_email,
          businessName: business.business_name,
          reviewId:     data.id,
          reviewerName: body.reviewer_name ?? 'Anonymous',
          rating:       body.rating,
          reviewText:   body.review_text   ?? '',
          reviewTime:   body.review_time   ?? null,
          draftReply:   body.draft_reply,
          flags:        body.flags         ?? [],
        })
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr)
      }
    }
  }

  return NextResponse.json({ ok: true, id: data.id })
}
