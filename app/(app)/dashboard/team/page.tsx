import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TeamClient } from './team-client'
import type { TeamMember } from '@/lib/types'

export default async function TeamPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    redirect('/login')
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .maybeSingle()
  const plan: 'solo' | 'growth' = (profile?.plan as 'solo' | 'growth') ?? 'solo'

  if (plan !== 'growth') {
    return <TeamUpgradePrompt />
  }

  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .eq('owner_id', user.id)
    .order('invited_at', { ascending: false })

  return (
    <TeamClient
      members={(members ?? []) as TeamMember[]}
      maxSeats={3}
    />
  )
}

function TeamUpgradePrompt() {
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-primary">Team</h1>
        <p className="text-secondary text-sm mt-1">Invite team members to manage reviews together</p>
      </div>
      <div className="card p-10 max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-primary mb-3">Team seats are a Growth feature</h2>
        <p className="text-secondary text-sm leading-relaxed mb-6">
          Upgrade to Growth to invite up to 3 team members who can approve and edit replies across all your locations.
        </p>
        <a
          href="mailto:hello@reviewr.app?subject=Upgrade to Growth"
          className="btn btn-primary px-6 py-2.5 inline-flex"
        >
          Contact us to upgrade →
        </a>
      </div>
    </div>
  )
}
