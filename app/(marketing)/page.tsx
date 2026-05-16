import Link from 'next/link'
import {
  Globe2, Zap, Heart, Mail, ThumbsUp, Brain,
  Check, ArrowRight, Star, CheckCircle2, Pencil, X, Clock
} from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { Nav } from './nav'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0a0f1e] font-sans">
      <Nav />
      <Hero />
      <WhatIsIncluded />
      <WhyChoose />
      <FeatureSpotlight />
      <UserReviews />
      <RatingStats />
      <FinalCTA />
      <Footer />
    </div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b border-[#e8e8e3] overflow-hidden relative">
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-[#dcfce7] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -left-24 w-80 h-80 bg-[#ede9fe] rounded-full blur-3xl opacity-35 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-14 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 text-[#16a34a] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            Meet Reviewr
          </div>

          <h1 className="font-serif text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight text-[#0a0f1e] mb-6">
            Reply to every review<br />
            <span className="text-[#16a34a]">in one tap.</span>
          </h1>
          <p className="text-lg text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-10">
            Reviewr watches your Google Business Profile 24/7, writes a perfect reply the
            moment a review lands, and waits for your approval. Nothing ever posts without you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-[#16a34a] text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-[#15803d] transition-all duration-200 text-base w-full sm:w-auto justify-center shadow-[0_4px_24px_rgba(22,163,74,0.35)] hover:shadow-[0_8px_36px_rgba(22,163,74,0.45)] hover:-translate-y-0.5"
            >
              Start replying free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border border-[#e0dfd9] text-[#374151] font-medium px-8 py-3.5 rounded-2xl hover:border-[#0a0f1e] hover:-translate-y-0.5 transition-all duration-200 text-base w-full sm:w-auto justify-center bg-white shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            >
              Sign in
            </Link>
          </div>
          <p className="text-xs text-[#b0b0a8] mt-4">Free to start. No card needed. Cancel anytime.</p>
        </div>

        <div className="max-w-sm mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#dcfce7] to-[#ede9fe] rounded-3xl opacity-70 blur-2xl translate-y-8 scale-90 -z-10" />
          <ReviewMockup />
        </div>
      </div>
    </section>
  )
}

function ReviewMockup() {
  return (
    <div className="w-full">
      <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.07)] ring-1 ring-black/5">
        <div className="bg-[#6366f1] px-5 py-4 flex items-start justify-between">
          <div>
            <div className="text-white font-semibold text-base flex items-center gap-1.5">
              <Star size={15} fill="#facc15" className="text-yellow-400" /> Reviewr
            </div>
            <div className="text-white/70 text-xs mt-0.5">A new review is waiting for your reply</div>
          </div>
          <div className="bg-[#facc15] rounded-2xl px-3 py-1.5 text-center shrink-0">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#92400e" className="text-yellow-900" />)}
            </div>
            <div className="text-yellow-900 text-[10px] font-bold mt-0.5">5 / 5</div>
          </div>
        </div>
        <div className="bg-white px-5 py-4">
          <div className="inline-block bg-[#ede9fe] text-[#6366f1] text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            La Bella Vista
          </div>
          <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-2xl px-4 py-3 mb-3">
            <div className="text-sm font-semibold text-[#0a0f1e]">Christian K.</div>
            <div className="text-xs text-[#9ca3af] mb-2">Friday, May 16, 2026</div>
            <div className="text-sm text-[#374151] italic leading-relaxed">
              &ldquo;Best meal we&apos;ve had all year. The pasta was out of this world and the atmosphere made it even better.&rdquo;
            </div>
          </div>
          <div className="text-[10px] text-[#6366f1] uppercase tracking-widest font-semibold flex items-center gap-1 mb-2">
            ✨ System draft reply
          </div>
          <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-2xl px-4 py-3 text-sm text-[#374151] leading-relaxed mb-4">
            Christian, thank you so much — this truly made our team&apos;s day! We&apos;re so glad the pasta hit the spot. We can&apos;t wait to welcome you back!
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button type="button" className="bg-[#10b981] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-[0_2px_12px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={12} /> Approve
            </button>
            <button type="button" className="bg-[#6366f1] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-[0_2px_12px_rgba(99,102,241,0.3)]">
              <Pencil size={12} /> Edit
            </button>
            <button type="button" className="bg-[#ef4444] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-[0_2px_12px_rgba(239,68,68,0.25)]">
              <X size={12} /> Discard
            </button>
          </div>
        </div>
        <div className="bg-[#f9fafb] px-5 py-2.5 border-t border-[#e5e7eb] flex items-center justify-between">
          <div className="text-xs text-[#9ca3af]">Sent by <span className="text-[#6366f1] font-medium">Reviewr</span></div>
          <div className="text-xs text-[#6366f1] font-medium">Open dashboard →</div>
        </div>
      </div>
      <p className="text-[11px] text-[#b0b0a8] text-center mt-3">
        Your actual email. Nothing posts until you approve.
      </p>
    </div>
  )
}

// ─── WHAT IS INCLUDED ───────────────────────────────────────────────────────

function WhatIsIncluded() {
  // Ordered for bento: 1+2 / 2+1 / 1+2 col pattern on lg
  const features = [
    {
      icon: Globe2,
      title: "Replies in the customer’s language",
      body: 'Detects 30+ languages automatically. Slovenian, English, Spanish — responds in kind, every time.',
      outcome: '✓ No setup. Detects automatically.',
      bg: 'bg-[#e6f0f7]', iconBg: 'bg-white/60', iconColor: 'text-blue-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Mail,
      title: 'Email alert for every draft',
      body: 'Notified the moment a draft is ready. Approve from your inbox in seconds.',
      outcome: '✓ Average approval time: 12 seconds.',
      bg: 'bg-[#f0fdf4]', iconBg: 'bg-white/70', iconColor: 'text-[#16a34a]',
      cols: 'lg:col-span-2', highlight: true,
    },
    {
      icon: ThumbsUp,
      title: 'One tap to approve and go live',
      body: 'Review and post without opening a laptop. Done from anywhere.',
      outcome: '✓ No dashboard login needed.',
      bg: 'bg-[#f0fdf4]', iconBg: 'bg-white/70', iconColor: 'text-[#16a34a]',
      cols: 'lg:col-span-2', highlight: true,
    },
    {
      icon: Brain,
      title: 'Sounds exactly like you',
      body: 'Learns from every reply you approve. The drafts match your tone, not a generic template.',
      outcome: '✓ Learns from 3 approvals.',
      bg: 'bg-[#eeebfa]', iconBg: 'bg-white/60', iconColor: 'text-violet-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Heart,
      title: '1-star reviews handled with care',
      body: 'Empathetic and professional. No defensive replies. No reputation damage.',
      outcome: '✓ Turns critics into return customers.',
      bg: 'bg-[#fef3f0]', iconBg: 'bg-white/60', iconColor: 'text-rose-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Zap,
      title: 'Gets sharper with every approval',
      body: 'Every tap teaches the system more about your voice. Drafts improve over time.',
      outcome: '✓ Better every week.',
      bg: 'bg-[#fafaf2]', iconBg: 'bg-[#e8f5ee]', iconColor: 'text-emerald-600',
      cols: 'lg:col-span-2',
    },
  ]

  return (
    <section id="includes" className="border-b border-[#e8e8e3]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">What&apos;s included</p>
        <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0f1e] text-center mb-4">
          Everything included.<br />Nothing to configure.
        </h2>
        <p className="text-base text-[#6b7280] text-center max-w-lg mx-auto mb-14">
          Everything you need to turn your Google reviews from a stress into a strength — fully automatic, always in your control.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div
              key={f.title}
              className={`${f.cols} ${f.bg} rounded-3xl p-7 shadow-[0_1px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200 cursor-default ${'highlight' in f && f.highlight ? 'ring-1 ring-[#16a34a]/20' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                <f.icon size={24} className={f.iconColor} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-[#0a0f1e] mb-2 leading-snug">{f.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-3">{f.body}</p>
              <p className="text-xs text-[#16a34a] font-medium">{f.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHY CHOOSE ─────────────────────────────────────────────────────────────

function WhyChoose() {
  return (
    <section id="why" className="border-b border-[#e8e8e3] bg-[#f5f4ef]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">Why Reviewr</p>
        <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0f1e] text-center mb-3">
          Set it. Approve it. Done.
        </h2>
        <p className="text-base text-[#6b7280] text-center max-w-md mx-auto mb-14">
          Reviewr is the most complete review reply system for Google Business Profile owners.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative bg-white rounded-3xl p-8 overflow-hidden shadow-[0_1px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-4 right-5 font-serif text-6xl leading-none select-none pointer-events-none text-[#f0efe9]">01</div>
            <div className="w-11 h-11 rounded-2xl bg-[#e8f5ee] flex items-center justify-center mb-6">
              <Clock size={20} className="text-[#16a34a]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[#0a0f1e]">Free up your time</h3>
            <p className="text-sm leading-relaxed text-[#6b7280]">Stop spending 20 minutes crafting the perfect reply to a 2-star review. The system does it for you — better than you&apos;d write it yourself, in under 30 seconds.</p>
          </div>

          <div className="relative bg-[#eeebfa] rounded-3xl p-8 overflow-hidden shadow-[0_1px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-4 right-5 font-serif text-6xl leading-none select-none pointer-events-none text-[#d8d3f5]">02</div>
            <div className="w-11 h-11 rounded-2xl bg-white/60 flex items-center justify-center mb-6">
              <Brain size={20} className="text-violet-500" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[#0a0f1e]">Protect your reputation on autopilot</h3>
            <p className="text-sm leading-relaxed text-[#4a4460]">Every unanswered review is a public signal that you don&apos;t care. Reviewr makes sure every single review gets a reply — even when you&apos;re slammed.</p>
          </div>

          <div className="relative bg-[#0a0f1e] rounded-3xl p-8 overflow-hidden shadow-[0_1px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-4 right-5 font-serif text-6xl leading-none select-none pointer-events-none text-white/5">03</div>
            <div className="w-11 h-11 rounded-2xl bg-[#16a34a]/20 flex items-center justify-center mb-6">
              <ThumbsUp size={20} className="text-[#16a34a]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">You&apos;re still the boss</h3>
            <p className="text-sm leading-relaxed text-[#9ca3af]">Stay in complete control. Nothing ever posts without you. You approve, edit, or discard every reply. Full control, zero effort.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FEATURE SPOTLIGHT ──────────────────────────────────────────────────────

function FeatureSpotlight() {
  return (
    <section className="border-b border-[#e8e8e3]">
      <div className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block text-xs font-semibold text-[#16a34a] bg-[#16a34a]/10 px-3 py-1 rounded-full mb-5">
            Key feature
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0f1e] leading-tight mb-5">
            Get notified by email the moment a draft is ready.
          </h2>

          <div className="flex items-start gap-2 mb-7">
            {[
              { icon: Star,         label: 'Review lands' },
              { icon: Mail,         label: 'Draft to inbox' },
              { icon: CheckCircle2, label: 'Posted to Google' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#16a34a]/10 flex items-center justify-center shadow-[0_2px_8px_rgba(22,163,74,0.12)]">
                    <step.icon size={16} className="text-[#16a34a]" />
                  </div>
                  <span className="text-[10px] text-[#6b7280] font-medium text-center leading-tight w-16">{step.label}</span>
                </div>
                {i < 2 && <ArrowRight size={12} className="text-[#d1d5db] shrink-0 mb-4" />}
              </div>
            ))}
          </div>

          <p className="text-base text-[#6b7280] leading-relaxed mb-6">
            No need to log in and check. The moment a new review comes in, Reviewr writes the reply and sends it straight to your inbox. Open it. Click approve. Done.
          </p>
          <p className="text-sm text-[#374151] font-medium">
            From new review to posted reply — without opening a laptop.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-72 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            <div className="bg-[#6366f1] px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">⭐ Reviewr</div>
                <div className="text-white/70 text-[10px] mt-0.5">A new review is waiting for your reply</div>
              </div>
              <div className="bg-[#facc15] rounded-xl px-2.5 py-1.5 text-center shrink-0">
                <div className="text-sm leading-none">⭐⭐⭐⭐⭐</div>
                <div className="text-yellow-900 text-[9px] font-bold mt-0.5">5 / 5</div>
              </div>
            </div>
            <div className="bg-white px-4 py-3">
              <div className="inline-block bg-[#ede9fe] text-[#6366f1] text-[9px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-2">
                Ana&apos;s Bakery
              </div>
              <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-xl px-3 py-2 mb-2">
                <div className="text-[11px] font-semibold text-[#0a0f1e]">Ana K.</div>
                <div className="text-[9px] text-[#9ca3af] mb-1">Friday, May 16, 2026</div>
                <div className="text-[10px] text-[#374151] italic leading-relaxed">&ldquo;Amazing! Best pastries I&apos;ve had in years.&rdquo;</div>
              </div>
              <div className="text-[8px] text-[#6366f1] uppercase tracking-widest font-semibold mb-1">✨ System draft reply</div>
              <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-xl px-3 py-2 text-[10px] text-[#374151] leading-relaxed mb-3">
                Thank you so much, Ana! We&apos;re thrilled you loved the pastries — made fresh every morning just for moments like this!
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-[#10b981] text-white text-[9px] font-semibold text-center py-2 rounded-xl shadow-[0_1px_6px_rgba(16,185,129,0.3)]">✓ Approve</div>
                <div className="bg-[#6366f1] text-white text-[9px] font-semibold text-center py-2 rounded-xl shadow-[0_1px_6px_rgba(99,102,241,0.3)]">✎ Edit</div>
                <div className="bg-[#ef4444] text-white text-[9px] font-semibold text-center py-2 rounded-xl shadow-[0_1px_6px_rgba(239,68,68,0.25)]">✕ Discard</div>
              </div>
            </div>
            <div className="bg-[#f9fafb] px-4 py-2 border-t border-[#e5e7eb] flex items-center justify-between">
              <div className="text-[9px] text-[#9ca3af]">Sent by <span className="text-[#6366f1] font-medium">Reviewr</span></div>
              <div className="text-[9px] text-[#6366f1] font-medium">Open dashboard →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── USER REVIEWS ───────────────────────────────────────────────────────────

function UserReviews() {
  const reviews = [
    {
      name: 'Ana K.',   initials: 'AK', role: 'Restaurant owner',
      quote: 'Our rating went from 4.1 to 4.6 in three months. Every review gets a reply now — we never let one sit.',
      featured: true,
      bg: 'bg-[#eeebfa]', avatarBg: 'bg-violet-200', avatarText: 'text-violet-700',
    },
    {
      name: 'Marco F.', initials: 'MF', role: 'Hotel manager',
      quote: "Guests have commented that our responses feel warm and personal. They have no idea how fast they're written.",
      bg: 'bg-[#fbefe4]', avatarBg: 'bg-orange-100', avatarText: 'text-orange-600',
    },
    {
      name: 'Petra N.', initials: 'PN', role: 'Salon director',
      quote: 'I approve maybe 10 replies a week from my phone. Takes 3 minutes total. My reputation is on autopilot.',
      bg: 'bg-[#e8f5ee]', avatarBg: 'bg-green-100', avatarText: 'text-[#16a34a]',
    },
    {
      name: 'Luka B.',  initials: 'LB', role: 'Bar & pub owner',
      quote: "Used to dread 1-star reviews. Now I'm almost excited — the reply goes out before I've even finished reading it.",
      bg: 'bg-[#e6f0f7]', avatarBg: 'bg-blue-100', avatarText: 'text-blue-600',
    },
    {
      name: 'Sara M.',  initials: 'SM', role: 'Retail shop owner',
      quote: 'Setup took 4 minutes. I connected my Google profile, picked email notifications, and it just works.',
      bg: 'bg-white', avatarBg: 'bg-[#16a34a]/15', avatarText: 'text-[#16a34a]',
    },
  ]

  const featured = {
    name: 'David R.', initials: 'DR', role: 'Healthcare practice',
    quote: "Professional, empathetic, and always on-brand. I couldn't write better replies myself if I had the time.",
  }

  return (
    <section className="border-b border-[#e8e8e3] bg-[#f5f4ef]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">Reviews</p>
        <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0f1e] text-center mb-14">
          What happens after the first week.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {reviews.map(r => (
            <div
              key={r.name}
              className={`${r.bg} rounded-3xl p-6 shadow-[0_1px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200 ${r.featured ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} fill="#16a34a" className="text-[#16a34a]" />
                ))}
              </div>
              <p className={`text-[#374151] leading-relaxed mb-4 ${r.featured ? 'font-serif text-xl italic' : 'text-sm'}`}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${r.avatarBg} ${r.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#0a0f1e]">{r.name}</div>
                  <div className="text-xs text-[#9ca3af]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0f1e] rounded-3xl p-8 relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.2)]">
          <div className="absolute top-2 right-6 font-serif text-[8rem] text-white/5 leading-none select-none pointer-events-none">
            &ldquo;
          </div>
          <div className="flex gap-0.5 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#16a34a" className="text-[#16a34a]" />
            ))}
          </div>
          <p className="font-serif text-2xl lg:text-3xl text-white italic leading-relaxed mb-6 max-w-3xl">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#16a34a]/20 text-[#16a34a] text-sm font-bold flex items-center justify-center shrink-0">
              {featured.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{featured.name}</div>
              <div className="text-xs text-[#6b7280]">{featured.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── RATING STATS ───────────────────────────────────────────────────────────

function RatingStats() {
  return (
    <section className="border-b border-[#e8e8e3]">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={28} fill="#16a34a" className="text-[#16a34a]" />
          ))}
        </div>
        <h2 className="font-serif text-4xl lg:text-6xl tracking-tight text-[#0a0f1e] mb-5">
          Elevate your business.<br />One less thing to worry about.
        </h2>
        <p className="text-base text-[#6b7280] max-w-md mx-auto mb-12">
          Business owners use Reviewr to protect their Google reputation — without spending an hour a week writing replies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {[
            { value: '< 30s', label: 'Average draft time',  bg: 'bg-[#eeebfa]', val: 'text-violet-700' },
            { value: '4.9★',  label: 'Owner satisfaction',  bg: 'bg-[#e8f5ee]', val: 'text-[#16a34a]'   },
            { value: '100%',  label: 'Reviews get a reply', bg: 'bg-[#fbefe4]', val: 'text-orange-600' },
          ].map(s => (
            <div
              key={s.label}
              className={`${s.bg} rounded-3xl px-10 py-7 min-w-[160px] shadow-[0_1px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-200`}
            >
              <div className={`font-serif text-4xl ${s.val} mb-1`}>{s.value}</div>
              <div className="text-[11px] text-[#9ca3af] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCTA() {
  const solo   = ['1 location', 'Unlimited replies', 'Email alerts for every draft', 'Cancel anytime']
  const growth = ['Up to 5 locations', 'Everything in Solo', 'Brand voice learning', 'Priority support']

  return (
    <section id="cta" className="border-b border-[#e8e8e3] bg-[#0a0f1e]">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#6b7280] mb-4 font-medium">Pricing</p>
        <h2 className="font-serif text-4xl lg:text-6xl tracking-tight text-white leading-tight mb-8">
          Start your<br />free trial.
        </h2>

        <p className="text-base text-[#6b7280] max-w-lg mx-auto mb-5 leading-relaxed">
          The average business loses 9 customers per month to unanswered reviews. At €50 per customer, that&apos;s
        </p>
        <div className="flex items-end justify-center gap-5 mb-5">
          <div className="text-center">
            <span className="font-serif text-5xl text-[#f87171] line-through opacity-80">€450</span>
            <p className="text-[11px] text-[#4b5563] mt-1 uppercase tracking-wider">avg. monthly loss</p>
          </div>
          <div className="mb-6">
            <ArrowRight size={22} className="text-[#4b5563]" />
          </div>
          <div className="text-center">
            <div className="flex items-end justify-center gap-1.5">
              <span className="font-serif text-2xl text-[#6b7280] line-through opacity-60">€29</span>
              <span className="font-serif text-5xl text-[#16a34a]">€19</span>
            </div>
            <p className="text-[11px] text-[#4b5563] mt-1 uppercase tracking-wider">Reviewr / month</p>
          </div>
        </div>
        <p className="text-lg text-[#16a34a] font-semibold mb-12">
          Reviewr costs less than one lost customer.
        </p>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10 items-start">
          <div className="bg-[#111827] border border-[#2a3147] rounded-3xl p-7 text-left shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <div className="text-xs uppercase tracking-widest text-[#6b7280] mb-3 font-medium">Solo</div>
            <div className="flex items-end gap-2 mb-6">
              <span className="font-serif text-2xl text-[#4b5563] line-through">€29</span>
              <span className="font-serif text-5xl text-white">€19</span>
              <span className="text-sm text-[#6b7280] mb-1.5">/month</span>
            </div>
            <ul className="space-y-2.5 mb-6">
              {solo.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#d1d5db]">
                  <Check size={13} className="text-[#16a34a] shrink-0" />{f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#4b5563] mb-3">14-day free trial. No card needed.</p>
            <Link href="/signup" className="block text-center text-sm font-semibold border border-[#4b5563] text-white px-4 py-3 rounded-2xl hover:border-white transition-colors">
              Start free
            </Link>
          </div>

          <div className="relative pt-4">
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <span className="bg-white text-[#16a34a] text-xs font-bold px-3 py-1 rounded-full border border-[#16a34a]/30 shadow-sm whitespace-nowrap">
                Most popular
              </span>
            </div>
            <div className="bg-[#16a34a] rounded-3xl p-7 text-left shadow-[0_8px_48px_rgba(22,163,74,0.4)]">
              <div className="text-xs uppercase tracking-widest text-[#bbf7d0] mb-3 font-medium">Growth</div>
              <div className="flex items-end gap-1 mb-6">
                <span className="font-serif text-5xl text-white">€49</span>
                <span className="text-sm text-[#bbf7d0] mb-1.5">/month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {growth.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                    <Check size={13} className="text-white shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#bbf7d0]/70 mb-3">14-day free trial. No card needed.</p>
              <Link href="/signup" className="block text-center text-sm font-semibold bg-white text-[#16a34a] px-4 py-3 rounded-2xl hover:bg-[#f0fdf4] transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
                Get Growth free
              </Link>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#4b5563]">
          No contracts. No hidden fees. No small print. By signing up you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </section>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#fafaf7]">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-[#9ca3af] italic mb-6">
          &ldquo;Every review is someone deciding whether to trust you.&rdquo;
        </p>
      </div>
      <div className="border-t border-[#e8e8e3]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark size={24} className="text-[#16a34a]" />
            <span className="font-serif text-base text-[#0a0f1e]">Reviewr</span>
          </Link>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Contact'].map(l => (
              <a key={l} href="#" className="text-sm text-[#9ca3af] hover:text-[#6b7280] transition-colors">{l}</a>
            ))}
          </div>
          <span className="text-sm text-[#9ca3af]">© 2026 Reviewr</span>
        </div>
      </div>
    </footer>
  )
}
