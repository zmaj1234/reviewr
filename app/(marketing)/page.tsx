"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   REVIEWR — landing v3 (Apple design) · reviewrai.app
   Scoped under .v3-landing so global serif headings / bg don't
   apply here (see app/globals.css). CTAs → /signup, log in → /login.
──────────────────────────────────────────────────────────── */

const DRAFT =
  "Marko, thank you for being honest. A 40-minute wait is not the standard we hold ourselves to. We're fixing this with the kitchen team — come back and let us make it right.";

function usePhoneLoop() {
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScene(3); setTyped(DRAFT); return;
    }
    let alive = true;
    const run = async () => {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      while (alive) {
        setScene(0); setTyped(""); await wait(2200);
        setScene(1);
        for (let i = 0; i <= DRAFT.length; i += 3) {
          if (!alive) return;
          setTyped(DRAFT.slice(0, i));
          await wait(14);
        }
        setTyped(DRAFT); await wait(1400);
        setScene(2); await wait(1600);
        setScene(3); await wait(2800);
      }
    };
    run();
    return () => { alive = false; };
  }, []);
  return { scene, typed };
}

function Phone() {
  const { scene, typed } = usePhoneLoop();
  return (
    <div className="relative mx-auto w-[300px] h-[610px] rounded-[48px] bg-ink p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)]">
      <div className="absolute left-1/2 -translate-x-1/2 top-[18px] w-[92px] h-[26px] bg-black rounded-full z-20" />
      <div className="w-full h-full rounded-[38px] bg-fog overflow-hidden relative">
        <div className="h-12 flex items-end justify-between px-6 pb-1 text-[11px] font-semibold text-ink/80">
          <span>15:17</span><span className="tracking-tight">●●● ⏻</span>
        </div>

        <div className={`scene ${scene >= 0 ? "on" : ""} px-3 mt-1`}>
          <div className="rounded-2xl bg-white shadow-sm p-3.5">
            <div className="flex items-center gap-2 text-[11px] text-mist mb-1.5">
              <span className="w-4 h-4 rounded-[5px] bg-live text-white grid place-items-center text-[8px]">★</span>
              REVIEWR · now
            </div>
            <p className="text-[13px] font-semibold">New 2★ review — La Bella Vista</p>
            <p className="text-[12.5px] text-ink/70 mt-0.5 leading-snug">
              Marko T.: “Waited 40 minutes for our food, staff seemed uninterested.”
            </p>
          </div>
        </div>

        <div className={`scene ${scene >= 1 ? "on" : ""} px-3 mt-2.5`}>
          <div className="rounded-2xl bg-white shadow-sm p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] text-mist">Draft reply</p>
              {scene >= 1 && scene < 3 && (
                <span className="text-[10px] text-live font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-live pulse-dot" /> writing
                </span>
              )}
            </div>
            <p className={`text-[12.5px] leading-snug text-ink/85 min-h-[88px] ${scene === 1 && typed.length < DRAFT.length ? "typing" : ""}`}>
              {typed}
            </p>
          </div>
        </div>

        <div className={`scene ${scene >= 2 ? "on" : ""} px-3 mt-2.5`}>
          <div className="flex gap-2">
            <div className={`flex-1 rounded-xl bg-live text-white text-center text-[13px] font-semibold py-2.5 ${scene === 2 ? "tap" : ""}`}>
              ✓ Approve
            </div>
            <div className="flex-1 rounded-xl bg-white text-ink/70 text-center text-[13px] py-2.5 shadow-sm">Edit</div>
            <div className="flex-1 rounded-xl bg-white text-ink/40 text-center text-[13px] py-2.5 shadow-sm">Discard</div>
          </div>
        </div>

        <div className={`scene ${scene >= 3 ? "on" : ""} px-3 mt-3`}>
          <div className="rounded-2xl bg-livedim border border-live/20 p-3 text-center">
            <p className="text-[13px] font-semibold text-live">Live on Google</p>
            <p className="text-[11px] text-live/70 mt-0.5">Reviewr learned from this reply</p>
          </div>
        </div>

        <p className="absolute bottom-4 inset-x-0 text-center text-[10px] text-mist">
          Nothing posts without you.
        </p>
      </div>
    </div>
  );
}

function Rise({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("in"),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rise ${className}`}>{children}</div>;
}

function V3Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links: [string, string][] = [
    ["#how", "How it works"],
    ["#languages", "Languages"],
    ["#pricing", "Pricing"],
    ["#faq", "FAQ"],
  ];
  return (
    <header className="sticky top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
      <nav className="mx-auto max-w-5xl h-12 px-5 flex items-center justify-between text-sm">
        <Link href="/" onClick={close} className="flex items-center gap-2 font-semibold">
          <span className="w-6 h-6 rounded-[7px] bg-live text-white grid place-items-center text-[11px]">★</span>
          Reviewr
        </Link>
        <div className="hidden sm:flex items-center gap-7 text-ink/80">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="hover:text-ink transition-colors">{l}</a>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/login" className="text-ink/80 hover:text-ink transition-colors">Log in</Link>
          <Link href="/signup" className="bg-ink text-white rounded-full px-4 py-1.5 hover:bg-black transition">
            Start free
          </Link>
        </div>
        <button
          className="sm:hidden w-8 h-8 grid place-items-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-[5px]">
            <span className={`block w-[18px] h-[1.5px] bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block w-[18px] h-[1.5px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[18px] h-[1.5px] bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>
      {open && (
        <div className="sm:hidden bg-white/95 backdrop-blur-xl border-b border-black/5 px-5 py-4 space-y-1 text-[15px]">
          {links.map(([h, l]) => (
            <a key={h} href={h} onClick={close} className="block py-2 text-ink/85">{l}</a>
          ))}
          <Link href="/login" onClick={close} className="block py-2 text-ink/85">Log in</Link>
          <Link href="/signup" onClick={close}
            className="mt-2 block text-center bg-ink text-white rounded-full py-2.5 font-medium">
            Start free
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 bg-fog">
      <div className="mx-auto max-w-5xl px-5 py-10 text-xs text-mist flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Reviewr · reviewrai.app · Nothing posts without you.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
          <a href="mailto:hello@reviewrai.app" className="hover:text-ink transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

const PHRASES = [
  "Hvala za obisk!", "Thank you for visiting!", "Vielen Dank!",
  "Grazie mille!", "¡Muchas gracias!", "Merci beaucoup!",
  "Hvala na posjeti!", "Köszönjük!", "Obrigado!", "Dziękujemy!",
  "Tack så mycket!", "Ευχαριστούμε!",
];

export default function LandingPage() {
  return (
    <div className="v3-landing">
      <V3Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-5 pt-24 pb-24 text-center overflow-hidden">
        <Rise>
          <p className="text-[13px] font-semibold tracking-wide uppercase text-live mb-4">
            For Google Business Profile owners
          </p>
          <h1 className="text-[54px] sm:text-[88px] leading-[0.98] font-semibold tracking-tightest">
            Every review.
            <br />
            <span className="bg-gradient-to-r from-live via-emerald-600 to-live bg-clip-text text-transparent">
              Answered.
            </span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-[19px] sm:text-[21px] leading-relaxed text-mist">
            Reviewr watches your Google reviews, writes the reply in the
            reviewer's language, and waits for your tap.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <Link href="/signup" className="bg-ink text-white rounded-full px-8 py-3.5 text-[16px] font-medium hover:bg-black hover:scale-[1.02] transition">
              Start free
            </Link>
            <a href="#how" className="text-live text-[16px] font-medium hover:underline underline-offset-4">
              See how it works
            </a>
          </div>
          <p className="mt-4 text-[13px] text-mist">Free 14-day trial · No card · 2-minute setup</p>
        </Rise>
        <div className="mt-16">
          <Phone />
        </div>
      </section>

      {/* ── HOW ─────────────────────────────────────────── */}
      <section id="how" className="bg-fog px-5 py-28 scroll-mt-12">
        <div className="mx-auto max-w-5xl">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest text-center">
              It happens while you work.
            </h2>
            <p className="mt-4 text-[17px] text-mist text-center max-w-xl mx-auto">
              You run the business. Reviewr runs the replies.
            </p>
          </Rise>
          <div className="mt-14 grid sm:grid-cols-3 gap-4">
            {[
              ["Detects", "A review lands on your Google profile. Reviewr sees it within minutes — day or night, weekends included."],
              ["Drafts", "A reply in the reviewer's language, in your voice, on your phone in under 30 seconds."],
              ["Waits", "You tap Approve, Edit, or Discard. Nothing reaches Google until you say so."],
            ].map(([t, d], i) => (
              <Rise key={t}>
                <div className="bg-white rounded-3xl p-8 h-full hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] transition-shadow">
                  <span className="text-[13px] font-semibold text-live">{["01","02","03"][i]}</span>
                  <p className="mt-2 text-[24px] font-semibold tracking-tight">{t}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-mist">{d}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ───────────────────────────────────── */}
      <section id="languages" className="px-5 py-28 scroll-mt-12 overflow-hidden">
        <div className="mx-auto max-w-3xl text-center">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest">
              They write in their language.
              <br />You reply in theirs.
            </h2>
            <p className="mt-5 text-[17px] text-mist max-w-xl mx-auto">
              A German guest gets German. A local gets Slovenian. A tourist gets
              English. Detected from the review itself — 30+ languages, automatically.
            </p>
          </Rise>
        </div>
        <Rise className="mt-12">
          <div className="marquee-mask">
            <div className="marquee flex gap-3 w-max">
              {[...PHRASES, ...PHRASES].map((s, i) => (
                <span key={i} className="bg-fog rounded-full px-5 py-2.5 text-[14px] whitespace-nowrap">{s}</span>
              ))}
            </div>
          </div>
        </Rise>
      </section>

      {/* ── VOICE ───────────────────────────────────────── */}
      <section className="bg-fog px-5 py-28">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest">
              Sounds like you.
              <br />Because it learned from you.
            </h2>
            <p className="mt-5 text-[17px] text-mist leading-relaxed max-w-md">
              Every reply you approve teaches Reviewr your tone. The tenth draft
              sounds more like you than the first. No settings to configure —
              approval is the training.
            </p>
          </Rise>
          <Rise>
            <div className="space-y-3 max-w-sm mx-auto w-full">
              {[
                ["Reply #1", "Thank you for your review. We appreciate your feedback and hope to see you again.", "40%"],
                ["Reply #10", "Ana, this made our morning! The team still talks about your table's toast. See you at the lake soon. 🌊", "96%"],
              ].map(([label, text, match]) => (
                <div key={label} className="bg-white rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-semibold text-mist">{label}</span>
                    <span className="text-[12px] font-semibold text-live">{match} your voice</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink/80">{text}</p>
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* ── WHATSAPP (dark) ─────────────────────────────── */}
      <section className="bg-ink text-white px-5 py-28">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-14 items-center">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest">
              Arrives where you already are.
            </h2>
            <p className="mt-5 text-[17px] text-white/60 leading-relaxed max-w-md">
              No dashboard to check. No app to remember. The draft lands in your
              WhatsApp or email with one link. Open, tap, done — from the bar,
              the chair, the front desk.
            </p>
            <Link href="/signup" className="mt-8 inline-block bg-white text-ink rounded-full px-7 py-3 text-[15px] font-medium hover:bg-white/90 transition">
              Get drafts on WhatsApp
            </Link>
          </Rise>
          <Rise>
            <div className="rounded-3xl bg-[#0b141a] p-5 max-w-sm mx-auto w-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <span className="w-8 h-8 rounded-full bg-live grid place-items-center text-[13px]">★</span>
                <div>
                  <p className="text-[14px] font-medium">Reviewr</p>
                  <p className="text-[11px] text-white/40">online</p>
                </div>
              </div>
              <div className="mt-3 bg-[#1f2c34] rounded-2xl rounded-tl-md p-3.5 text-[13px] leading-snug">
                <p>🎉 5★ review · Vila Ana</p>
                <p className="mt-1 text-white/70">“Amazing stay, will definitely return!” — Ana K.</p>
                <p className="mt-2.5 text-white/90">💬 Draft: “Ana, thank you — this means a lot to our whole team. We can't wait to welcome you back!”</p>
                <p className="mt-2.5 text-[#53bdeb]">✅ reviewrai.app/a/x7f2…</p>
                <p className="mt-1.5 text-right text-[10px] text-white/30">15:17 ✓✓</p>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ── CONTROL ─────────────────────────────────────── */}
      <section className="px-5 py-28 text-center">
        <Rise>
          <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest">
            You're still the boss.
          </h2>
          <p className="mt-5 text-[17px] text-mist max-w-xl mx-auto">
            Three buttons. Total control. Reviewr drafts; only you publish.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <span className="rounded-full bg-live text-white px-6 py-2.5 text-[15px] font-medium">✓ Approve</span>
            <span className="rounded-full bg-fog px-6 py-2.5 text-[15px]">✎ Edit</span>
            <span className="rounded-full bg-fog text-mist px-6 py-2.5 text-[15px]">✕ Discard</span>
          </div>
        </Rise>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section id="pricing" className="bg-fog px-5 py-28 scroll-mt-12">
        <div className="mx-auto max-w-4xl">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest text-center">
              Less than one lost customer.
            </h2>
            <p className="mt-4 text-[17px] text-mist text-center max-w-xl mx-auto">
              An unanswered bad review quietly costs you guests every week.
              Reviewr costs less than one of them.
            </p>
          </Rise>
          <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Rise>
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col">
                <p className="text-[13px] font-semibold text-mist uppercase tracking-wide">Solo</p>
                <p className="mt-3 text-[46px] font-semibold tracking-tightest">€19<span className="text-[17px] text-mist font-normal">/mo</span></p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-ink/80 flex-1">
                  <li>1 location</li>
                  <li>Unlimited replies, 30+ languages</li>
                  <li>WhatsApp + email alerts</li>
                  <li>Cancel anytime</li>
                </ul>
                <Link href="/signup" className="mt-7 text-center rounded-full border border-ink/15 py-3 text-[15px] font-medium hover:bg-fog transition">
                  Start free
                </Link>
              </div>
            </Rise>
            <Rise>
              <div className="bg-ink text-white rounded-3xl p-8 h-full flex flex-col relative overflow-hidden">
                <span className="absolute top-5 right-5 text-[11px] bg-live rounded-full px-2.5 py-1 font-medium">Most popular</span>
                <p className="text-[13px] font-semibold text-white/50 uppercase tracking-wide">Growth</p>
                <p className="mt-3 text-[46px] font-semibold tracking-tightest">€49<span className="text-[17px] text-white/50 font-normal">/mo</span></p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-white/80 flex-1">
                  <li>Up to 5 locations</li>
                  <li>Everything in Solo</li>
                  <li>Voice learning across locations</li>
                  <li>Priority support</li>
                </ul>
                <Link href="/signup" className="mt-7 text-center rounded-full bg-white text-ink py-3 text-[15px] font-medium hover:bg-white/90 transition">
                  Start free
                </Link>
              </div>
            </Rise>
          </div>
          <Rise>
            <p className="mt-8 text-center text-[13px] text-mist">
              14-day free trial · No card needed · Founding members lock this price for life
            </p>
          </Rise>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="px-5 py-28 scroll-mt-12">
        <div className="mx-auto max-w-2xl">
          <Rise>
            <h2 className="text-[38px] sm:text-[52px] font-semibold tracking-tightest text-center">
              Questions.
            </h2>
          </Rise>
          <div className="mt-10 divide-y divide-black/5">
            {[
              ["Does anything post without my approval?", "Never. Every single reply waits for your explicit tap. Approve, edit it first, or discard it — those are the only three outcomes."],
              ["Do I need to give you my Google password?", "No. Setup is pasting your Google Maps link — that's it. You post approved replies from your own Google account, so your login never touches Reviewr."],
              ["What languages does it support?", "30+. The language is detected from the review itself, so a German review gets a German reply and a Slovenian one gets Slovenian — automatically."],
              ["How fast is a draft ready?", "Under a minute from the review appearing on Google to the draft landing on your WhatsApp or email."],
              ["What does it cost after the trial?", "€19/month for one location, €49/month for up to five. Cancel anytime, no contracts. Founding members keep their price for life."],
              ["What if the draft is wrong?", "Tap Edit and change anything before it goes out, or Discard it entirely. Reviewr learns from what you approve, so drafts keep getting closer to how you'd write it."],
            ].map(([q, a]) => (
              <Rise key={q}>
                <details className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-[17px] font-medium">
                    {q}
                    <span className="text-mist text-[22px] leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{a}</p>
                </details>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL ───────────────────────────────────────── */}
      <section className="bg-fog px-5 py-32 text-center">
        <Rise>
          <h2 className="text-[42px] sm:text-[60px] font-semibold tracking-tightest">
            One less thing
            <br />to worry about.
          </h2>
          <Link href="/signup" className="mt-9 inline-block bg-ink text-white rounded-full px-9 py-4 text-[17px] font-medium hover:bg-black hover:scale-[1.02] transition">
            Start free — 2 minutes
          </Link>
          <p className="mt-4 text-[13px] text-mist">No card · No Google login · Cancel anytime</p>
        </Rise>
      </section>

      <Footer />
    </div>
  );
}
