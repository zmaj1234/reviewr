'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Building2, Phone, Mail, AlertTriangle, X, CreditCard, ArrowUpRight } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import type { Business } from '@/lib/types'

const BUSINESS_TYPES = [
  'Restaurant', 'Hotel', 'Bar/Pub', 'Retail', 'Healthcare',
  'Beauty/Salon', 'Professional Services', 'Other',
]

interface Props {
  user: { id: string; email: string; name: string }
  business: Business | null
  plan: 'solo' | 'growth'
  hasSubscription: boolean
}

export function SettingsClient({ user, business, plan, hasSubscription }: Props) {
  const { toast } = useToast()
  const router = useRouter()

  const [businessName, setBusinessName] = useState(business?.business_name ?? '')
  const [businessType, setBusinessType] = useState(business?.business_type ?? '')
  const [businessDesc, setBusinessDesc] = useState(business?.business_description ?? '')
  const [phone, setPhone] = useState(business?.owner_phone ?? '')
  const notifMethod = 'email' as const
  const [tone, setTone] = useState(business?.tone_preferences ?? 'warm, professional, concise')
  const [fullName, setFullName] = useState(user.name)
  const [saving, setSaving] = useState(false)
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)

  async function saveBusinessSettings() {
    setSaving(true)

    // Always try to save full name
    const nameRes = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName }),
    })

    if (!nameRes.ok) {
      const { error } = await nameRes.json()
      toast(error ?? 'Failed to save name', 'error')
      setSaving(false)
      return
    }

    // Save business settings if business exists
    if (business) {
      const res = await fetch('/api/business', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          business_type: businessType,
          business_description: businessDesc,
          owner_phone: phone,
          notification_method: notifMethod,
          tone_preferences: tone,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        toast(error ?? 'Failed to save', 'error')
        setSaving(false)
        return
      }
    }

    toast('Settings saved', 'success')
    router.refresh()
    setSaving(false)
  }

  async function disconnectGBP() {
    if (!business) return
    setDisconnecting(true)
    const res = await fetch('/api/business/disconnect', { method: 'POST' })

    if (!res.ok) {
      const { error } = await res.json()
      toast(error ?? 'Failed to disconnect', 'error')
      setDisconnecting(false)
      return
    }

    toast('Google Business Profile disconnected', 'info')
    setShowDisconnectModal(false)
    router.push('/connect')
  }

  return (
    <div className="p-8 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-primary">Settings</h1>
        <p className="text-secondary text-sm mt-1">Manage your account and business preferences</p>
      </div>

      {/* Account section */}
      <section className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
          <User size={16} className="text-secondary" />
          <h2 className="font-medium text-primary">Account</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Email address</label>
            <input
              type="email"
              className="input opacity-60 cursor-not-allowed"
              value={user.email}
              readOnly
            />
            <p className="text-xs text-muted mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="label">Full name</label>
            <input
              type="text"
              className="input"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Show save button here only if no business section below */}
          {!business && (
            <div className="pt-2">
              <button
                onClick={saveBusinessSettings}
                disabled={saving}
                className="btn btn-primary px-5 py-2.5"
              >
                {saving ? <Spinner size={14} /> : null}
                Save changes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Business section */}
      {business && (
        <section className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
            <Building2 size={16} className="text-secondary" />
            <h2 className="font-medium text-primary">Business settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Business name</label>
              <input
                type="text"
                className="input"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Business type</label>
              <select
                className="input"
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
              >
                <option value="">Select type...</option>
                {BUSINESS_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Business description</label>
              <textarea
                className="input min-h-[80px] resize-none"
                value={businessDesc}
                onChange={e => setBusinessDesc(e.target.value)}
                placeholder="Describe your business in 2–3 sentences..."
              />
            </div>

            <div>
              <label className="label">Phone number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="tel"
                  className="input pl-9"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>

            <div>
              <label className="label">Notification method</label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-accent/40 bg-accent/5 text-accent text-sm font-medium w-fit">
                <Mail size={14} /> Email
              </div>
              <p className="text-xs text-muted mt-1">Review drafts are sent to your account email</p>
            </div>

            <div>
              <label className="label">Tone preferences</label>
              <input
                type="text"
                className="input"
                value={tone}
                onChange={e => setTone(e.target.value)}
                placeholder="e.g. warm, professional, concise"
              />
              <p className="text-xs text-muted mt-1">Comma-separated words describing how you&apos;d like replies to sound</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={saveBusinessSettings}
                disabled={saving}
                className="btn btn-primary px-5 py-2.5"
              >
                {saving ? <Spinner size={14} /> : null}
                Save changes
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Billing section */}
      <section className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
          <CreditCard size={16} className="text-secondary" />
          <h2 className="font-medium text-primary">Billing</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-primary capitalize">{plan} plan</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                plan === 'growth'
                  ? 'bg-[#16a34a]/10 text-[#16a34a]'
                  : 'bg-black/[0.04] text-[#aeaeb2]'
              }`}>
                {plan === 'growth' ? 'Growth' : 'Solo'}
              </span>
            </div>
            <p className="text-xs text-muted">
              {plan === 'growth' ? '€49/month — up to 5 locations, team seats, advanced analytics' : '€19/month — 1 location, basic analytics'}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            {hasSubscription ? (
              <a
                href="/api/stripe/portal"
                className="btn btn-ghost text-sm px-4 py-2 flex items-center gap-1.5"
              >
                Manage <ArrowUpRight size={13} />
              </a>
            ) : (
              <a
                href={`/api/stripe/checkout?plan=${plan === 'growth' ? 'growth' : 'solo'}`}
                className="btn btn-ghost text-sm px-4 py-2"
              >
                Subscribe
              </a>
            )}
            {plan === 'solo' && (
              <a
                href="/api/stripe/checkout?plan=growth"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Upgrade to Growth
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Danger zone */}
      {business && (
        <section className="card p-6 border-danger/20">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
            <AlertTriangle size={16} className="text-danger" />
            <h2 className="font-medium text-danger">Danger zone</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-primary">Disconnect Google Business Profile</div>
              <div className="text-xs text-muted mt-0.5">
                Removes your GBP connection. You can reconnect anytime.
              </div>
            </div>
            <button
              onClick={() => setShowDisconnectModal(true)}
              className="btn btn-danger text-sm px-4 py-2 shrink-0"
            >
              Disconnect
            </button>
          </div>
        </section>
      )}

      {/* Disconnect confirmation modal */}
      {showDisconnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-primary">Disconnect GBP?</h3>
              <button onClick={() => setShowDisconnectModal(false)} className="text-muted hover:text-secondary">
                <X size={18} />
              </button>
            </div>
            <p className="text-secondary text-sm mb-6">
              This will remove your Google Business Profile connection. Review drafts will stop being generated until you reconnect.
            </p>
            <div className="flex gap-3">
              <button
                onClick={disconnectGBP}
                disabled={disconnecting}
                className="btn btn-danger flex-1 py-2.5"
              >
                {disconnecting ? <Spinner size={14} /> : null}
                Yes, disconnect
              </button>
              <button
                onClick={() => setShowDisconnectModal(false)}
                className="btn btn-ghost flex-1 py-2.5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
