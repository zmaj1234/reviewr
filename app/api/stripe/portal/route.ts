import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.stripe_customer_id) {
    return NextResponse.redirect(new URL('/settings', req.url))
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer:   profile.stripe_customer_id,
    return_url: `${req.nextUrl.origin}/settings`,
  })

  return NextResponse.redirect(session.url)
}
