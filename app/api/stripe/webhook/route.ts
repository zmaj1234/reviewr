import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, PRICE_IDS } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialReminderEmail, sendSubscriptionConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const admin = createAdminClient()

  // ── checkout.session.completed ─────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId  = session.metadata?.supabase_user_id
    const plan    = session.metadata?.plan as 'solo' | 'growth' | undefined

    if (userId && plan) {
      await admin.from('profiles').upsert({
        id:                     userId,
        plan,
        stripe_customer_id:     session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }, { onConflict: 'id' })

      // Send subscription confirmation email
      try {
        const { data: authUser } = await admin.auth.admin.getUserById(userId)
        if (authUser.user?.email) {
          const name = authUser.user.user_metadata?.full_name ?? null
          await sendSubscriptionConfirmationEmail({
            toEmail: authUser.user.email,
            name,
            plan,
          })
        }
      } catch {
        // Non-fatal
      }
    }
  }

  // ── customer.subscription.updated ──────────────────────────────────────────
  if (event.type === 'customer.subscription.updated') {
    const sub        = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const priceId    = sub.items.data[0]?.price.id
    const plan: 'solo' | 'growth' = priceId === PRICE_IDS.growth ? 'growth' : 'solo'

    if (sub.status === 'active' || sub.status === 'trialing') {
      await admin.from('profiles').update({ plan }).eq('stripe_customer_id', customerId)
    } else if (['canceled', 'unpaid', 'past_due'].includes(sub.status)) {
      await admin.from('profiles').update({ plan: 'solo', stripe_subscription_id: null }).eq('stripe_customer_id', customerId)
    }
  }

  // ── customer.subscription.deleted ──────────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const sub        = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    await admin.from('profiles').update({ plan: 'solo', stripe_subscription_id: null }).eq('stripe_customer_id', customerId)
  }

  // ── customer.subscription.trial_will_end ───────────────────────────────────
  if (event.type === 'customer.subscription.trial_will_end') {
    const sub        = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const trialEnd   = sub.trial_end ? new Date(sub.trial_end * 1000) : null

    if (trialEnd) {
      try {
        const customer = await getStripe().customers.retrieve(customerId)
        if (customer && !customer.deleted && 'email' in customer && customer.email) {
          const { data: profile } = await admin
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .maybeSingle()

          if (profile) {
            const { data: authUser } = await admin.auth.admin.getUserById(profile.id)
            const name = authUser.user?.user_metadata?.full_name ?? null
            await sendTrialReminderEmail({
              toEmail: customer.email,
              name,
              trialEndsAt: trialEnd,
            })
          }
        }
      } catch {
        // Non-fatal
      }
    }
  }

  return NextResponse.json({ received: true })
}
