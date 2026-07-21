import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRICE_IDS } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const plan = req.nextUrl.searchParams.get('plan') as 'solo' | 'growth' | null

  if (!plan || !['solo', 'growth'].includes(plan)) {
    return NextResponse.redirect(new URL('/#cta', req.url))
  }

  let supabase
  try {
    supabase = await createClient()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  // Check if they already have a customer ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle()

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    // Growth requires card upfront; Solo is card-free during trial
    payment_method_collection: plan === 'growth' ? 'always' : 'if_required',
    line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
    subscription_data: {
      trial_period_days: 7,
      metadata: { supabase_user_id: user.id, plan },
    },
    metadata: { supabase_user_id: user.id, plan },
    ...(profile?.stripe_customer_id
      ? { customer: profile.stripe_customer_id }
      : { customer_email: user.email }
    ),
    success_url: `${req.nextUrl.origin}/dashboard?subscribed=1`,
    cancel_url:  `${req.nextUrl.origin}/#cta`,
  })

  if (!session.url) return NextResponse.redirect(new URL('/#cta', req.url))
  return NextResponse.redirect(session.url)
}
