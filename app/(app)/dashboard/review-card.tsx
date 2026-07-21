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
  isManager?: boolean
  style?: React.CSSProperties
}

const sentimentStyle: Record<string, string> = {
  positive: 'text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]',
  neutral:  'text-[#6c6c70] bg-[#f2f2f7] border-black/[0.08]',
  negative: 'text-[#ff3b30] bg-[#fff1f0] border-[#ffc9c5]',
}

const flagStyle: Record<string, string> = {
  profanity:   'text-[#ff3b30] bg-[#fff1f0] border-[#ffc9c5]',
  legal_risk:  'text-[#ff9500] bg-[#fff8ee] border-[#ffd58c]',
}

export function ReviewCard({ review, onAction, isManager = false, style }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [editing,  setEditing]  = useState(false)
  const [draft,    setDraft]    = useState(review.draft_reply ?? '')
  const [loading,  setLoading]  = useState<string | null>(null)
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
        toast('Reply posted ✓', 'success')
        onAction(review.id, 'posted')
      } else if (action === 'discard') {
        toast('Discarded', 'info')
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
    if (m < 1)   return 'just now'
    if (m < 60)  return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24)  return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden stagger-child"
      style={style}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[0.9375rem] font-semibold text-[#1c1c1e]">
              {review.reviewer_name ?? 'Anonymous'}
            </span>
            {review.sentiment && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${sentimentStyle[review.sentiment] ?? sentimentStyle.neutral}`}>
                {review.sentiment}
              </span>
            )}
            {(review.flags as string[]).map(flag => (
              <span
                key={flag}
                className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${flagStyle[flag] ?? flagStyle.legal_risk}`}
              >
                <AlertTriangle size={9} />
                {flag.replace('_', ' ')}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-[#aeaeb2] shrink-0 mt-0.5">
            {timeAgo(review.created_at)}
          </span>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* ── Review text ─────────────────────────────────────── */}
      {review.review_text && (
        <div className="px-6 pb-4">
          <div className="bg-[#f9f9f9] rounded-xl px-4 py-3">
            <p className={`text-sm text-[#6c6c70] leading-relaxed italic ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
              &ldquo;{review.review_text}&rdquo;
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[11px] text-[#aeaeb2] hover:text-[#6c6c70] mt-2 transition-colors"
              >
                {expanded
                  ? <><ChevronUp size={11} /> Show less</>
                  : <><ChevronDown size={11} /> Show more</>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── AI Draft ────────────────────────────────────────── */}
      <div className="px-6 pb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <span className="text-[11px] font-semibold text-[#16a34a] uppercase tracking-wide">
              AI Draft
            </span>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-[11px] text-[#aeaeb2] hover:text-[#6c6c70] transition-colors"
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
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => callAction('edit_and_post', draft)}
                disabled={!!loading}
                className="flex items-center gap-1.5 bg-[#16a34a] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-[#15803d] disabled:opacity-50"
              >
                {loading === 'edit_and_post' ? <Spinner size={12} /> : <Check size={12} />}
                Post reply
              </button>
              <button
                onClick={() => callAction('edit_save', draft)}
                disabled={!!loading}
                className="flex items-center gap-1.5 text-xs font-medium text-[#6c6c70] border border-black/[0.1] px-4 py-2 rounded-xl hover:bg-black/[0.03] transition-colors"
              >
                {loading === 'edit_save' && <Spinner size={12} />}
                Save draft
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-xs font-medium text-[#aeaeb2] hover:text-[#6c6c70] px-3 py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 cursor-text"
            onClick={() => setEditing(true)}
          >
            <p className="text-sm text-[#374151] leading-relaxed">
              {draft || <span className="text-[#aeaeb2] italic">No draft yet</span>}
            </p>
          </div>
        )}
      </div>

      {/* ── Actions ─────────────────────────────────────────── */}
      {!editing && (
        <div className="px-5 pb-5">
          {/* Primary — Approve */}
          <button
            onClick={() => callAction('approve')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-2 bg-[#16a34a] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#15803d] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 mb-2.5 shadow-[0_2px_8px_rgba(22,163,74,0.3)]"
          >
            {loading === 'approve' ? <Spinner size={15} /> : <Check size={15} />}
            Approve &amp; post
          </button>

          {/* Secondary row */}
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              disabled={!!loading}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-[#6c6c70] border border-black/[0.1] py-2.5 rounded-xl hover:bg-black/[0.03] hover:text-[#1c1c1e] active:scale-[0.98] transition-all duration-150"
            >
              <Edit3 size={13} /> Edit
            </button>
            {!isManager && (
              <button
                onClick={() => callAction('discard')}
                disabled={!!loading}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-[#ff3b30] border border-[#ff3b30]/20 py-2.5 rounded-xl hover:bg-[#ff3b30]/5 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
              >
                {loading === 'discard' ? <Spinner size={13} /> : <Trash2 size={13} />}
                Discard
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
