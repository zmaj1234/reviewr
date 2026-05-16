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
    <section className="border-b border-[#e8e8e3]">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-10">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 text-[#16a34a] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            Meet Reviewr
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] text-[#0a0f1e] mb-5">
            Reply to every review<br />
            <span className="text-[#16a34a]">in one tap.</span>
          </h1>
          <p className="text-lg text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
            Reviewr watches your Google Business Profile 24/7, writes a perfect reply the
            moment a review lands, and waits for your approval. Nothing ever posts without you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-[#16a34a] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#15803d] transition-colors text-base w-full sm:w-auto justify-center shadow-[0_4px_20px_rgba(22,163,74,0.3)]"
            >
              Start replying free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border border-[#e8e8e3] text-[#374151] font-medium px-7 py-3.5 rounded-xl hover:border-[#0a0f1e] transition-colors text-base w-full sm:w-auto justify-center bg-white"
            >
              Sign in
            </Link>
          </div>
          <p className="text-xs text-[#b0b0a8] mt-3">Free to start. No card needed. Cancel anytime.</p>
        </div>

        {/* Mockup with depth stack */}
        <div className="max-w-sm mx-auto relative">
          <div className="absolute inset-0 rounded-xl bg-white border border-[#d4d3ce] opacity-25 translate-y-3 translate-x-2 rotate-1 -z-10 scale-[0.98]" />
          <div className="animate-float-slow">
            <ReviewMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewMockup() {
  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        {/* Header */}
        <div className="bg-[#6366f1] px-5 py-4 flex items-start justify-between">
          <div>
            <div className="text-white font-semibold text-base flex items-center gap-1.5">
              <Star size={15} fill="#facc15" className="text-yellow-400" /> Reviewr
            </div>
            <div className="text-white/70 text-xs mt-0.5">A new review is waiting for your reply</div>
          </div>
          <div className="bg-[#facc15] rounded-xl px-3 py-1.5 text-center shrink-0">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#92400e" className="text-yellow-900" />)}
            </div>
            <div className="text-yellow-900 text-[10px] font-bold mt-0.5">5 / 5</div>
          </div>
        </div>
        {/* Body */}
        <div className="bg-white px-5 py-4">
          {/* Business pill */}
          <div className="inline-block bg-[#ede9fe] text-[#6366f1] text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            La Bella Vista
          </div>
          {/* Review */}
          <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-xl px-4 py-3 mb-3">
            <div className="text-sm font-semibold text-[#0a0f1e]">Christian K.</div>
            <div className="text-xs text-[#9ca3af] mb-2">Friday, May 16, 2026</div>
            <div className="text-sm text-[#374151] italic leading-relaxed">
              &ldquo;Best meal we&apos;ve had all year. The pasta was out of this world and the atmosphere made it even better.&rdquo;
            </div>
          </div>
          {/* Draft label */}
          <div className="text-[10px] text-[#6366f1] uppercase tracking-widest font-semibold flex items-center gap-1 mb-2">
            ✨ System draft reply
          </div>
          {/* Draft reply */}
          <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-xl px-4 py-3 text-sm text-[#374151] leading-relaxed mb-4">
            Christian, thank you so much — this truly made our team&apos;s day! We&apos;re so glad the pasta hit the spot. We can&apos;t wait to welcome you back!
          </div>
          {/* Buttons */}
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
        {/* Footer */}
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
  const features = [
    {
      icon: Globe2,
      title: 'Replies in the customer\'s language',
      body: 'Detects 30+ languages automatically. Slovenian, English, Spanish — responds in kind, every time.',
      outcome: '✓ No setup. Detects automatically.',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Brain,
      title: 'Sounds exactly like you',
      body: 'Learns from every reply you approve. The drafts match your tone, not a generic template.',
      outcome: '✓ Learns from 3 approvals.',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      icon: Heart,
      title: '1-star reviews handled with care',
      body: 'Empathetic and professional. No defensive replies. No reputation damage.',
      outcome: '✓ Turns critics into return customers.',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      icon: Mail,
      title: 'Email alert for every draft',
      body: 'Notified the moment a draft is ready. Approve from your inbox in seconds.',
      outcome: '✓ Average approval time: 12 seconds.',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      highlight: true,
    },
    {
      icon: ThumbsUp,
      title: 'One tap to approve and go live',
      body: 'Review and post without opening a laptop. Done from anywhere.',
      outcome: '✓ No dashboard login needed.',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      highlight: true,
    },
    {
      icon: Zap,
      title: 'Gets sharper with every approval',
      body: 'Every tap teaches the system more about your voice. Drafts improve over time.',
      outcome: '✓ Better every week.',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ]

  return (
    <section id="includes" className="border-b border-[#e8e8e3]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">What&apos;s included</p>
        <h2 className="font-serif text-4xl lg:text-5xl text-[#0a0f1e] text-center mb-4">
          Everything included.<br />Nothing to configure.
        </h2>
        <p className="text-base text-[#6b7280] text-center max-w-lg mx-auto mb-14">
          Everything you need to turn your Google reviews from a stress into a strength — fully automatic, always in your control.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div
              key={f.title}
              className={`rounded-xl p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
                (f as { highlight?: boolean }).highlight
                  ? 'bg-[#f0fdf4] border border-[#16a34a]/25'
                  : 'bg-white border border-[#e8e8e3]'
              }`}
            >
              <div className={`w-11 h-11 rounded-lg ${f.iconBg} flex items-center justify-center mb-4`}>
                <f.icon size={22} className={f.iconColor} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#0a0f1e] mb-1.5 leading-snug">{f.title}</h3>
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
  const benefits = [
    {
      icon: Clock,
      numeral: '01',
      title: 'Free up your time',
      body: 'Stop spending 20 minutes crafting the perfect reply to a 2-star review. The system does it for you — better than you\'d write it yourself, in under 30 seconds.',
      dark: false,
    },
    {
      icon: Brain,
      numeral: '02',
      title: 'Protect your reputation on autopilot',
      body: 'Every unanswered review is a public signal that you don\'t care. Reviewr makes sure every single review gets a reply — even when you\'re slammed.',
      dark: false,
    },
    {
      icon: ThumbsUp,
      numeral: '03',
      title: 'You\'re still the boss',
      body: 'Stay in complete control. Nothing ever posts without you. You approve, edit, or discard every reply. Full control, zero effort.',
      dark: true,
    },
  ]

  return (
    <section id="why" className="border-b border-[#e8e8e3] bg-[#f2f1ec]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">Why Reviewr</p>
        <h2 className="font-serif text-4xl lg:text-5xl text-[#0a0f1e] text-center mb-3">
          Set it. Approve it. Done.
        </h2>
        <p className="text-base text-[#6b7280] text-center max-w-md mx-auto mb-14">
          Reviewr is the most complete review reply system for Google Business Profile owners.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {benefits.map(b => (
            <div
              key={b.title}
              className={`relative rounded-xl p-7 overflow-hidden ${
                b.dark
                  ? 'bg-[#0a0f1e] border border-[#1e2535]'
                  : 'bg-white border border-[#e8e8e3]'
              }`}
            >
              <div className={`absolute top-4 right-5 font-serif text-6xl leading-none select-none pointer-events-none ${
                b.dark ? 'text-white/5' : 'text-[#f0efe9]'
              }`}>
                {b.numeral}
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${
                b.dark ? 'bg-[#16a34a]/20' : 'bg-[#16a34a]/10'
              }`}>
                <b.icon size={18} className="text-[#16a34a]" strokeWidth={1.5} />
              </div>
              <h3 className={`font-serif text-xl font-bold mb-3 ${b.dark ? 'text-white' : 'text-[#0a0f1e]'}`}>
                {b.title}
              </h3>
              <p className={`text-sm leading-relaxed ${b.dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                {b.body}
              </p>
            </div>
          ))}
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
          <h2 className="font-serif text-4xl lg:text-5xl text-[#0a0f1e] leading-tight mb-5">
            Get notified by email the moment a draft is ready.
          </h2>

          {/* 3-step flow */}
          <div className="flex items-start gap-2 mb-7">
            {[
              { icon: Star,         label: 'Review lands' },
              { icon: Mail,         label: 'Draft to inbox' },
              { icon: CheckCircle2, label: 'Posted to Google' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                    <step.icon size={15} className="text-[#16a34a]" />
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

        {/* Email mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-72 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
            {/* Email header */}
            <div className="bg-[#6366f1] px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">⭐ Reviewr</div>
                <div className="text-white/70 text-[10px] mt-0.5">A new review is waiting for your reply</div>
              </div>
              <div className="bg-white/20 rounded-lg px-2.5 py-1.5 text-center shrink-0">
                <div className="text-sm leading-none">⭐⭐⭐⭐⭐</div>
                <div className="text-white/80 text-[9px] font-medium mt-0.5">5 / 5</div>
              </div>
            </div>
            {/* Email body */}
            <div className="bg-white px-4 py-3">
              <div className="inline-block bg-[#ede9fe] text-[#6366f1] text-[9px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-2">
                Ana&apos;s Bakery
              </div>
              <div className="bg-[#f8f8fd] border-l-4 border-[#6366f1] rounded-r-lg px-3 py-2 mb-2">
                <div className="text-[11px] font-semibold text-[#0a0f1e]">Ana K.</div>
                <div className="text-[9px] text-[#9ca3af] mb-1">Friday, May 16, 2026</div>
                <div className="text-[10px] text-[#374151] italic leading-relaxed">&ldquo;Amazing! Best pastries I&apos;ve had in years.&rdquo;</div>
              </div>
              <div className="text-[8px] text-[#6366f1] uppercase tracking-widest font-semibold mb-1">✨ System draft reply</div>
              <div className="bg-[#fafafa] border border-dashed border-[#c7d2fe] rounded-lg px-3 py-2 text-[10px] text-[#374151] leading-relaxed mb-3">
                Thank you so much, Ana! We&apos;re thrilled you loved the pastries — made fresh every morning just for moments like this!
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-[#10b981] text-white text-[9px] font-semibold text-center py-2 rounded-lg">✓ Approve</div>
                <div className="bg-[#6366f1] text-white text-[9px] font-semibold text-center py-2 rounded-lg">✎ Edit</div>
                <div className="bg-[#ef4444] text-white text-[9px] font-semibold text-center py-2 rounded-lg">✕ Discard</div>
              </div>
            </div>
            {/* Email footer */}
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
  const avatarColors = [
    { bg: 'bg-[#16a34a]/15', text: 'text-[#16a34a]' },
    { bg: 'bg-blue-100',     text: 'text-blue-600'   },
    { bg: 'bg-violet-100',   text: 'text-violet-600' },
    { bg: 'bg-amber-100',    text: 'text-amber-600'  },
    { bg: 'bg-rose-100',     text: 'text-rose-600'   },
  ]

  const reviews = [
    {
      name: 'Ana K.',   initials: 'AK', role: 'Restaurant owner',
      quote: 'Our rating went from 4.1 to 4.6 in three months. Every review gets a reply now — we never let one sit.',
      featured: true,
    },
    {
      name: 'Marco F.', initials: 'MF', role: 'Hotel manager',
      quote: 'Guests have commented that our responses feel warm and personal. They have no idea how fast they\'re written.',
    },
    {
      name: 'Petra N.', initials: 'PN', role: 'Salon director',
      quote: 'I approve maybe 10 replies a week from my phone. Takes 3 minutes total. My reputation is on autopilot.',
    },
    {
      name: 'Luka B.',  initials: 'LB', role: 'Bar & pub owner',
      quote: 'Used to dread 1-star reviews. Now I\'m almost excited — the reply goes out before I\'ve even finished reading it.',
    },
    {
      name: 'Sara M.',  initials: 'SM', role: 'Retail shop owner',
      quote: 'Setup took 4 minutes. I connected my Google profile, picked email notifications, and it just works.',
    },
  ]

  const featured = {
    name: 'David R.', initials: 'DR', role: 'Healthcare practice',
    quote: 'Professional, empathetic, and always on-brand. I couldn\'t write better replies myself if I had the time.',
  }

  return (
    <section className="border-b border-[#e8e8e3] bg-[#f2f1ec]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9ca3af] mb-3 font-medium text-center">Reviews</p>
        <h2 className="font-serif text-4xl lg:text-5xl text-[#0a0f1e] text-center mb-14">
          What happens after the first week.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {reviews.map((r, i) => {
            const color = avatarColors[i % avatarColors.length]
            return (
              <div
                key={r.name}
                className={`bg-white border border-[#e8e8e3] rounded-xl p-5 ${r.featured ? 'md:col-span-2' : ''}`}
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
                  <div className={`w-8 h-8 rounded-full ${color.bg} ${color.text} text-xs font-bold flex items-center justify-center shrink-0`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0a0f1e]">{r.name}</div>
                    <div className="text-xs text-[#9ca3af]">{r.role}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Full-width dark featured testimonial */}
        <div className="bg-[#0a0f1e] rounded-xl p-8 relative overflow-hidden">
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
    <section className="border-b border-[#e8e8e3] relative overflow-hidden">
      {/* Oversized watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[22vw] text-[#f0efe9] leading-none">4.9</span>
      </div>
      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={28} fill="#16a34a" className="text-[#16a34a]" />
          ))}
        </div>
        <h2 className="font-serif text-4xl lg:text-6xl text-[#0a0f1e] mb-5">
          Elevate your business.<br />One less thing to worry about.
        </h2>
        <p className="text-base text-[#6b7280] max-w-md mx-auto mb-10">
          Business owners use Reviewr to protect their Google reputation — without spending an hour a week writing replies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          {[
            { value: '< 30s', label: 'Average draft time' },
            { value: '4.9★',  label: 'Owner satisfaction' },
            { value: '100%',  label: 'Reviews get a reply' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-4xl text-[#0a0f1e]">{s.value}</div>
              <div className="text-[11px] text-[#9ca3af] mt-1 uppercase tracking-wider">{s.label}</div>
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
        <h2 className="font-serif text-4xl lg:text-6xl text-white leading-tight mb-8">
          Start your<br />free trial.
        </h2>

        {/* €450 → €19 visual anchor */}
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
          {/* Solo */}
          <div className="bg-[#111827] border border-[#2a3147] rounded-xl p-7 text-left">
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
            <Link href="/signup" className="block text-center text-sm font-semibold border border-[#4b5563] text-white px-4 py-3 rounded-md hover:border-white transition-colors">
              Start free
            </Link>
          </div>

          {/* Growth — with Most popular badge */}
          <div className="relative pt-4">
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <span className="bg-white text-[#16a34a] text-xs font-bold px-3 py-1 rounded-full border border-[#16a34a]/30 shadow-sm whitespace-nowrap">
                Most popular
              </span>
            </div>
            <div className="bg-[#16a34a] rounded-xl p-7 text-left">
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
              <Link href="/signup" className="block text-center text-sm font-semibold bg-white text-[#16a34a] px-4 py-3 rounded-md hover:bg-[#f0fdf4] transition-colors">
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
