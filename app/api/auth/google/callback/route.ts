import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (!code) {
    return NextResponse.redirect(`${appUrl}/connect?error=no_code`)
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      redirect_uri: `${appUrl}/api/auth/google/callback`,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${appUrl}/connect?error=token_exchange_failed`)
  }

  const tokens = await tokenRes.json()
  const { access_token, refresh_token, expires_in } = tokens

  // Fetch GBP accounts
  let locations: { name: string; title: string; accountId: string; locationId: string }[] = []

  try {
    const accountsRes = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
    const accountsData = await accountsRes.json()
    console.log('[GBP] accounts response:', JSON.stringify(accountsData))
    const accounts = accountsData.accounts ?? []

    for (const account of accounts) {
      const accountId = account.name.split('/').pop()
      const locRes = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      const locData = await locRes.json()
      console.log('[GBP] locations response for', account.name, ':', JSON.stringify(locData))
      const locs = locData.locations ?? []
      for (const loc of locs) {
        const locationId = loc.name.split('/').pop()
        locations.push({ name: loc.name, title: loc.title ?? 'Unnamed', accountId, locationId })
      }
    }
  } catch (err) {
    console.error('[GBP] fetch error:', err)
  }

  // Store tokens temporarily in user auth metadata (safe for multi-location Growth users)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString()
    await supabase.auth.updateUser({
      data: {
        temp_gbp_access_token:  access_token,
        temp_gbp_refresh_token: refresh_token,
        temp_gbp_expires_at:    expiresAt,
      }
    })
  }

  const encodedLocations = encodeURIComponent(JSON.stringify(locations))
  return NextResponse.redirect(
    `${appUrl}/connect?step=2&locations=${encodedLocations}`
  )
}
