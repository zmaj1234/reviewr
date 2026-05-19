'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Building2, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { LogoWithText } from '@/components/logo'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import type { GBPLocation } from '@/lib/types'

const BUSINESS_TYPES = [
  'Restaurant', 'Hotel', 'Bar/Pub', 'Retail', 'Healthcare',
  'Beauty/Salon', 'Professional Services', 'Other',
]

export default function ConnectPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ConnectFlow />
    </Suspense>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <Spinner size={24} className="text-accent" />
    </div>
  )
}

function ConnectFlow() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const stepParam = searchParams.get('step')
  const errorParam = searchParams.get('error')
  const locationsParam = searchParams.get('locations')

  const [step, setStep] = useState<1 | 2 | 3>(
    stepParam === '2' ? 2 : stepParam === '3' ? 3 : 1
  )
  const [locations, setLocations] = useState<GBPLocation[]>([])
  const [selectedLocation, setSelectedLocation] = useState<GBPLocation | null>(null)
  const [businessType, setBusinessType] = useState('')
  const [phone, setPhone] = useState('')
  const [notificationMethod, setNotificationMethod] = useState<'whatsapp' | 'email'>('email')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [planBlock, setPlanBlock] = useState<'solo' | 'growth' | null>(null)

  useEffect(() => {
    if (errorParam) {
      toast('Google connection failed. Please try again.', 'error')
    }
    if (locationsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(locationsParam))
        setLocations(parsed)
        if (parsed.length === 1) setSelectedLocation(parsed[0])
      } catch {
        // ignore
      }
    }
  }, [errorParam, locationsParam, toast])

  async function handleFinish() {
    if (!selectedLocation) {
      toast('Please select a location', 'error')
      return
    }
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    // Check plan and location limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .maybeSingle()
    const plan = (profile?.plan ?? 'solo') as 'solo' | 'growth'
    const limit = plan === 'growth' ? 5 : 1

    const { count } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('active', true)

    if ((count ?? 0) >= limit) {
      if (plan === 'solo') {
        toast('Solo plan supports 1 location. Upgrade to Growth to add up to 5.', 'error')
      } else {
        toast("You've reached the 5-location limit on the Growth plan.", 'error')
      }
      setLoading(false)
      setPlanBlock(plan === 'solo' ? 'solo' : 'growth')
      return
    }

    const { error } = await supabase.from('businesses').upsert({
      user_id: user.id,
      business_name: selectedLocation.title,
      business_type: businessType || null,
      business_description: description || null,
      gbp_account_id: selectedLocation.accountId,
      gbp_location_id: selectedLocation.locationId,
      owner_phone: phone || null,
      owner_email: user.email,
      notification_method: notificationMethod,
      active: true,
    }, { onConflict: 'user_id,gbp_location_id' })

    if (error) {
      toast(error.message, 'error')
      setLoading(false)
      return
    }

    toast('Setup complete! Welcome to Reviewr.', 'success')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-3 justify-center mb-10">
          <LogoWithText height={32} />
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                step > s
                  ? 'bg-accent border-accent text-black'
                  : step === s
                  ? 'border-accent text-accent'
                  : 'border-border text-muted'
              }`}>
                {step > s ? <CheckCircle2 size={14} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-px transition-colors duration-300 ${step > s ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {planBlock && (
          <div className="card p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-5">
              <Building2 size={24} className="text-danger" />
            </div>
            <h2 className="font-serif text-2xl text-primary mb-3">Location limit reached</h2>
            <p className="text-secondary text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              {planBlock === 'solo'
                ? 'Solo plan supports 1 location. Upgrade to Growth to manage up to 5 locations.'
                : "You've reached the 5-location limit on the Growth plan."}
            </p>
            {planBlock === 'solo' && (
              <a
                href="mailto:hello@reviewr.app?subject=Upgrade to Growth"
                className="btn btn-primary px-6 py-2.5 inline-flex"
              >
                Contact us to upgrade
              </a>
            )}
          </div>
        )}

        {!planBlock && step === 1 && <StepConnect />}
        {!planBlock && step === 2 && (
          <StepSelectLocation
            locations={locations}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
            onContinue={() => setStep(3)}
          />
        )}
        {!planBlock && step === 3 && (
          <StepDetails
            businessType={businessType}
            setBusinessType={setBusinessType}
            phone={phone}
            setPhone={setPhone}
            notificationMethod={notificationMethod}
            setNotificationMethod={setNotificationMethod}
            description={description}
            setDescription={setDescription}
            onFinish={handleFinish}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}

function StepConnect() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="card p-8 text-center">
      <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center mx-auto mb-6">
        <Building2 size={24} className="text-secondary" />
      </div>
      <h1 className="font-serif text-2xl text-primary mb-3">
        Connect your Google Business Profile
      </h1>
      <p className="text-secondary text-sm leading-relaxed mb-8 max-w-sm mx-auto">
        We&apos;ll request permission to read your reviews and post replies on your behalf.
        You stay in full control — nothing posts without your approval.
      </p>

      <div className="bg-surface border border-border rounded-[8px] p-4 mb-8 text-left space-y-2">
        {['Read your business reviews', 'Post replies you approve', 'Access your business profile info'].map(p => (
          <div key={p} className="flex items-center gap-2 text-sm text-secondary">
            <CheckCircle2 size={14} className="text-accent shrink-0" />
            {p}
          </div>
        ))}
      </div>

      <button
        onClick={() => { setLoading(true); window.location.href = '/api/auth/google' }}
        disabled={loading}
        className="btn btn-primary w-full py-3 text-base"
      >
        {loading ? <Spinner size={16} /> : (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
          </svg>
        )}
        Connect with Google
      </button>
    </div>
  )
}

function StepSelectLocation({
  locations, selected, onSelect, onContinue,
}: {
  locations: GBPLocation[]
  selected: GBPLocation | null
  onSelect: (l: GBPLocation) => void
  onContinue: () => void
}) {
  return (
    <div className="card p-8">
      <h1 className="font-serif text-2xl text-primary mb-2">Select your location</h1>
      <p className="text-secondary text-sm mb-6">Choose the business location you want to manage.</p>

      {locations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-secondary text-sm">No locations found. Make sure your Google account has access to a Business Profile.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {locations.map(loc => (
            <label
              key={loc.locationId}
              className={`flex items-center gap-3 p-4 rounded-[10px] border cursor-pointer transition-all duration-150 ${
                selected?.locationId === loc.locationId
                  ? 'border-accent/40 bg-accent/5'
                  : 'border-border hover:border-border-strong'
              }`}
            >
              <input
                type="radio"
                name="location"
                value={loc.locationId}
                checked={selected?.locationId === loc.locationId}
                onChange={() => onSelect(loc)}
                className="accent-accent"
              />
              <div>
                <div className="font-medium text-primary text-sm">{loc.title}</div>
                <div className="text-xs text-muted mt-0.5">{loc.name}</div>
              </div>
            </label>
          ))}
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!selected}
        className="btn btn-primary w-full py-3"
      >
        Continue
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

function StepDetails({
  businessType, setBusinessType,
  phone, setPhone,
  notificationMethod, setNotificationMethod,
  description, setDescription,
  onFinish, loading,
}: {
  businessType: string
  setBusinessType: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  notificationMethod: 'whatsapp' | 'email'
  setNotificationMethod: (v: 'whatsapp' | 'email') => void
  description: string
  setDescription: (v: string) => void
  onFinish: () => void
  loading: boolean
}) {
  return (
    <div className="card p-8 space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-primary mb-1">A few quick details</h1>
        <p className="text-secondary text-sm">Help Reviewr craft better replies for your business.</p>
      </div>

      <div>
        <label className="label">Business type</label>
        <select value={businessType} onChange={e => setBusinessType(e.target.value)} className="input">
          <option value="">Select type...</option>
          {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Phone number <span className="text-muted">(optional)</span></label>
        <div className="relative">
          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="tel" className="input pl-9" placeholder="+1 555 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="label">Notification method</label>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-accent/40 bg-accent/5 text-accent text-sm font-medium w-fit">
          <Mail size={14} /> Email
        </div>
        <p className="text-xs text-muted mt-1">Review drafts will be sent to your account email</p>
      </div>

      <div>
        <label className="label">Business description <span className="text-muted">(optional)</span></label>
        <textarea
          className="input min-h-[80px] resize-none"
          placeholder="Describe your business in 2–3 sentences..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <button onClick={onFinish} disabled={loading} className="btn btn-primary w-full py-3">
        {loading ? <Spinner size={16} /> : null}
        Finish setup
        {!loading && <ChevronRight size={16} />}
      </button>
    </div>
  )
}
