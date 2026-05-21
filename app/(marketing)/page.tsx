import Link from 'next/link'
import {
  Globe2, Zap, Heart, Mail, ThumbsUp, Brain,
  Check, ArrowRight, Star, CheckCircle2, Pencil, X, Clock,
} from 'lucide-react'
import { LogoMark, LogoWithText } from '@/components/logo'
import { Nav } from './nav'
import { AnimateIn } from '@/components/animate-in'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans">
      <Nav />
      <Hero />
      <WhyChoose />
      <WhatIsIncluded />
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
    <section className="relative overflow-hidden bg-[#f9f9f7]">
      {/* Subtle gradient mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dcfce7] rounded-full blur-[120px] opacity-40 pointer-events-none -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ede9fe] rounded-full blur-[100px] opacity-25 pointer-events-none translate-y-1/4 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Above-fold text — no scroll animation, already visible */}
        <div className="text-center mb-14">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.08] text-[#374151] text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            Meet Reviewr
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[3.8rem] sm:text-[5rem] lg:text-[6.5rem] leading-[1.01] tracking-tight text-[#0a0a0a] mb-6">
            Reply to every review<br />
            <span className="text-[#16a34a]">in one tap.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-10">
            Reviewr watches your Google Business Profile 24/7, writes a perfect
            reply the moment a review lands, and waits for your approval.
            Nothing ever posts without you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-[#16a34a] text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-[#15803d] transition-all duration-200 shadow-[0_4px_24px_rgba(22,163,74,0.35)] hover:shadow-[0_8px_36px_rgba(22,163,74,0.45)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Start replying free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white border border-black/[0.12] text-[#374151] font-medium px-8 py-4 rounded-full text-base hover:border-black/30 hover:-translate-y-0.5 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
            >
              Sign in
            </Link>
          </div>

          <p className="text-xs text-[#b0b0a8] mb-6">
            Free to start. No card needed. Cancel anytime.
          </p>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} fill="#16a34a" className="text-[#16a34a]" />
              ))}
            </div>
            <p className="text-sm text-[#6b7280]">
              <span className="italic">&ldquo;Our rating went from 4.1 to 4.6 in three months.&rdquo;</span>
              <span className="text-[#9ca3af] ml-1">— Ana K., Restaurant owner</span>
            </p>
          </div>
        </div>

        {/* Floating mockup */}
        <div className="max-w-[400px] mx-auto">
          <div className="float-anim">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-b from-[#16a34a]/10 via-[#6366f1]/8 to-transparent rounded-[3rem] blur-3xl" />
              <ReviewMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewMockup() {
  return (
    <div className="w-full">
      <div className="rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]">
        <div className="bg-[#6366f1] px-5 py-4 flex items-start justify-between">
          <div>
            <div className="text-white font-semibold text-sm flex items-center gap-1.5">
              <LogoMark size={18} noShadow /> Reviewr
            </div>
            <div className="text-white/70 text-xs mt-0.5">A new review is waiting for your reply</div>
          </div>
          <div className="bg-[#facc15] rounded-2xl px-3 py-1.5 text-center shrink-0">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={10} fill="#92400e" className="text-yellow-900" />
              ))}
            </div>
            <div className="text-yellow-900 text-[10px] font-bold mt-0.5">5 / 5</div>
          </div>
        </div>

        <div className="bg-white px-5 py-4">
          <div className="inline-block bg-[#ede9fe] text-[#6366f1] text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            La Bella Vista
          </div>
          <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-2xl px-4 py-3 mb-3">
            <div className="text-sm font-semibold text-[#0a0a0a]">Christian K.</div>
            <div className="text-xs text-[#9ca3af] mb-2">Friday, May 16, 2026</div>
            <div className="text-sm text-[#374151] italic leading-relaxed">
              &ldquo;Best meal we&apos;ve had all year. The pasta was out of this world and the
              atmosphere made it even better.&rdquo;
            </div>
          </div>
          <div className="text-[10px] text-[#6366f1] uppercase tracking-widest font-semibold flex items-center gap-1 mb-2">
            ✨ System draft reply
          </div>
          <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-2xl px-4 py-3 text-sm text-[#374151] leading-relaxed mb-4">
            Christian, thank you so much — this truly made our team&apos;s day! We&apos;re so glad
            the pasta hit the spot. We can&apos;t wait to welcome you back!
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button type="button" className="bg-[#10b981] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1">
              <CheckCircle2 size={12} /> Approve
            </button>
            <button type="button" className="bg-[#6366f1] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1">
              <Pencil size={12} /> Edit
            </button>
            <button type="button" className="bg-[#ef4444] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1">
              <X size={12} /> Discard
            </button>
          </div>
        </div>

        <div className="bg-[#f9fafb] px-5 py-2.5 border-t border-black/[0.06] flex items-center justify-between">
          <div className="text-xs text-[#9ca3af]">
            Sent by <span className="text-[#6366f1] font-medium">Reviewr</span>
          </div>
          <div className="text-xs text-[#6366f1] font-medium">Open dashboard →</div>
        </div>
      </div>
      <p className="text-[11px] text-[#b0b0a8] text-center mt-3">
        Your actual email. Nothing posts until you approve.
      </p>
    </div>
  )
}

// ─── WHY CHOOSE ─────────────────────────────────────────────────────────────

function WhyChoose() {
  return (
    <section id="why" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36">
        <AnimateIn>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mb-4 font-semibold text-center">
            Why Reviewr
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] text-center mb-4">
            Set it. Approve it. Done.
          </h2>
          <p className="text-base text-[#6b7280] text-center max-w-md mx-auto mb-16">
            Reviewr is the most complete review reply system for Google Business Profile owners.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 01 */}
          <AnimateIn delay={0} className="h-full">
            <div className="relative bg-white border border-black/[0.07] rounded-3xl p-8 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-5 right-6 font-serif text-7xl leading-none select-none pointer-events-none text-[#f3f3f1]">01</div>
              <div className="w-11 h-11 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-6 shadow-sm">
                <Clock size={20} className="text-[#16a34a]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#0a0a0a]">Free up your time</h3>
              <p className="text-sm leading-relaxed text-[#6b7280]">
                Stop spending 20 minutes crafting the perfect reply to a 2-star review. The system
                does it for you — better than you&apos;d write it yourself, in under 30 seconds.
              </p>
            </div>
          </AnimateIn>

          {/* Card 02 */}
          <AnimateIn delay={80} className="h-full">
            <div className="relative bg-[#f5f3ff] border border-[#ede9fe] rounded-3xl p-8 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-5 right-6 font-serif text-7xl leading-none select-none pointer-events-none text-[#ddd8f7]">02</div>
              <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center mb-6 shadow-sm">
                <Brain size={20} className="text-violet-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#0a0a0a]">Protect your reputation on autopilot</h3>
              <p className="text-sm leading-relaxed text-[#4a4460]">
                Every unanswered review is a public signal that you don&apos;t care. Reviewr makes sure
                every single review gets a reply — even when you&apos;re slammed.
              </p>
            </div>
          </AnimateIn>

          {/* Card 03 — dark */}
          <AnimateIn delay={160} className="h-full">
            <div className="relative bg-[#0a0f1e] rounded-3xl p-8 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15),0_24px_56px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-5 right-6 font-serif text-7xl leading-none select-none pointer-events-none text-white/[0.05]">03</div>
              <div className="w-11 h-11 rounded-2xl bg-[#16a34a]/15 flex items-center justify-center mb-6">
                <ThumbsUp size={20} className="text-[#16a34a]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-white">You&apos;re still the boss</h3>
              <p className="text-sm leading-relaxed text-[#9ca3af]">
                Stay in complete control. Nothing ever posts without you. You approve, edit, or
                discard every reply. Full control, zero effort.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

// ─── WHAT IS INCLUDED ───────────────────────────────────────────────────────

function WhatIsIncluded() {
  const features = [
    {
      icon: Globe2,
      title: "Replies in the customer's language",
      body: 'Automatically detects 30+ languages so you connect with every customer — no setup, no switching. Slovenian, English, Spanish — replied to in kind, every time.',
      outcome: 'No setup. Detects automatically.',
      bg: 'bg-white', iconBg: 'bg-[#e6f0f7]', iconColor: 'text-blue-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Mail,
      title: 'Email alert for every draft',
      body: 'Notified the moment a draft is ready. Approve from your inbox in seconds.',
      outcome: 'Average approval time: 12 seconds.',
      bg: 'bg-[#f0fdf4]', iconBg: 'bg-white/80', iconColor: 'text-[#16a34a]',
      cols: 'lg:col-span-2',
    },
    {
      icon: ThumbsUp,
      title: 'One tap to approve and go live',
      body: 'Review and post without opening a laptop. Done from anywhere.',
      outcome: 'No dashboard login needed.',
      bg: 'bg-white', iconBg: 'bg-[#f0fdf4]', iconColor: 'text-[#16a34a]',
      cols: 'lg:col-span-2',
    },
    {
      icon: Brain,
      title: 'Sounds exactly like you',
      body: 'Learns from every reply you approve. The drafts match your tone, not a generic template.',
      outcome: 'Starts matching your tone in as few as 3 approvals.',
      bg: 'bg-[#f5f3ff]', iconBg: 'bg-white/70', iconColor: 'text-violet-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Heart,
      title: '1-star reviews handled with care',
      body: 'Empathetic and professional. No defensive replies. No reputation damage.',
      outcome: 'Turns critics into return customers.',
      bg: 'bg-white', iconBg: 'bg-[#fef3f0]', iconColor: 'text-rose-500',
      cols: 'lg:col-span-1',
    },
    {
      icon: Zap,
      title: 'Gets sharper with every approval',
      body: 'Every tap teaches the system more about your voice. Drafts improve over time.',
      outcome: 'Better every week.',
      bg: 'bg-[#f9fafb]', iconBg: 'bg-[#e8f5ee]', iconColor: 'text-emerald-600',
      cols: 'lg:col-span-2',
    },
  ]

  return (
    <section id="includes" className="bg-[#f7f7f5]">
      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36">
        <AnimateIn>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mb-4 font-semibold text-center">
            What&apos;s included
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] text-center mb-4">
            Everything included.<br />Nothing to configure.
          </h2>
          <p className="text-base text-[#6b7280] text-center max-w-lg mx-auto mb-16">
            Everything you need to turn your Google reviews from a stress into a strength —
            fully automatic, always in your control.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={i * 60} className={`${f.cols} h-full`}>
              <div
                className={`${f.bg} border border-black/[0.06] rounded-3xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 cursor-default h-full flex flex-col`}
              >
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shrink-0`}>
                  <f.icon size={22} className={f.iconColor} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-[#0a0a0a] mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-3 flex-1">{f.body}</p>
                <p className="text-xs text-[#16a34a] font-medium">✓ {f.outcome}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURE SPOTLIGHT ──────────────────────────────────────────────────────

function FeatureSpotlight() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <AnimateIn>
          <span className="inline-block text-xs font-semibold text-[#16a34a] bg-[#f0fdf4] border border-[#bbf7d0] px-3.5 py-1.5 rounded-full mb-6">
            Key feature
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] leading-tight mb-6">
            Get notified by email the moment a draft is ready.
          </h2>

          {/* Steps */}
          <div className="flex items-start gap-3 mb-8">
            {[
              { icon: Star,         label: 'Review lands' },
              { icon: Mail,         label: 'Draft to inbox' },
              { icon: CheckCircle2, label: 'Posted to Google' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center">
                    <step.icon size={16} className="text-[#16a34a]" />
                  </div>
                  <span className="text-[10px] text-[#6b7280] font-medium text-center leading-tight w-16">{step.label}</span>
                </div>
                {i < 2 && (
                  <ArrowRight size={14} className="text-[#d1d5db] shrink-0 -mt-5" />
                )}
              </div>
            ))}
          </div>

          <p className="text-base text-[#6b7280] leading-relaxed mb-5">
            No need to log in and check. The moment a new review comes in, Reviewr writes the
            reply and sends it straight to your inbox. Open it. Click approve. Done.
          </p>
          <p className="text-sm font-semibold text-[#374151]">
            From new review to posted reply — without opening a laptop.
          </p>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="flex justify-center lg:justify-end">
            <div className="w-72 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]">
              <div className="bg-[#6366f1] px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                    <LogoMark size={16} noShadow /> Reviewr
                  </div>
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
                  <div className="text-[11px] font-semibold text-[#0a0a0a]">Ana K.</div>
                  <div className="text-[9px] text-[#9ca3af] mb-1">Friday, May 16, 2026</div>
                  <div className="text-[10px] text-[#374151] italic leading-relaxed">&ldquo;Amazing! Best pastries I&apos;ve had in years.&rdquo;</div>
                </div>
                <div className="text-[8px] text-[#6366f1] uppercase tracking-widest font-semibold mb-1">✨ System draft reply</div>
                <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-xl px-3 py-2 text-[10px] text-[#374151] leading-relaxed mb-3">
                  Thank you so much, Ana! We&apos;re thrilled you loved the pastries — made fresh every morning just for moments like this!
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-[#10b981] text-white text-[9px] font-semibold text-center py-2 rounded-xl">✓ Approve</div>
                  <div className="bg-[#6366f1] text-white text-[9px] font-semibold text-center py-2 rounded-xl">✎ Edit</div>
                  <div className="bg-[#ef4444] text-white text-[9px] font-semibold text-center py-2 rounded-xl">✕ Discard</div>
                </div>
              </div>
              <div className="bg-[#f9fafb] px-4 py-2 border-t border-black/[0.06] flex items-center justify-between">
                <div className="text-[9px] text-[#9ca3af]">Sent by <span className="text-[#6366f1] font-medium">Reviewr</span></div>
                <div className="text-[9px] text-[#6366f1] font-medium">Open dashboard →</div>
              </div>
            </div>
          </div>
        </AnimateIn>
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
      bg: 'bg-[#f5f3ff]', avatarBg: 'bg-violet-100', avatarText: 'text-violet-700',
    },
    {
      name: 'Marco F.', initials: 'MF', role: 'Hotel manager',
      quote: "Guests have commented that our responses feel warm and personal. They have no idea how fast they're written.",
      bg: 'bg-white', avatarBg: 'bg-orange-50', avatarText: 'text-orange-500',
    },
    {
      name: 'Petra N.', initials: 'PN', role: 'Salon director',
      quote: 'I approve maybe 10 replies a week from my phone. Takes 3 minutes total. My reputation is on autopilot.',
      bg: 'bg-[#f0fdf4]', avatarBg: 'bg-green-50', avatarText: 'text-[#16a34a]',
    },
    {
      name: 'Luka B.',  initials: 'LB', role: 'Bar & pub owner',
      quote: "Used to dread 1-star reviews. Now I'm almost excited — the reply goes out before I've even finished reading it.",
      bg: 'bg-white', avatarBg: 'bg-blue-50', avatarText: 'text-blue-500',
    },
    {
      name: 'Sara M.',  initials: 'SM', role: 'Retail shop owner',
      quote: 'Setup took 4 minutes. I connected my Google profile, picked email notifications, and it just works.',
      bg: 'bg-[#fafaf7]', avatarBg: 'bg-[#f0fdf4]', avatarText: 'text-[#16a34a]',
    },
  ]

  const featured = {
    name: 'David R.', initials: 'DR', role: 'Healthcare practice',
    quote: "Professional, empathetic, and always on-brand. I couldn't write better replies myself if I had the time.",
  }

  return (
    <section className="bg-[#f7f7f5]">
      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36">
        <AnimateIn>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mb-4 font-semibold text-center">
            Reviews
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] text-center mb-16">
            What happens after the first week.
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-3 mb-3">
          {reviews.map((r, i) => (
            <AnimateIn key={r.name} delay={i * 60} className={r.featured ? 'md:col-span-2 h-full' : 'h-full'}>
              <div
                className={`${r.bg} border border-black/[0.06] rounded-3xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col`}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} fill="#16a34a" className="text-[#16a34a]" />
                  ))}
                </div>
                <p className={`text-[#374151] leading-relaxed mb-5 flex-1 ${r.featured ? 'font-serif text-xl italic' : 'text-sm'}`}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${r.avatarBg} ${r.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0a0a0a]">{r.name}</div>
                    <div className="text-xs text-[#9ca3af]">{r.role}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Featured dark quote */}
        <AnimateIn delay={100}>
          <div className="bg-[#0a0f1e] rounded-3xl p-10 relative overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.24)]">
            <div className="absolute top-4 right-8 font-serif text-[7rem] text-white/[0.04] leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="flex gap-0.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="#16a34a" className="text-[#16a34a]" />
              ))}
            </div>
            <p className="font-serif text-2xl lg:text-3xl text-white italic leading-relaxed mb-8 max-w-3xl">
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
        </AnimateIn>
      </div>
    </section>
  )
}

// ─── RATING STATS ───────────────────────────────────────────────────────────

function RatingStats() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36 text-center">
        <AnimateIn>
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={26} fill="#16a34a" className="text-[#16a34a]" />
            ))}
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tight text-[#0a0a0a] mb-5">
            Elevate your business.<br />One less thing to worry about.
          </h2>
          <p className="text-base text-[#6b7280] max-w-md mx-auto mb-14">
            Business owners use Reviewr to protect their Google reputation — without spending
            an hour a week writing replies.
          </p>
        </AnimateIn>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
          {[
            { value: '< 30s', label: 'Average draft time',  bg: 'bg-[#f5f3ff]', border: 'border-[#ede9fe]', val: 'text-violet-700' },
            { value: '4.9★',  label: 'Owner satisfaction',  bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', val: 'text-[#16a34a]'  },
            { value: '100%',  label: 'Reviews get a reply', bg: 'bg-[#fff7ed]', border: 'border-[#fed7aa]', val: 'text-orange-500' },
          ].map((s, i) => (
            <AnimateIn key={s.label} delay={i * 80} className="flex-1">
              <div className={`${s.bg} border ${s.border} rounded-3xl px-8 py-8 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full`}>
                <div className={`font-serif text-5xl ${s.val} mb-2`}>{s.value}</div>
                <div className="text-[11px] text-[#9ca3af] uppercase tracking-widest font-medium">{s.label}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCTA() {
  const solo   = ['1 location', 'Unlimited replies', 'Email alerts for every draft', 'Cancel anytime']
  const growth = [
    'Everything in Solo',
    'Up to 5 locations — one dashboard',
    '3 team seats with manager permissions',
    'Priority support',
  ]

  return (
    <section id="cta" className="bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <AnimateIn>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563] mb-5 font-semibold">
            Pricing
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tight text-white leading-tight mb-10">
            Start your<br />free trial.
          </h2>
        </AnimateIn>

        <AnimateIn delay={60}>
          <p className="text-base text-[#6b7280] max-w-lg mx-auto mb-5 leading-relaxed">
            The average business loses 9 customers per month to unanswered reviews. At €50 per
            customer, that&apos;s
          </p>

          <div className="flex items-end justify-center gap-6 mb-5">
            <div className="text-center">
              <span className="font-serif text-5xl text-[#f87171] line-through opacity-70">€450</span>
              <p className="text-[11px] text-[#4b5563] mt-1.5 uppercase tracking-wider">avg. monthly loss</p>
            </div>
            <div className="mb-7 text-[#4b5563]">
              <ArrowRight size={20} />
            </div>
            <div className="text-center">
              <div className="flex items-end justify-center gap-1.5">
                <span className="font-serif text-2xl text-[#6b7280] line-through opacity-50">€29</span>
                <span className="font-serif text-5xl text-[#16a34a]">€19</span>
              </div>
              <p className="text-[11px] text-[#4b5563] mt-1.5 uppercase tracking-wider">Reviewr / month</p>
            </div>
          </div>

          <p className="text-lg text-[#16a34a] font-semibold mb-14">
            Reviewr costs less than one lost customer.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 items-start">
          {/* Solo */}
          <AnimateIn delay={80}>
            <div className="bg-[#111827] border border-[#1f2937] rounded-3xl p-8 text-left shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="text-xs uppercase tracking-widest text-[#6b7280] mb-4 font-semibold">Solo</div>
              <div className="flex items-end gap-2 mb-7">
                <span className="font-serif text-2xl text-[#4b5563] line-through">€29</span>
                <span className="font-serif text-5xl text-white">€19</span>
                <span className="text-sm text-[#6b7280] mb-1.5">/month</span>
              </div>
              <ul className="space-y-3 mb-7">
                {solo.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#d1d5db]">
                    <Check size={14} className="text-[#16a34a] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#4b5563] mb-4">14-day free trial. No card needed.</p>
              <Link
                href="/signup"
                className="block text-center text-sm font-semibold border border-[#374151] text-white px-4 py-3.5 rounded-2xl hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                Start replying free
              </Link>
            </div>
          </AnimateIn>

          {/* Growth */}
          <AnimateIn delay={160}>
            <div className="relative pt-5">
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <span className="bg-white text-[#16a34a] text-xs font-bold px-4 py-1.5 rounded-full border border-[#16a34a]/20 shadow-sm whitespace-nowrap">
                  Most popular
                </span>
              </div>
              <div className="bg-[#16a34a] rounded-3xl p-8 text-left shadow-[0_8px_48px_rgba(22,163,74,0.45)]">
                <div className="text-xs uppercase tracking-widest text-[#bbf7d0] mb-4 font-semibold">Growth</div>
                <div className="flex items-end gap-1.5 mb-7">
                  <span className="font-serif text-5xl text-white">€49</span>
                  <span className="text-sm text-[#bbf7d0] mb-1.5">/month</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {growth.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white">
                      <Check size={14} className="text-white shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#bbf7d0]/70 mb-4">14-day free trial. No card needed.</p>
                <Link
                  href="/signup"
                  className="block text-center text-sm font-semibold bg-white text-[#16a34a] px-4 py-3.5 rounded-2xl hover:bg-[#f0fdf4] transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                >
                  Get Growth free
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>

        <p className="text-xs text-[#374151]">
          No contracts. No hidden fees. No small print. By signing up you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </section>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center border-b border-black/[0.06]">
        <p className="text-sm text-[#9ca3af] italic">
          &ldquo;Every review is someone deciding whether to trust you.&rdquo;
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 transition-all duration-200 hover:opacity-80">
          <LogoWithText height={26} />
        </Link>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Terms of Use', 'Contact'].map(l => (
            <a
              key={l}
              href="#"
              className="text-sm text-[#9ca3af] hover:text-[#6b7280] transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
        <span className="text-sm text-[#9ca3af]">© 2026 Reviewr</span>
      </div>
    </footer>
  )
}
