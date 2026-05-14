import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsClient } from './settings-client'
import type { Business } from '@/lib/types'

export default async function SettingsPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    redirect('/login')
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <SettingsClient
      user={{ id: user.id, email: user.email ?? '', name: user.user_metadata?.full_name ?? '' }}
      business={business as Business | null}
    />
  )
}
