import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialReminderEmail } from '@/lib/email'

// Vercel cron — runs daily at 10:00 UTC
// Finds users whose trial ends in ~2 days and sends a reminder

export async function GET(req: NextRequest) {
  // Verify this is called by Vercel cron (or manually with the secret)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()

  // Get all auth users
  const { data: { users }, error } = await admin.auth.admin.listUsers({ perPage: 1000 })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const now = Date.now()
  const DAY = 24 * 60 * 60 * 1000

  // Users created between 4.5 and 5.5 days ago = trial ends in ~1.5–2.5 days
  const candidates = users.filter(u => {
    const age = now - new Date(u.created_at).getTime()
    return age >= 4.5 * DAY && age < 5.5 * DAY
  })

  let sent = 0

  for (const user of candidates) {
    if (!user.email) continue

    // Skip if they already have a subscription
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.stripe_customer_id) continue

    const trialEndsAt = new Date(new Date(user.created_at).getTime() + 7 * DAY)
    const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null

    try {
      await sendTrialReminderEmail({ toEmail: user.email, name, trialEndsAt })
      sent++
    } catch {
      // Log but continue
      console.error(`Failed to send trial reminder to ${user.email}`)
    }
  }

  return NextResponse.json({ ok: true, sent, checked: candidates.length })
}
