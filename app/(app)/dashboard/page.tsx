import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from './dashboard-client'
import type { Business, Review } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .eq('active', true)

  if (!businesses || businesses.length === 0) {
    redirect('/connect')
  }

  const businessIds = businesses.map((b: Business) => b.id)

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .in('business_id', businessIds)
    .order('created_at', { ascending: false })
    .limit(100)

  const pending = (reviews ?? []).filter((r: Review) => r.status === 'pending_approval')
  const posted = (reviews ?? []).filter((r: Review) => r.status === 'posted')
  const thisMonthPosted = posted.filter((r: Review) => {
    const d = new Date(r.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthAll = (reviews ?? []).filter((r: Review) => {
    const d = new Date(r.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '—'

  const recentPosted = posted.filter((r: Review) => {
    const d = new Date(r.posted_at ?? r.created_at)
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    return d > cutoff
  })

  return (
    <DashboardClient
      businesses={businesses}
      pendingReviews={pending}
      recentPostedReviews={recentPosted}
      stats={{
        totalThisMonth: thisMonthAll.length,
        pendingCount: pending.length,
        postedThisMonth: thisMonthPosted.length,
        avgRating,
      }}
    />
  )
}
