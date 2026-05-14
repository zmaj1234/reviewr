'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Building2, Phone, Mail, AlertTriangle, X } from 'lucide-react'
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
}

export function SettingsClient({ user, business }: Props) {
  const { toast } = useToast()
  const router = useRouter()

  const [businessName, setBusinessName] = useState(business?.business_name ?? '')
  const [businessType, setBusinessType] = useState(business?.business_type ?? '')
  const [businessDesc, setBusinessDesc] = useState(business?.business_description ?? '')
  const [phone, setPhone] = useState(business?.owner_phone ?? '')
  const [notifMethod, setNotifMethod] = useState<'whatsapp' | 'email'>(business?.notification_method ?? 'whatsapp')
  const [tone, setTone] = useState(business?.tone_preferences ?? 'warm, professional, concise')
  const [saving, setSaving] = useState(false)
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)

  async function saveBusinessSettings() {
    if (!business) return
    setSaving(true)
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
    } else {
      toast('Settings saved', 'success')
      router.refresh()
    }
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
              defaultValue={user.name}
              placeholder="Your name"
            />
          </div>

          <button className="btn btn-ghost text-sm px-4 py-2">
            Change password
          </button>
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
              <label className="label">WhatsApp number</label>
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
              <div className="flex gap-3">
                {(['whatsapp', 'email'] as const).map(method => (
                  <label
                    key={method}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-[8px] border cursor-pointer flex-1 justify-center text-sm font-medium transition-all duration-150 ${
                      notifMethod === method
                        ? 'border-accent/40 bg-accent/5 text-accent'
                        : 'border-border text-secondary hover:border-border-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={notifMethod === method}
                      onChange={() => setNotifMethod(method)}
                    />
                    {method === 'whatsapp' ? <><Phone size={14} /> WhatsApp</> : <><Mail size={14} /> Email</>}
                  </label>
                ))}
              </div>
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
