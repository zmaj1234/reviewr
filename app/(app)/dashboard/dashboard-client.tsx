'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/toast'
import { ReviewCard } from './review-card'
import { StatCard } from './stat-card'
import type { Business, Review } from '@/lib/types'
import { CheckCircle2, Users, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'

interface Props {
  businesses: Business[]
  pendingReviews: Review[]
  recentPostedReviews: Review[]
  isManager: boolean
  ownerName: string
  stats: {
    totalThisMonth: number
    pendingCount: number
    postedThisMonth: number
    avgRating: string
  }
}

export function DashboardClient({
  businesses,
  pendingReviews: initial,
  recentPostedReviews: initialPosted,
  isManager,
  ownerName,
  stats,
}: Props) {
  const [pending,      setPending]      = useState<Review[]>(initial)
  const [recentPosted, setRecentPosted] = useState<Review[]>(initialPosted)
  const [showPosted,   setShowPosted]   = useState(false)
  const { toast } = useToast()

  const businessIds = useMemo(() => businesses.map(b => b.id), [businesses])

  const searchParams = useSearchParams()
  const [showSubscribedBanner, setShowSubscribedBanner] = useState(false)

  useEffect(() => {
    if (searchParams.get('subscribed') === '1') {
      setShowSubscribedBanner(true)
      // Clean URL without reloading
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams])

  const handleReviewUpdate = useCallback((review: Review) => {
    if (review.status === 'pending_approval') {
      setPending(prev => {
        const exists = prev.find(r => r.id === review.id)
        if (exists) return prev.map(r => r.id === review.id ? review : r)
        toast(`New review from ${review.reviewer_name ?? 'someone'} — draft ready`, 'success')
        return [review, ...prev]
      })
    } else {
      setPending(prev => prev.filter(r => r.id !== review.id))
      if (review.status === 'posted') setRecentPosted(prev => [review, ...prev])
    }
  }, [toast])

  useEffect(() => {
    if (!businessIds.length) return
    const supabase = createClient()
    const channel = supabase
      .channel('reviews-realtime')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'reviews',
        filter: `business_id=in.(${businessIds.join(',')})`,
      }, payload => handleReviewUpdate(payload.new as Review))
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [businessIds, handleReviewUpdate])

  function onAction(reviewId: string, newStatus: 'posted' | 'discarded') {
    const review = pending.find(r => r.id === reviewId)
    setPending(prev => prev.filter(r => r.id !== reviewId))
    if (newStatus === 'posted' && review)
      setRecentPosted(prev => [{ ...review, status: 'posted' }, ...prev])
  }

  const businessLabel = businesses.length === 1
    ? businesses[0]?.business_name
    : `${businesses.length} locations`

  const pendingCount = Math.max(0, stats.pendingCount + pending.length - initial.length)

  return (
    <div className="px-8 py-10 max-w-3xl animate-fade-in">

      {/* ── Subscribed banner ───────────────────────────────── */}
      {showSubscribedBanner && (
        <div className="flex items-center justify-between gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl px-5 py-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#16a34a]/15 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-[#16a34a]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#15803d]">You&apos;re subscribed — welcome aboard 🎉</p>
              <p className="text-xs text-[#16a34a]/70 mt-0.5">Reviews will be drafted and sent to you automatically. You&apos;re all set.</p>
            </div>
          </div>
          <button
            onClick={() => setShowSubscribedBanner(false)}
            className="text-[#16a34a]/40 hover:text-[#16a34a] transition-colors text-lg leading-none shrink-0"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Manager banner ───────────────────────────────── */}
      {isManager && (
        <div className="flex items-center gap-2.5 bg-violet-50 border border-violet-200/60 text-violet-600 rounded-2xl px-4 py-3 mb-8 text-sm font-medium">
          <Users size={14} />
          Viewing <strong className="font-semibold">{ownerName}&apos;s</strong> workspace
        </div>
      )}

      {/* ── Header ──────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-serif text-[2rem] text-[#1c1c1e] leading-tight">
          {businessLabel}
        </h1>
        <p className="text-sm text-[#aeaeb2] mt-1 font-medium">
          Review management
        </p>
      </div>

      {/* ── Stats ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatCard
          label="This month"
          value={stats.totalThisMonth}
        />
        <StatCard
          label="Waiting"
          value={pendingCount}
          highlight={pendingCount > 0}
        />
        <StatCard
          label="Posted"
          value={stats.postedThisMonth}
        />
        <StatCard
          label="Avg rating"
          value={stats.avgRating}
          suffix="★"
        />
      </div>

      {/* ── Pending reviews ─────────────────────────────── */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-serif text-xl text-[#1c1c1e]">
            {pending.length === 0 ? 'All caught up' : 'Waiting for you'}
          </h2>

          {pending.length > 0 && (
            <span className="text-xs font-bold text-[#16a34a] bg-[#16a34a]/10 px-2.5 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}

          {/* Live dot */}
          <span className="flex items-center gap-1.5 ml-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]" />
            </span>
            <span className="text-[11px] text-[#16a34a] font-semibold">Live</span>
          </span>
        </div>

        {pending.length === 0 ? (
          <EmptyPending />
        ) : (
          <div className="space-y-3">
            {pending.map((review, i) => (
              <ReviewCard
                key={review.id}
                review={review}
                onAction={onAction}
                isManager={isManager}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Recently posted ─────────────────────────────── */}
      {recentPosted.length > 0 && (
        <section>
          <button
            onClick={() => setShowPosted(!showPosted)}
            className="flex items-center gap-2 mb-4 group"
          >
            <h2 className="font-serif text-xl text-[#1c1c1e]">Recently posted</h2>
            <span className="text-xs text-[#aeaeb2] font-medium">
              ({recentPosted.length})
            </span>
            {showPosted
              ? <ChevronUp size={14} className="text-[#aeaeb2] group-hover:text-[#6c6c70] transition-colors" />
              : <ChevronDown size={14} className="text-[#aeaeb2] group-hover:text-[#6c6c70] transition-colors" />
            }
          </button>

          {showPosted && (
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
              {recentPosted.map((review, i) => (
                <div
                  key={review.id}
                  className={`flex items-center gap-4 px-5 py-3.5 ${
                    i < recentPosted.length - 1 ? 'border-b border-black/[0.05]' : ''
                  }`}
                >
                  <CheckCircle2 size={15} className="text-[#16a34a] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1c1c1e] truncate">
                      {review.reviewer_name ?? 'Anonymous'}
                    </p>
                    {review.final_reply && (
                      <p className="text-xs text-[#aeaeb2] truncate mt-0.5">
                        {review.final_reply}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] text-[#aeaeb2] shrink-0">Posted</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function EmptyPending() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] px-8 py-16 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mb-5 shadow-[0_2px_12px_rgba(22,163,74,0.12)]">
        <CheckCircle2 size={24} className="text-[#16a34a]" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-xl text-[#1c1c1e] mb-2">You&apos;re all caught up</h3>
      <p className="text-sm text-[#aeaeb2] max-w-xs leading-relaxed">
        New reviews come in automatically. We&apos;ll have a draft ready before you even see it.
      </p>
    </div>
  )
}
