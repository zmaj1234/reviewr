import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Sidebar } from '@/components/layout/sidebar'
import { ToastProvider } from '@/components/ui/toast'
import { TrialGate } from '@/components/trial-gate'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) redirect('/login')

    // Auto-accept any pending team invite matching this user's email
    await supabase
      .from('team_members')
      .update({ member_user_id: user.id, accepted_at: new Date().toISOString() })
      .eq('member_email', user.email!)
      .is('member_user_id', null)

    // Get user's plan (default solo if no profile row yet)
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle()
    const plan: 'solo' | 'growth' = (profile?.plan as 'solo' | 'growth') ?? 'solo'

    // Trial expiry check: if no active Stripe subscription and account > 7 days old, redirect to pricing
    const hasSubscription = !!profile?.stripe_customer_id
    const createdAt = new Date(user.created_at)
    const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    const trialExpired = !hasSubscription && daysSinceCreation > 7

    // Check if this user is an accepted team member for someone else's account
    const { data: teamMembership } = await supabase
      .from('team_members')
      .select('owner_id, role')
      .eq('member_user_id', user.id)
      .not('accepted_at', 'is', null)
      .maybeSingle()

    const isManager = !!teamMembership
    let ownerName = ''
    if (isManager && teamMembership) {
      const admin = createAdminClient()
      const { data: ownerData } = await admin.auth.admin.getUserById(teamMembership.owner_id)
      ownerName =
        ownerData.user?.user_metadata?.full_name ??
        ownerData.user?.email?.split('@')[0] ??
        'Owner'
    }

    return (
      <ToastProvider>
        <div className="min-h-screen bg-bg">
          <Sidebar
            userEmail={user.email ?? ''}
            plan={plan}
            isManager={isManager}
            ownerName={ownerName}
          />
          <main className="ml-[220px] min-h-screen">
            {children}
          </main>
          <TrialGate trialExpired={trialExpired} />
        </div>
      </ToastProvider>
    )
  } catch {
    redirect('/login')
  }
}
