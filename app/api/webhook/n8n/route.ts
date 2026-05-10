import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

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
        business_id: body.business_id,
        review_id: body.review_id,
        rating: body.rating,
        review_text: body.review_text ?? null,
        reviewer_name: body.reviewer_name ?? null,
        review_time: body.review_time ?? null,
        language: body.language ?? 'en',
        sentiment: body.sentiment ?? null,
        draft_reply: body.draft_reply ?? null,
        flags: body.flags ?? [],
        status: 'pending_approval',
      },
      { onConflict: 'business_id,review_id' }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data.id })
}
