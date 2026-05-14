import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Called by n8n before making GBP API requests to ensure the token is fresh.
// Secured with the same webhook secret used for the review ingest endpoint.
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')
  if (secret !== process.env.N8N_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { business_id: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.business_id) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: business, error: fetchError } = await supabase
    .from('businesses')
    .select('id, gbp_refresh_token, gbp_token_expires_at')
    .eq('id', body.business_id)
    .single()

  if (fetchError || !business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  if (!business.gbp_refresh_token) {
    return NextResponse.json({ error: 'No refresh token stored' }, { status: 422 })
  }

  // Return cached token if still valid for at least 5 minutes
  if (business.gbp_token_expires_at) {
    const expiresAt = new Date(business.gbp_token_expires_at).getTime()
    if (expiresAt - Date.now() > 5 * 60 * 1000) {
      const { data: full } = await supabase
        .from('businesses')
        .select('gbp_access_token')
        .eq('id', body.business_id)
        .single()
      return NextResponse.json({ access_token: full?.gbp_access_token })
    }
  }

  // Refresh with Google
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      refresh_token: business.gbp_refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!tokenRes.ok) {
    const detail = await tokenRes.text()
    return NextResponse.json({ error: 'Token refresh failed', detail }, { status: 502 })
  }

  const tokens = await tokenRes.json()
  const { access_token, expires_in } = tokens
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString()

  await supabase
    .from('businesses')
    .update({ gbp_access_token: access_token, gbp_token_expires_at: expiresAt })
    .eq('id', body.business_id)

  return NextResponse.json({ access_token })
}
