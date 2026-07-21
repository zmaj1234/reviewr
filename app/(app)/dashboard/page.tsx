import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { DashboardClient } from './dashboard-client'
import type { Business, Review } from '@/lib/types'

export default async function DashboardPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    redirect('/login')
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/login')

  // Check if this user is a manager acting on behalf of an owner
  const { data: teamMembership } = await supabase
    .from('team_members')
    .select('owner_id')
    .eq('member_user_id', user.id)
    .not('accepted_at', 'is', null)
    .maybeSingle()

  const isManager = !!teamMembership
  const effectiveUserId = teamMembership ? teamMembership.owner_id : user.id
  let ownerName = ''

  const admin = createAdminClient()

  if (isManager) {
    const { data: ownerData } = await admin.auth.admin.getUserById(effectiveUserId)
    ownerName =
      ownerData.user?.user_metadata?.full_name ??
      ownerData.user?.email?.split('@')[0] ??
      'Owner'
  }

  // Fetch businesses — use admin client for managers to bypass RLS
  const businessQuery = isManager
    ? admin.from('businesses').select('*').eq('user_id', effectiveUserId).eq('active', true)
    : supabase.from('businesses').select('*').eq('user_id', user.id).eq('active', true)

  const { data: businesses } = await businessQuery

  if (!businesses || businesses.length === 0) redirect('/connect')

  const businessIds = businesses.map((b: Business) => b.id)

  const reviewQuery = isManager
    ? admin.from('reviews').select('*').in('business_id', businessIds).order('created_at', { ascending: false }).limit(100)
    : supabase.from('reviews').select('*').in('business_id', businessIds).order('created_at', { ascending: false }).limit(100)

  const { data: reviews } = await reviewQuery

  const pending = (reviews ?? []).filter((r: Review) => r.status === 'pending_approval')
  const posted  = (reviews ?? []).filter((r: Review) => r.status === 'posted')

  const now = new Date()
  const thisMonthAll = (reviews ?? []).filter((r: Review) => {
    const d = new Date(r.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthPosted = posted.filter((r: Review) => {
    const d = new Date(r.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '—'

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 7)
  const recentPosted = posted.filter((r: Review) => new Date(r.posted_at ?? r.created_at) > cutoff)

  return (
    <Suspense>
      <DashboardClient
        businesses={businesses}
        pendingReviews={pending}
        recentPostedReviews={recentPosted}
        isManager={isManager}
        ownerName={ownerName}
        stats={{
          totalThisMonth: thisMonthAll.length,
          pendingCount: pending.length,
          postedThisMonth: thisMonthPosted.length,
          avgRating,
        }}
      />
    </Suspense>
  )
}
