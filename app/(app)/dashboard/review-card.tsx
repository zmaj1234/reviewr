'use client'

import { useState } from 'react'
import { Check, Edit3, Trash2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import type { Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
  onAction: (id: string, status: 'posted' | 'discarded') => void
  style?: React.CSSProperties
}

const sentimentColors = {
  positive: 'text-accent bg-accent/10 border-accent/20',
  neutral: 'text-secondary bg-surface border-border',
  negative: 'text-danger bg-danger/10 border-danger/20',
}

const flagColors = {
  profanity: 'text-danger bg-danger/10 border-danger/20',
  legal_risk: 'text-warning bg-warning/10 border-warning/20',
}

export function ReviewCard({ review, onAction, style }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(review.draft_reply ?? '')
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const isLong = (review.review_text?.length ?? 0) > 200

  async function callAction(action: string, finalReply?: string) {
    setLoading(action)
    try {
      const res = await fetch(`/api/reviews/${review.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, final_reply: finalReply ?? draft }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Action failed')

      if (action === 'approve' || action === 'edit_and_post') {
        toast('Reply posted successfully', 'success')
        onAction(review.id, 'posted')
      } else if (action === 'discard') {
        toast('Review discarded', 'info')
        onAction(review.id, 'discarded')
      } else if (action === 'edit_save') {
        toast('Draft saved', 'success')
        setEditing(false)
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Something went wrong', 'error')
    } finally {
      setLoading(null)
    }
  }

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <div className="card card-hover p-6 stagger-child" style={style}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <StarRating rating={review.rating} />
          <span className="font-medium text-sm text-primary">{review.reviewer_name ?? 'Anonymous'}</span>
          {review.sentiment && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${sentimentColors[review.sentiment as keyof typeof sentimentColors] ?? 'text-secondary bg-surface border-border'}`}>
              {review.sentiment}
            </span>
          )}
          {(review.flags as string[]).map(flag => (
            <span key={flag} className={`text-xs px-2.5 py-0.5 rounded-full border font-medium flex items-center gap-1 ${flagColors[flag as keyof typeof flagColors] ?? 'text-warning bg-warning/10 border-warning/20'}`}>
              <AlertTriangle size={10} />
              {flag.replace('_', ' ')}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted shrink-0">{timeAgo(review.created_at)}</span>
      </div>

      {/* Review text */}
      {review.review_text && (
        <div className="mb-5">
          <p className={`text-sm text-secondary leading-relaxed ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
            {review.review_text}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-muted hover:text-secondary mt-1.5 transition-colors"
            >
              {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Show more</>}
            </button>
          )}
        </div>
      )}

      {/* Draft */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs text-accent font-medium uppercase tracking-wide">System draft reply</span>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-muted hover:text-secondary transition-colors flex items-center gap-1"
            >
              <Edit3 size={11} /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <div>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="input min-h-[100px] resize-y text-sm leading-relaxed"
              autoFocus
            />
            <div className="flex gap-2 mt-2.5">
              <button
                onClick={() => callAction('edit_and_post', draft)}
                disabled={!!loading}
                className="btn text-xs px-4 py-2 text-white font-medium rounded-[9px] flex items-center gap-1.5"
                style={{ background: '#6366f1' }}
              >
                {loading === 'edit_and_post' ? <Spinner size={13} /> : <Check size={13} />}
                Post edited reply
              </button>
              <button
                onClick={() => callAction('edit_save', draft)}
                disabled={!!loading}
                className="btn btn-ghost text-xs px-4 py-2"
              >
                {loading === 'edit_save' ? <Spinner size={13} /> : null}
                Save draft
              </button>
              <button onClick={() => setEditing(false)} className="btn btn-ghost text-xs px-4 py-2">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="bg-accent/5 border border-accent/20 rounded-[10px] p-3.5 cursor-text"
            onClick={() => setEditing(true)}
          >
            <p className="text-sm text-secondary leading-relaxed">
              {draft || <span className="text-muted italic">No draft yet</span>}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex gap-2.5 flex-wrap">
          <button
            onClick={() => callAction('approve')}
            disabled={!!loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[9px] text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ background: '#10b981' }}
          >
            {loading === 'approve' ? <Spinner size={14} /> : <Check size={14} />}
            Approve
          </button>
          <button
            onClick={() => setEditing(true)}
            disabled={!!loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[9px] text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ background: '#6366f1' }}
          >
            <Edit3 size={14} />
            Edit &amp; Post
          </button>
          <button
            onClick={() => callAction('discard')}
            disabled={!!loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[9px] text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ background: '#ef4444' }}
          >
            {loading === 'discard' ? <Spinner size={14} /> : <Trash2 size={14} />}
            Discard
          </button>
        </div>
      )}
    </div>
  )
}
