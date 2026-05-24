'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Star, CheckCircle2, Pencil, X, Check,
  ArrowRight, RotateCcw, Zap,
} from 'lucide-react'
import { LogoMark } from '@/components/logo'

/* ─── types ─────────────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'Review lands',        short: 'A customer leaves a review on your Google Business Profile.' },
  { num: '02', title: 'Reviewr drafts',      short: 'Our AI reads the review and writes a matched draft in under 30 seconds.' },
  { num: '03', title: 'Email arrives',       short: 'The draft lands in your inbox — review text, AI reply and action buttons, all labelled.' },
  { num: '04', title: 'One tap to approve',  short: 'Click Approve. Reviewr posts the reply to Google instantly.' },
]

/* ─── typewriter hook ────────────────────────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 18) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) { setOut(''); setDone(false); return }
    setOut(''); setDone(false)
    let i = 0
    const t = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) { setDone(true); clearInterval(t) }
    }, speed)
    return () => clearInterval(t)
  }, [active, text, speed])
  return { out, done }
}

/* ─── main component ─────────────────────────────────────────────────────── */
export function DemoPlayer() {
  const [step, setStep]               = useState(0)
  const [visible, setVisible]         = useState(true)
  const [approved, setApproved]       = useState(false)
  const [hasInteracted, setInteracted] = useState(false)

  const goTo = (i: number) => {
    setVisible(false)
    setApproved(false)
    setTimeout(() => { setStep(i); setVisible(true) }, 220)
  }

  const next = () => {
    setInteracted(true)
    goTo((step + 1) % 4)
  }

  /* approve pulse on step 4 */
  const approveTimer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    if (step === 3) {
      setApproved(false)
      approveTimer.current = setTimeout(() => setApproved(true), 1400)
    }
    return () => clearTimeout(approveTimer.current)
  }, [step])

  return (
    <div className="max-w-4xl mx-auto">

      {/* ── step tabs ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`text-left px-4 py-3 rounded-2xl transition-all duration-300 border ${
              step === i
                ? 'bg-white border-black/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.08)]'
                : 'border-transparent hover:bg-white/70'
            }`}
          >
            {/* filled line if passed, filling line if current */}
            <div className="h-0.5 bg-[#e5e7eb] rounded-full mb-3 overflow-hidden">
              <div
                className={`h-full rounded-full bg-[#16a34a] transition-all duration-500 ${
                  step > i ? 'w-full' : step === i ? 'w-full step-progress' : 'w-0'
                }`}
                style={step === i ? { animation: 'none' } : undefined}
              />
            </div>
            <div className={`text-[10px] font-bold tracking-wider mb-0.5 ${step === i ? 'text-[#16a34a]' : 'text-[#c4c4c4]'}`}>
              {s.num}
            </div>
            <div className={`text-xs font-semibold leading-snug hidden sm:block ${step === i ? 'text-[#0a0a0a]' : 'text-[#b0b0b0]'}`}>
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {/* ── visual window ─────────────────────────────────────────────── */}
      <div
        className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.07)] overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        {/* top bar */}
        <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-black/[0.05] bg-[#fafaf9]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-[#b0b0a8] font-medium">{STEPS[step].title}</span>
        </div>

        <div className="p-8 lg:p-12 min-h-[360px] flex items-center justify-center">
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 active={visible} />}
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 approved={approved} />}
        </div>

        {/* bottom bar — description + nav */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-black/[0.05] bg-[#fafaf9]">
          <p className="text-sm text-[#6b7280] leading-snug max-w-sm">
            {STEPS[step].short}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            {/* nudge arrow — fades out after first click */}
            {!hasInteracted && step < 3 && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16a34a] animate-bounce">
                tap
                <ArrowRight size={12} />
              </span>
            )}

            <button
              onClick={next}
              className={`flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 group ${
                !hasInteracted && step < 3
                  ? 'shadow-[0_0_0_3px_rgba(22,163,74,0.25),0_0_0_6px_rgba(22,163,74,0.08)] hover:bg-[#222]'
                  : 'hover:bg-[#222]'
              }`}
            >
              {step === 3 ? (
                <><RotateCcw size={14} className="group-hover:-rotate-45 transition-transform duration-300" /> Start over</>
              ) : (
                <>Next <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── dot nav (mobile convenience) ──────────────────────────────── */}
      <div className="flex gap-2 justify-center mt-5">
        {[0,1,2,3].map(i => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === i ? 'w-6 bg-[#16a34a]' : 'w-1.5 bg-[#d1d5db] hover:bg-[#9ca3af]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── STEP 1 — review lands ─────────────────────────────────────────────── */
function Step1() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* Google notification card */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-5 animate-step-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-[#4285f4] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#0a0a0a]">Google Business Profile</div>
            <div className="text-xs text-[#9ca3af]">New review received</div>
          </div>
          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
        </div>

        <div className="border-t border-[#f0f0ee] pt-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#16a34a] font-bold text-sm shrink-0">
              MS
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-1.5">
                <span className="text-sm font-semibold text-[#0a0a0a]">Maria S.</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={11} fill="#facc15" className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#6b7280] leading-relaxed italic">
                &ldquo;Amazing service! The staff were incredibly helpful and the food was outstanding.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-[#f59e0b] font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
          Awaiting your reply
        </div>
      </div>

      <p className="text-center text-xs text-[#b0b0a8]">📍 La Bella Vista · Google Business Profile</p>
    </div>
  )
}

/* ─── STEP 2 — AI drafts ─────────────────────────────────────────────────── */
const DRAFT = "Dear Maria, thank you so much for your kind words! We're absolutely thrilled to hear you had such a wonderful experience — it truly means the world to our team. We look forward to welcoming you back very soon!"

function Step2({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)
  const { out, done } = useTypewriter(DRAFT, phase >= 3)

  useEffect(() => {
    if (!active) return
    setPhase(0)
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => setPhase(3), 1700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [active])

  const checks = [
    { label: 'Reading review',      done: phase >= 1 },
    { label: 'Matching your tone',  done: phase >= 2 },
    { label: 'Writing draft…',      done: phase >= 3 && done, active: phase >= 3 && !done },
  ]

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Processing checklist */}
      <div className="flex items-center justify-center gap-6">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            {c.done ? (
              <CheckCircle2 size={15} className="text-[#16a34a] shrink-0" />
            ) : c.active ? (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#d1d5db] border-t-[#16a34a] animate-spin shrink-0 block" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#e5e7eb] shrink-0 block" />
            )}
            <span className={`text-xs font-medium ${c.done ? 'text-[#374151]' : c.active ? 'text-[#6b7280]' : 'text-[#c4c4c4]'}`}>
              {c.label}
            </span>
            {i < checks.length - 1 && (
              <ArrowRight size={11} className="text-[#d1d5db] ml-1" />
            )}
          </div>
        ))}
      </div>

      {/* Draft box */}
      <div className="bg-[#fafaf7] border border-dashed border-[#c7d2fe] rounded-2xl p-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap size={12} className="text-[#6366f1]" />
          <span className="text-[10px] text-[#6366f1] uppercase tracking-widest font-bold">
            AI Draft Reply
          </span>
        </div>
        <p className="text-sm text-[#374151] leading-relaxed min-h-[80px]">
          {phase < 3 ? (
            <span className="text-[#c4c4c4] italic">Generating…</span>
          ) : (
            <>
              {out}
              {!done && <span className="cursor-blink ml-px">|</span>}
            </>
          )}
        </p>
      </div>

      {done && (
        <div className="flex items-center justify-center gap-2 text-sm text-[#16a34a] font-semibold animate-step-in">
          <CheckCircle2 size={15} />
          Draft ready in 18 seconds
        </div>
      )}
    </div>
  )
}

/* ─── STEP 3 — annotated email ───────────────────────────────────────────── */
function Step3() {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Email shell */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden animate-step-in">

        {/* Email header */}
        <div className="bg-[#6366f1] px-4 py-3 flex items-center gap-3">
          <LogoMark size={20} noShadow />
          <div>
            <div className="text-white font-semibold text-sm">Reviewr</div>
            <div className="text-white/70 text-xs">New draft — La Bella Vista · Maria S.</div>
          </div>
        </div>

        <div className="p-4 space-y-3">

          {/* ① Customer review */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] bg-[#e0e7ff] text-[#4f46e5] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                ① Customer's review
              </span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={9} fill="#facc15" className="text-yellow-400" />)}
              </div>
            </div>
            <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-xl px-3 py-2">
              <p className="text-xs text-[#374151] italic leading-relaxed">
                &ldquo;Amazing service! The staff were incredibly helpful and the food was outstanding.&rdquo;
              </p>
              <p className="text-[10px] text-[#9ca3af] mt-1">— Maria S. · 5 / 5</p>
            </div>
          </div>

          {/* ② AI draft */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] bg-[#f0fdf4] text-[#16a34a] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                ② AI-generated draft
              </span>
            </div>
            <div className="bg-[#fafafa] border border-dashed border-[#bbf7d0] rounded-xl px-3 py-2">
              <p className="text-xs text-[#374151] leading-relaxed">
                Dear Maria, thank you so much for your kind words! We&apos;re thrilled you had such a wonderful experience — it means the world to our team…
              </p>
            </div>
          </div>

          {/* ③ Actions */}
          <div>
            <div className="mb-1.5">
              <span className="text-[10px] bg-[#fef3f0] text-[#ea580c] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                ③ Your actions
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#10b981] text-white text-[10px] font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1">
                <Check size={11} /> Approve
              </div>
              <div className="bg-[#6366f1] text-white text-[10px] font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1">
                <Pencil size={11} /> Edit
              </div>
              <div className="bg-[#ef4444] text-white text-[10px] font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1">
                <X size={11} /> Discard
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── STEP 4 — approve ───────────────────────────────────────────────────── */
function Step4({ approved }: { approved: boolean }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      {!approved ? (
        <div className="space-y-4 animate-step-in">
          {/* Email preview */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-4">
            <div className="bg-[#fafafa] border border-dashed border-[#bbf7d0] rounded-xl px-3 py-2.5 mb-4">
              <p className="text-xs text-[#374151] leading-relaxed">
                Dear Maria, thank you so much for your kind words! We&apos;re thrilled you had such a wonderful experience…
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {/* Approve button pulses */}
              <button className="bg-[#10b981] text-white text-[10px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1 approve-pulse ring-2 ring-[#10b981]/40 ring-offset-1">
                <Check size={11} /> Approve
              </button>
              <div className="bg-[#6366f1] text-white text-[10px] font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1 opacity-40">
                <Pencil size={11} /> Edit
              </div>
              <div className="bg-[#ef4444] text-white text-[10px] font-semibold text-center py-2.5 rounded-xl flex items-center justify-center gap-1 opacity-40">
                <X size={11} /> Discard
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-[#9ca3af]">← Approve button highlighted</p>
        </div>
      ) : (
        /* Success state */
        <div className="text-center space-y-5 animate-step-in">
          <div className="w-20 h-20 rounded-full bg-[#f0fdf4] border-4 border-[#bbf7d0] flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} className="text-[#16a34a]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#0a0a0a] mb-1">Posted to Google</h3>
            <p className="text-sm text-[#6b7280]">Your reply is now live on your Business Profile.</p>
          </div>
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl px-5 py-4 text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-[#4285f4] rounded flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">G</span>
              </div>
              <span className="text-xs font-semibold text-[#0a0a0a]">La Bella Vista replied</span>
            </div>
            <p className="text-xs text-[#6b7280] italic leading-relaxed">
              &ldquo;Dear Maria, thank you so much for your kind words!…&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
