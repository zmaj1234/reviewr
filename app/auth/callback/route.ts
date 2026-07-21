import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Send welcome email for new users (created within the last 5 minutes)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const ageMs = Date.now() - new Date(user.created_at).getTime()
          const isNewUser = ageMs < 5 * 60 * 1000
          if (isNewUser && user.email) {
            const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null
            await sendWelcomeEmail({ toEmail: user.email, name })
          }
        }
      } catch {
        // Non-fatal — never block the user from signing in
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=callback_failed`)
}
