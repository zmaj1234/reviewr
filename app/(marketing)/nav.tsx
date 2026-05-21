'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { LogoMark } from '@/components/logo'

const links = [
  { label: 'Why Reviewr', href: '#why' },
  { label: 'Features',    href: '#includes' },
  { label: 'Pricing',     href: '#cta' },
]

export function Nav() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.07)]'
          : 'bg-[#f9f9f7]/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <LogoMark size={36} />
          <span className="font-serif text-[1.4rem] font-semibold text-[#0a0a0a] tracking-tight">
            Reviewr
          </span>
        </Link>

        {/* Desktop nav — centred */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#6b7280] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#6b7280] hover:text-[#0a0a0a] transition-colors duration-200 px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#16a34a] text-white px-5 py-2.5 rounded-full hover:bg-[#15803d] transition-all duration-200 shadow-[0_2px_12px_rgba(22,163,74,0.3)] hover:shadow-[0_4px_20px_rgba(22,163,74,0.4)] hover:-translate-y-px"
          >
            Start replying free
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#16a34a] text-white px-4 py-2 rounded-full hover:bg-[#15803d] transition-colors"
          >
            Start free
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl text-[#6b7280] hover:text-[#0a0a0a] hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#374151] hover:text-[#0a0a0a] py-3 px-3 rounded-xl hover:bg-black/[0.04] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t border-black/[0.06] mt-2 pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-[#6b7280] hover:text-[#0a0a0a] py-3 px-3 rounded-xl hover:bg-black/[0.04] transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
