'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { LogoMark } from '@/components/logo'

const links = [
  { label: 'How it works', href: '#why' },
  { label: 'Features',     href: '#includes' },
  { label: 'Pricing',      href: '#cta' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-[#e8e8e3] bg-[#fafaf7]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:-translate-y-px hover:brightness-105">
          <LogoMark size={28} />
          <span className="font-serif text-lg text-[#0a0f1e]">Reviewr</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-[#6b7280] hover:text-[#0a0f1e] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-[#6b7280] hover:text-[#0a0f1e] transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm bg-[#16a34a] text-white px-4 py-2 rounded-md hover:bg-[#15803d] transition-colors font-medium">
            Start free
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/signup" className="text-sm bg-[#16a34a] text-white px-4 py-2 rounded-md hover:bg-[#15803d] transition-colors font-medium">
            Start free
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md text-[#6b7280] hover:text-[#0a0f1e] hover:bg-[#f0efe9] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[#e8e8e3] bg-[#fafaf7]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-[#374151] hover:text-[#0a0f1e] py-3 px-3 rounded-lg hover:bg-[#f0efe9] transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t border-[#e8e8e3] mt-2 pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-base text-[#6b7280] hover:text-[#0a0f1e] py-3 px-3 rounded-lg hover:bg-[#f0efe9] transition-colors font-medium"
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
