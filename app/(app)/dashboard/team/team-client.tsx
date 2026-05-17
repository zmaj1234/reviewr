'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Mail, Trash2, Clock, CheckCircle2, UserPlus } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import type { TeamMember } from '@/lib/types'

interface Props {
  members: TeamMember[]
  maxSeats: number
}

export function TeamClient({ members: initial, maxSeats }: Props) {
  const [members, setMembers] = useState<TeamMember[]>(initial)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const usedSeats = members.length
  const seatsFull = usedSeats >= maxSeats

  async function invite() {
    if (!inviteEmail.trim()) return
    if (seatsFull) {
      toast(`All ${maxSeats} seats are used.`, 'error')
      return
    }
    setInviting(true)
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to invite')
      setMembers(prev => [data.member, ...prev])
      setInviteEmail('')
      toast(`Invite sent to ${inviteEmail.trim()}`, 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Something went wrong', 'error')
    } finally {
      setInviting(false)
    }
  }

  async function remove(id: string, email: string) {
    setRemovingId(id)
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to remove')
      }
      setMembers(prev => prev.filter(m => m.id !== id))
      toast(`Removed ${email}`, 'info')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Something went wrong', 'error')
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <div className="p-8 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-primary">Team</h1>
        <p className="text-secondary text-sm mt-1">Manage who can approve reviews across your locations</p>
      </div>

      {/* Seats counter */}
      <div className="card p-5 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#16a34a]/10 flex items-center justify-center shrink-0">
          <Users size={18} className="text-[#16a34a]" />
        </div>
        <div>
          <p className="text-sm font-medium text-primary">{usedSeats} of {maxSeats} seats used</p>
          <p className="text-xs text-muted mt-0.5">{maxSeats} team seats included on Growth</p>
        </div>
        <div className="ml-auto flex gap-1">
          {Array.from({ length: maxSeats }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border ${
                i < usedSeats
                  ? 'bg-[#16a34a] border-[#16a34a]'
                  : 'bg-transparent border-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Invite form */}
      <div className="card p-5 mb-6">
        <h2 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
          <UserPlus size={15} className="text-secondary" />
          Invite a team member
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              className="input pl-9 text-sm"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && invite()}
              disabled={seatsFull || inviting}
            />
          </div>
          <button
            onClick={invite}
            disabled={!inviteEmail.trim() || inviting || seatsFull}
            className="btn btn-primary px-4 py-2 text-sm shrink-0 disabled:opacity-50"
          >
            {inviting ? <Spinner size={14} /> : 'Invite'}
          </button>
        </div>
        {seatsFull && (
          <p className="text-xs text-warning mt-2">All {maxSeats} seats are used. Remove a member to invite someone new.</p>
        )}
        <p className="text-xs text-muted mt-2">
          They&apos;ll get access as soon as they sign in with this email. Managers can approve and edit replies — they cannot discard, add locations, or access settings.
        </p>
      </div>

      {/* Members list */}
      <div>
        <h2 className="text-sm font-semibold text-primary mb-3">Current members</h2>
        {members.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-secondary text-sm">No team members yet. Invite someone above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {members.map(m => (
              <div key={m.id} className="card p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-xs font-semibold text-accent">
                  {m.member_email.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{m.member_email}</p>
                  <p className="text-xs text-muted capitalize">{m.role}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {m.accepted_at ? (
                    <span className="flex items-center gap-1 text-xs text-[#16a34a] font-medium bg-[#16a34a]/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-muted font-medium bg-surface border border-border px-2 py-0.5 rounded-full">
                      <Clock size={10} /> Pending
                    </span>
                  )}
                  <button
                    onClick={() => remove(m.id, m.member_email)}
                    disabled={removingId === m.id}
                    className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/5 transition-colors disabled:opacity-50"
                    title="Remove member"
                  >
                    {removingId === m.id ? <Spinner size={13} /> : <Trash2 size={13} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
