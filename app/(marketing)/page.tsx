import Link from 'next/link'
import {
  Globe2, Zap, Brain, MessageSquare, ThumbsUp, ShieldCheck,
  Star, ArrowRight, Check
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-primary overflow-x-hidden">
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <Star size={14} fill="black" className="text-black" />
          </div>
          <span className="font-serif text-lg">Reviewr</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-sm text-secondary hover:text-primary transition-colors">How it works</a>
          <a href="#features" className="text-sm text-secondary hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-secondary hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn btn-ghost text-sm px-4 py-2">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary text-sm px-4 py-2">
            Start free
          </Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
          animation: 'orb-float 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
          animation: 'orb-float 16s ease-in-out infinite reverse',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent font-medium">AI-powered review management</span>
          </div>

          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-primary mb-6">
            Every review deserves a{' '}
            <span className="text-gradient-accent">perfect reply.</span>
          </h1>

          <p className="text-secondary text-lg leading-relaxed mb-10 max-w-md">
            Connect your Google Business Profile. Get AI-crafted reply drafts for every review.
            Approve in one tap — nothing ever posts without your say.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/signup" className="btn btn-primary text-base px-6 py-3 shadow-lg shadow-accent/20">
              Start free
              <ArrowRight size={16} />
            </Link>
            <a href="#how" className="btn btn-ghost text-base px-6 py-3">
              See how it works
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10">
            {[
              { label: 'Avg reply time', value: '< 30s' },
              { label: 'Languages', value: '30+' },
              { label: 'Setup time', value: '5 min' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-serif text-2xl text-primary">{s.value}</div>
                <div className="text-xs text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dashboard mockup */}
        <div className="hidden lg:block">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div className="relative">
      <div className="card p-5 shadow-2xl border-border-strong">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium text-primary">New review</div>
            <div className="text-xs text-muted">2 minutes ago</div>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill="#22c55e" className="text-accent" />
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-[8px] p-3 mb-4 border border-border">
          <p className="text-xs text-secondary leading-relaxed">
            "Absolutely fantastic experience. The team was professional and the food was incredible. Will definitely be back!"
          </p>
          <div className="text-xs text-muted mt-1.5">— Maria S.</div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs text-accent font-medium">AI draft ready</span>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-[8px] p-3">
            <p className="text-xs text-secondary leading-relaxed">
              "Thank you so much, Maria! We're thrilled you enjoyed your visit. Our team works hard to make every experience special, and your kind words mean the world to us. We look forward to welcoming you back soon!"
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary text-xs px-3 py-2 flex-1">
            <ThumbsUp size={12} />
            Approve
          </button>
          <button className="btn btn-ghost text-xs px-3 py-2">Edit</button>
          <button className="btn btn-ghost text-xs px-3 py-2">Discard</button>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -top-4 -right-4 bg-surface border border-border rounded-[10px] px-3 py-2 shadow-xl flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs text-secondary">New review from João R.</span>
      </div>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect your Google Business Profile',
      description: 'Link your GBP in under a minute. We only request the permissions needed to read reviews and post replies on your behalf.',
    },
    {
      number: '02',
      title: 'AI writes a perfect draft in seconds',
      description: 'When a new review comes in, our AI analyzes the sentiment, detects the language, and crafts a brand-voice reply — automatically.',
    },
    {
      number: '03',
      title: 'You approve. It goes live.',
      description: 'Review the draft on your dashboard or via WhatsApp notification. Approve as-is, edit it, or discard it. You\'re always in control.',
    },
  ]

  return (
    <section id="how" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs text-accent font-medium uppercase tracking-widest">How it works</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mt-3">
            Three steps to reputation mastery
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-8 card card-hover"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-serif text-6xl text-border-strong mb-6 leading-none">
                {step.number}
              </div>
              <h3 className="font-serif text-xl text-primary mb-3">{step.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: Globe2,
      title: 'Language detection',
      description: 'Auto-detects Slovenian, English, Spanish, and 30+ more languages. Replies in the same language as the review.',
    },
    {
      icon: Star,
      title: 'Tone matching',
      description: 'Adapts the tone based on star rating. Empathetic for 1-2 stars, warm and enthusiastic for 4-5 stars.',
    },
    {
      icon: Brain,
      title: 'Brand voice learning',
      description: 'Learns from your past approved responses to match your unique communication style over time.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp notifications',
      description: 'Get notified on WhatsApp the moment a new draft is ready. Approve directly from your phone.',
    },
    {
      icon: ThumbsUp,
      title: 'One-tap approval',
      description: 'Review and approve drafts in seconds from the dashboard. Batch approve when you\'re ready.',
    },
    {
      icon: ShieldCheck,
      title: 'Never posts without your OK',
      description: 'Every single reply requires your explicit approval. Full control, zero surprises — always.',
    },
  ]

  return (
    <section id="features" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs text-accent font-medium uppercase tracking-widest">Features</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mt-3">
            Everything you need
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-6 card card-hover group"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className="w-10 h-10 rounded-[8px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-150">
                <f.icon size={18} className="text-accent" />
              </div>
              <h3 className="font-medium text-primary mb-2">{f.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const starterFeatures = [
    '1 Google Business Profile location',
    'Unlimited review replies',
    'AI draft generation',
    'Language auto-detection',
    'WhatsApp notifications',
    'Email notifications',
  ]

  const proFeatures = [
    'Up to 5 GBP locations',
    'Unlimited review replies',
    'Priority AI processing',
    'Brand voice learning',
    'Priority support',
    'Advanced analytics',
  ]

  return (
    <section id="pricing" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs text-accent font-medium uppercase tracking-widest">Pricing</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary mt-3">
            Simple, honest pricing
          </h2>
          <p className="text-secondary mt-4 max-w-md mx-auto">
            No hidden fees, no long-term contracts. Cancel any time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Starter */}
          <div className="card p-8">
            <div className="mb-6">
              <div className="text-sm text-secondary mb-1">Starter</div>
              <div className="flex items-end gap-1">
                <span className="font-serif text-5xl text-primary">€19</span>
                <span className="text-secondary mb-1">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {starterFeatures.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-secondary">
                  <Check size={14} className="text-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn btn-ghost w-full py-3">
              Get started
            </Link>
          </div>

          {/* Pro */}
          <div className="card p-8 border-accent/40 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs text-accent font-medium">
                Most popular
              </span>
            </div>
            <div className="mb-6">
              <div className="text-sm text-secondary mb-1">Pro</div>
              <div className="flex items-end gap-1">
                <span className="font-serif text-5xl text-primary">€49</span>
                <span className="text-secondary mb-1">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {proFeatures.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-secondary">
                  <Check size={14} className="text-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn btn-primary w-full py-3">
              Get started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center">
            <Star size={12} fill="black" className="text-black" />
          </div>
          <span className="font-serif text-base">Reviewr</span>
          <span className="text-muted text-sm ml-2">— Your reputation, automated.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted hover:text-secondary transition-colors">Privacy</a>
          <a href="#" className="text-sm text-muted hover:text-secondary transition-colors">Terms</a>
          <span className="text-muted text-sm">© 2026 Reviewr</span>
        </div>
      </div>
    </footer>
  )
}
