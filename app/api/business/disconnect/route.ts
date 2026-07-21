import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Expect a business_id in the body; fall back to the user's only active business
  let businessId: string | null = null
  try {
    const body = await req.json()
    businessId = body.business_id ?? null
  } catch { /* no body is fine */ }

  if (!businessId) {
    // Fall back: get first active business for this user
    const { data } = await supabase
      .from('businesses')
      .select('id')
      .eq('user_id', user.id)
      .eq('active', true)
      .limit(1)
      .single()
    businessId = data?.id ?? null
  }

  if (!businessId) {
    return NextResponse.json({ error: 'No active business found' }, { status: 404 })
  }

  const { error } = await supabase
    .from('businesses')
    .update({
      gbp_access_token:    null,
      gbp_refresh_token:   null,
      gbp_account_id:      null,
      gbp_location_id:     null,
      gbp_token_expires_at: null,
      active: false,
    })
    .eq('id', businessId)
    .eq('user_id', user.id) // safety: ensure ownership

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
