import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AnalyticsClient } from './analytics-client'
import type { Business, Review } from '@/lib/types'

interface WeekData {
  label: string
  count: number
  avgRating: number | null
}

function computeWeeks(reviews: Review[]): WeekData[] {
  const now = new Date()
  return Array.from({ length: 8 }, (_, i) => {
    const weekEnd = new Date(now)
    weekEnd.setDate(weekEnd.getDate() - i * 7)
    const weekStart = new Date(weekEnd)
    weekStart.setDate(weekStart.getDate() - 7)

    const label = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const weekReviews = reviews.filter(r => {
      const d = new Date(r.created_at)
      return d >= weekStart && d < weekEnd
    })

    const avgRating = weekReviews.length
      ? weekReviews.reduce((s, r) => s + r.rating, 0) / weekReviews.length
      : null

    return { label, count: weekReviews.length, avgRating }
  }).reverse()
}

export default async function AnalyticsPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    redirect('/login')
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .maybeSingle()
  const plan: 'solo' | 'growth' = (profile?.plan as 'solo' | 'growth') ?? 'solo'

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .eq('active', true)

  if (!businesses || businesses.length === 0) redirect('/connect')

  const businessName = businesses.length === 1
    ? (businesses[0] as Business).business_name
    : `${businesses.length} locations`

  if (plan !== 'growth') {
    return (
      <AnalyticsClient
        plan="solo"
        businessName={businessName}
        weeks={[]}
        totalReviews={0}
        avgRating="—"
        responseRate={0}
        avgResponseTimeHours={0}
        sentimentCounts={{ positive: 0, neutral: 0, negative: 0 }}
      />
    )
  }

  const businessIds = (businesses as Business[]).map(b => b.id)
  const { data: rawReviews } = await supabase
    .from('reviews')
    .select('*')
    .in('business_id', businessIds)
    .order('created_at', { ascending: false })
    .limit(500)

  const reviews: Review[] = rawReviews ?? []
  const weeks = computeWeeks(reviews)

  const totalReviews = reviews.length
  const avgRating = totalReviews
    ? (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
    : '—'

  const postedReviews = reviews.filter(r => r.status === 'posted' && r.posted_at)
  const responseRate = totalReviews
    ? Math.round((postedReviews.length / totalReviews) * 100)
    : 0

  const responseTimes = postedReviews
    .map(r => {
      if (!r.posted_at) return null
      const diff = new Date(r.posted_at).getTime() - new Date(r.created_at).getTime()
      return diff / 3_600_000
    })
    .filter((t): t is number => t !== null && t >= 0)

  const avgResponseTimeHours = responseTimes.length
    ? Math.round(responseTimes.reduce((s, t) => s + t, 0) / responseTimes.length)
    : 0

  const sentimentCounts = {
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    neutral:  reviews.filter(r => r.sentiment === 'neutral').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
  }

  return (
    <AnalyticsClient
      plan={plan}
      businessName={businessName}
      weeks={weeks}
      totalReviews={totalReviews}
      avgRating={avgRating}
      responseRate={responseRate}
      avgResponseTimeHours={avgResponseTimeHours}
      sentimentCounts={sentimentCounts}
    />
  )
}
