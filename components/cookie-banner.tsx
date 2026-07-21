'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_KEY = 'reviewr_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) setVisible(true)
    } catch {
      // localStorage not available
    }
  }, [])

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, 'accepted') } catch { /* noop */ }
    setVisible(false)
  }

  function decline() {
    try { localStorage.setItem(COOKIE_KEY, 'declined') } catch { /* noop */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-xl mx-auto bg-white border border-black/[0.1] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto">
        <p className="text-sm text-[#374151] leading-relaxed flex-1">
          We use only essential cookies to keep you signed in.{' '}
          <Link href="/privacy" className="text-[#16a34a] hover:underline">Learn more</Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-[#9ca3af] hover:text-[#374151] transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-[#16a34a] text-white px-4 py-1.5 rounded-full hover:bg-[#15803d] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
