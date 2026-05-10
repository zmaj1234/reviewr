'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/toast'
import { StarRating } from '@/components/ui/star-rating'
import { Spinner } from '@/components/ui/spinner'
import { ReviewCard } from './review-card'
import { StatCard } from './stat-card'
import type { Business, Review } from '@/lib/types'
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'

interface Props {
  businesses: Business[]
  pendingReviews: Review[]
  recentPostedReviews: Review[]
  stats: {
    totalThisMonth: number
    pendingCount: number
    postedThisMonth: number
    avgRating: string
  }
}

export function DashboardClient({ businesses, pendingReviews: initial, recentPostedReviews: initialPosted, stats }: Props) {
  const [pending, setPending] = useState<Review[]>(initial)
  const [recentPosted, setRecentPosted] = useState<Review[]>(initialPosted)
  const [showPosted, setShowPosted] = useState(false)
  const { toast } = useToast()

  const businessIds = businesses.map(b => b.id)

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
      if (review.status === 'posted') {
        setRecentPosted(prev => [review, ...prev])
      }
    }
  }, [toast])

  useEffect(() => {
    if (!businessIds.length) return

    const supabase = createClient()
    const channel = supabase
      .channel('reviews-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reviews',
        filter: `business_id=in.(${businessIds.join(',')})`,
      }, payload => {
        handleReviewUpdate(payload.new as Review)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [businessIds, handleReviewUpdate])

  function onAction(reviewId: string, newStatus: 'posted' | 'discarded') {
    const review = pending.find(r => r.id === reviewId)
    setPending(prev => prev.filter(r => r.id !== reviewId))
    if (newStatus === 'posted' && review) {
      setRecentPosted(prev => [{ ...review, status: 'posted' }, ...prev])
    }
  }

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-primary">Dashboard</h1>
        <p className="text-secondary text-sm mt-1">
          {businesses[0]?.business_name} · Review management
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Reviews this month" value={stats.totalThisMonth} />
        <StatCard
          label="Pending approval"
          value={stats.pendingCount + pending.length - initial.length}
          highlight={pending.length > 0}
        />
        <StatCard label="Posted this month" value={stats.postedThisMonth} />
        <StatCard label="Avg rating" value={stats.avgRating} suffix="★" />
      </div>

      {/* Pending reviews */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-primary">
            Pending approval
            {pending.length > 0 && (
              <span className="ml-2.5 text-sm font-sans font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {pending.length}
              </span>
            )}
          </h2>
        </div>

        {pending.length === 0 ? (
          <EmptyPending />
        ) : (
          <div className="space-y-4">
            {pending.map((review, i) => (
              <ReviewCard
                key={review.id}
                review={review}
                onAction={onAction}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent posted */}
      {recentPosted.length > 0 && (
        <section>
          <button
            onClick={() => setShowPosted(!showPosted)}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-4"
          >
            <h2 className="font-serif text-xl">Recently posted</h2>
            <span className="text-sm text-muted">({recentPosted.length} this week)</span>
            {showPosted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showPosted && (
            <div className="space-y-3">
              {recentPosted.map(review => (
                <div key={review.id} className="card p-4 opacity-70">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-secondary">{review.reviewer_name}</span>
                    <span className="ml-auto text-xs text-muted flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-accent" />
                      Posted
                    </span>
                  </div>
                  {review.final_reply && (
                    <p className="text-xs text-muted line-clamp-2">{review.final_reply}</p>
                  )}
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
    <div className="card p-16 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
        <CheckCircle2 size={20} className="text-accent" />
      </div>
      <h3 className="font-serif text-xl text-primary mb-2">You&apos;re all caught up</h3>
      <p className="text-secondary text-sm max-w-xs">
        We&apos;ll notify you the moment a new review comes in with a draft reply ready to go.
      </p>
    </div>
  )
}
