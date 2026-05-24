import Link from 'next/link'
import {
  Globe2, Heart, ThumbsUp, Brain,
  Check, ArrowRight, ArrowDown, Star,
} from 'lucide-react'
import { Nav } from './nav'
import { AnimateIn } from '@/components/animate-in'
import { DemoPlayer } from '@/components/demo-player'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans">
      <Nav />
      <Hero />
      <CombinedFeatures />
      <UserReviews />
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

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-0 relative z-10">
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
            Free to start. 7-day trial. Cancel anytime.
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

        {/* ── Interactive demo — the main event ──────────── */}
        <div id="how-it-works" className="mt-4 pb-10">

          {/* Attention strip */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 bg-[#0a0f1e] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16a34a]" />
              </span>
              Interactive demo — click each step to advance
            </div>
            <p className="text-xs text-[#9ca3af] tracking-wide">
              30 seconds. See exactly what lands in your inbox and what you tap to approve.
            </p>
            <ArrowDown size={18} className="text-[#16a34a] animate-bounce mt-1" />
          </div>

          <DemoPlayer />
        </div>
      </div>
    </section>
  )
}

// ─── COMBINED FEATURES ──────────────────────────────────────────────────────

function CombinedFeatures() {
  return (
    <section id="features" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 lg:pt-24 lg:pb-36">
        <AnimateIn>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mb-4 font-semibold text-center">
            Why Reviewr
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] text-center mb-4">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
          <p className="text-base text-[#6b7280] text-center max-w-md mx-auto mb-16">
            Built for busy owners who want perfect replies without spending time on them.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">

          {/* ── Time card — dark navy, large ─────────────────── */}
          <AnimateIn delay={0} className="lg:col-span-8">
            <div className="relative bg-[#0a0f1e] rounded-3xl p-10 overflow-hidden flex flex-col justify-between min-h-[300px] shadow-[0_8px_48px_rgba(0,0,0,0.28)] hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -right-6 -bottom-8 font-serif text-[16rem] leading-none select-none pointer-events-none text-white/[0.03]">30</div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563] mb-5 font-semibold">Draft time</p>
                <div className="flex items-end gap-3 mb-1">
                  <span className="font-serif text-[7rem] lg:text-[8.5rem] leading-none text-white tracking-tight">&lt;30</span>
                  <span className="font-serif text-[3.5rem] text-[#16a34a] leading-none mb-3">s</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-white mb-2">Free up your time — completely.</p>
                <p className="text-sm text-[#6b7280] leading-relaxed max-w-sm">
                  Stop spending 20 minutes on the perfect reply. Reviewr writes it before you even notice the review arrived.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* ── Boss card — soft green ───────────────────────── */}
          <AnimateIn delay={60} className="lg:col-span-4">
            <div className="relative bg-[#f0fdf4] border border-[#bbf7d0] rounded-3xl p-8 overflow-hidden flex flex-col justify-between min-h-[300px] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(22,163,74,0.1)] hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#16a34a]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-[#16a34a] flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(22,163,74,0.45)]">
                <ThumbsUp size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#0a0a0a] leading-tight mb-3">
                  You&apos;re still<br />the boss.
                </h3>
                <p className="text-sm text-[#3d6b4f] leading-relaxed mb-5">
                  Nothing ever posts without your approval. Approve, edit, or discard — every single reply, every time.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#16a34a] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(22,163,74,0.35)]">
                  <Check size={12} /> Always your final say
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* ── Psychology card — full width dark ───────────── */}
          <AnimateIn delay={100} className="lg:col-span-12">
            <div className="relative bg-[#0a0f1e] rounded-3xl px-10 py-12 overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.28)] hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -right-24 top-1/2 -translate-y-1/2 font-serif text-[22rem] leading-none select-none pointer-events-none text-white/[0.025]">89</div>
              <div className="absolute top-0 left-0 w-80 h-80 bg-[#16a34a]/6 rounded-full blur-[100px] pointer-events-none" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563] mb-6 font-semibold">The psychology of reviews</p>
              <div className="flex flex-col lg:flex-row items-start gap-8 max-w-4xl">
                <span className="font-serif text-[6rem] leading-none text-[#16a34a] shrink-0">89%</span>
                <div className="pt-1">
                  <p className="font-serif text-2xl lg:text-3xl text-white leading-snug mb-4">
                    of customers read the owner&apos;s reply before deciding whether to visit.
                  </p>
                  <p className="text-sm text-[#6b7280] leading-relaxed max-w-xl">
                    Your reply isn&apos;t just for the reviewer. It&apos;s for every future customer scrolling through next.
                    Reviewr makes sure every reply builds trust — even when the original review is a 1-star.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* ── Bad reviews card — white with 1-star example ─ */}
          <AnimateIn delay={80} className="lg:col-span-8">
            <div className="bg-white border border-black/[0.07] rounded-3xl p-8 overflow-hidden flex flex-col min-h-[340px] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#fff1f2] flex items-center justify-center shrink-0">
                  <Heart size={20} className="text-rose-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0a0a0a]">1-star reviews, handled with care.</h3>
                  <p className="text-xs text-[#9ca3af]">Empathetic. Professional. Never defensive.</p>
                </div>
              </div>
              <div className="flex-1 bg-[#fafafa] rounded-2xl p-5 border border-black/[0.05]">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Star size={10} fill="#f87171" className="text-rose-400" />
                  <span className="text-[10px] text-[#9ca3af] font-medium">1 star — Max B., 3 days ago</span>
                </div>
                <p className="text-sm text-[#374151] italic mb-4 leading-relaxed">
                  &ldquo;Waited 40 minutes for a table despite having a reservation. Very disappointing.&rdquo;
                </p>
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3">
                  <p className="text-[10px] text-[#16a34a] uppercase tracking-widest font-semibold mb-2">✨ Reviewr draft</p>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Max, we sincerely apologise for the wait — that&apos;s not the experience we promise and it falls short of our standard.
                    We&apos;d love to make it right. Please reach out directly so we can take care of you personally.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#16a34a] font-medium mt-4">✓ Turns critics into return customers</p>
            </div>
          </AnimateIn>

          {/* ── Simplicity card — lavender ───────────────────── */}
          <AnimateIn delay={120} className="lg:col-span-4">
            <div className="relative bg-[#f5f3ff] border border-[#ede9fe] rounded-3xl p-8 overflow-hidden flex flex-col justify-between min-h-[340px] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(99,102,241,0.08)] hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-[#6366f1]/8 rounded-full blur-3xl pointer-events-none" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#a78bfa] mb-5 font-semibold">Simplicity</p>
                <h3 className="font-serif text-[2.6rem] leading-tight font-bold text-[#0a0a0a] mb-3">
                  One tap.<br />No apps.<br />No logins.
                </h3>
                <p className="text-sm text-[#4a4460] leading-relaxed">
                  An email arrives. You tap approve. Done. No dashboard visit. No password. No app to download.
                </p>
              </div>
              <div className="mt-6 bg-white/80 rounded-2xl px-5 py-4 border border-[#ede9fe] backdrop-blur-sm">
                <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-1.5 font-medium">Avg. approval time</p>
                <p className="font-serif text-4xl text-violet-600">12 sec</p>
              </div>
            </div>
          </AnimateIn>

          {/* ── Tone card ────────────────────────────────────── */}
          <AnimateIn delay={80} className="lg:col-span-4">
            <div className="relative bg-[#f9fafb] border border-black/[0.06] rounded-3xl p-8 overflow-hidden flex flex-col justify-between min-h-[260px] shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-5">
                  <Brain size={20} className="text-[#16a34a]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-[#0a0a0a] mb-2">Sounds exactly like you.</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-5">
                  Learns from every approval. In as few as 3 taps, drafts start matching your voice — not a template.
                </p>
              </div>
              <div>
                <div className="flex items-end gap-1 mb-2">
                  {[20, 50, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${h * 0.4}px`,
                          background: i === 0 ? '#d1fae5' : i === 1 ? '#6ee7b7' : '#16a34a',
                        }}
                      />
                      <span className="text-[9px] text-[#9ca3af] font-medium">#{i + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#16a34a] font-medium">✓ Better every week</p>
              </div>
            </div>
          </AnimateIn>

          {/* ── Language card — dark blue ─────────────────────── */}
          <AnimateIn delay={140} className="lg:col-span-8">
            <div className="relative bg-[#0f172a] rounded-3xl p-8 overflow-hidden flex flex-col justify-between min-h-[260px] shadow-[0_8px_48px_rgba(0,0,0,0.28)] hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#3b82f6]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#1e3a5f] flex items-center justify-center shrink-0">
                  <Globe2 size={20} className="text-[#60a5fa]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Replies in the customer&apos;s language.</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    Detects 30+ languages automatically. No setup, no switching — Slovenian, Spanish, Japanese, all handled.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['🇬🇧 English','🇩🇪 German','🇫🇷 French','🇪🇸 Spanish','🇮🇹 Italian','🇸🇮 Slovenian','🇳🇱 Dutch','🇵🇱 Polish','+ 22 more'].map(lang => (
                  <span key={lang} className="bg-[#1e293b] text-[#94a3b8] text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/[0.06]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* ── Analytics card — Growth feature ───────────────── */}
          <AnimateIn delay={100} className="lg:col-span-12">
            <div className="bg-white border border-black/[0.07] rounded-3xl p-8 lg:p-10 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300">

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#16a34a] bg-[#f0fdf4] border border-[#bbf7d0] px-2.5 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                    Growth plan
                  </span>
                  <h3 className="font-serif text-[2rem] lg:text-[2.5rem] text-[#0a0a0a] leading-tight mb-3">
                    Know your numbers.
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed max-w-md">
                    Rating trends, weekly review volume, sentiment breakdown, and response time — in one clean iOS-style view. Built to tell you what&apos;s working, at a glance.
                  </p>
                </div>

                {/* Key metrics */}
                <div className="flex items-center gap-6 lg:gap-8 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-semibold mb-1">Avg rating</p>
                    <p className="font-serif text-[2.5rem] leading-none text-[#16a34a]">
                      4.7<span className="text-xl ml-0.5 opacity-50">★</span>
                    </p>
                  </div>
                  <div className="w-px h-10 bg-black/[0.07]" />
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-semibold mb-1">Avg response</p>
                    <p className="font-serif text-[2.5rem] leading-none text-[#0a0a0a]">
                      2.3<span className="text-xl ml-0.5 opacity-40">h</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini chart previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Rating trend preview */}
                <div className="bg-[#f9f9f9] rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Rating trend</p>
                  <svg viewBox="0 0 280 60" className="w-full h-12" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="mktRatingFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M8,21 L45.7,19 L83.4,20 L121.1,17 L158.9,14.5 L196.6,15.7 L234.3,13.5 L272,11 L272,52 L8,52 Z"
                      fill="url(#mktRatingFill)"
                    />
                    {/* Line */}
                    <polyline
                      points="8,21 45.7,19 83.4,20 121.1,17 158.9,14.5 196.6,15.7 234.3,13.5 272,11"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dots */}
                    {[[8,21],[45.7,19],[83.4,20],[121.1,17],[158.9,14.5],[196.6,15.7],[234.3,13.5],[272,11]].map(([x,y], i) => (
                      <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#16a34a" strokeWidth="1.5" />
                    ))}
                  </svg>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-[#c7c7cc]">8 weeks ago</span>
                    <span className="text-[9px] text-[#c7c7cc]">Now</span>
                  </div>
                </div>

                {/* Weekly volume preview */}
                <div className="bg-[#f9f9f9] rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Weekly volume</p>
                  <svg viewBox="0 0 280 48" className="w-full h-12">
                    {/* Bars: counts [2,5,3,7,8,6,10,12], max=12, slot=35, barW=20 */}
                    {[
                      [7.5,  39.3, 8.7],
                      [42.5, 28.3, 19.7],
                      [77.5, 34,   14],
                      [112.5,21.3, 26.7],
                      [147.5,17.3, 30.7],
                      [182.5,24,   24],
                      [217.5,10.7, 37.3],
                      [252.5,4,    44],
                    ].map(([x, y, h], i) => (
                      <rect key={i} x={x} y={y} width="20" height={h} rx="3" ry="3" fill="#16a34a" opacity="0.75" />
                    ))}
                  </svg>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-[#c7c7cc]">8 weeks ago</span>
                    <span className="text-[9px] text-[#c7c7cc]">Now</span>
                  </div>
                </div>

              </div>
            </div>
          </AnimateIn>

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

// ─── FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCTA() {
  const solo   = ['1 location', 'Unlimited replies', 'Email alerts for every draft', 'Basic analytics', 'Cancel anytime']
  const growth = [
    'Everything in Solo',
    'Up to 5 locations — one dashboard',
    '3 team seats with manager permissions',
    'Advanced analytics — trends, charts & sentiment',
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
          <p className="text-base text-[#6b7280] max-w-md mx-auto mb-8 leading-relaxed">
            Unanswered reviews cost the average business 9 customers a month.
            At €50 per customer, that adds up fast.
          </p>

          {/* ── ROI comparison ───────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-md mx-auto mb-6">
            <div className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-7 py-5 text-center">
              <p className="text-[10px] text-[#6b7280] uppercase tracking-widest font-semibold mb-3">Without Reviewr</p>
              <p className="font-serif text-5xl text-[#f87171] mb-1">~€450</p>
              <p className="text-[11px] text-[#4b5563] leading-snug">lost every month<br />from ignored reviews</p>
            </div>
            <div className="flex items-center justify-center text-[#374151] font-semibold text-sm shrink-0 py-2">vs</div>
            <div className="flex-1 bg-[#16a34a]/10 border border-[#16a34a]/25 rounded-2xl px-7 py-5 text-center">
              <p className="text-[10px] text-[#16a34a] uppercase tracking-widest font-semibold mb-3">Reviewr</p>
              <p className="font-serif text-5xl text-[#16a34a] mb-1">€19</p>
              <p className="text-[11px] text-[#4b5563] leading-snug">per month<br />all features included</p>
            </div>
          </div>

          <p className="text-base text-[#16a34a] font-semibold mb-10">
            Fix a €450 problem for €19 a month.
          </p>

          {/* ── Stats strip ──────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            {[
              { value: '< 30s', label: 'Draft time',          color: 'text-violet-400' },
              { value: '4.9★',  label: 'Owner satisfaction',  color: 'text-[#16a34a]'  },
              { value: '100%',  label: 'Reviews replied',     color: 'text-orange-400' },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center px-8 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                <div className={`font-serif text-4xl ${s.color} mb-1`}>{s.value}</div>
                <div className="text-[10px] text-[#4b5563] uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 items-start">
          {/* Solo */}
          <AnimateIn delay={80}>
            <div className="bg-[#111827] border border-[#1f2937] rounded-3xl p-8 text-left shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-widest text-[#6b7280] font-semibold">Solo</div>
                <span className="text-[10px] font-semibold text-[#16a34a] bg-[#16a34a]/15 px-2.5 py-1 rounded-full">Launch price</span>
              </div>
              <div className="flex items-end gap-1.5 mb-7">
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
              <p className="text-xs text-[#4b5563] mb-4">7-day free trial. No card needed.</p>
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
                <p className="text-xs text-[#bbf7d0]/70 mb-4">7-day free trial. Card required — billed after 7 days.</p>
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
        <div className="flex items-center gap-2.5 bg-[#f9fafb] border border-black/[0.07] rounded-full px-4 py-2 shadow-sm">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={11} fill="#16a34a" className="text-[#16a34a]" />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#374151]">4.9</span>
          <span className="text-xs text-[#9ca3af]">Owner satisfaction</span>
        </div>
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
