'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'

export function OAuthButtons() {
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingApple, setLoadingApple]   = useState(false)

  async function signInWith(provider: 'google' | 'apple') {
    const setLoading = provider === 'google' ? setLoadingGoogle : setLoadingApple
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        type="button"
        onClick={() => signInWith('google')}
        disabled={loadingGoogle || loadingApple}
        className="w-full flex items-center justify-center gap-3 border border-[#e8e8e3] bg-white text-sm font-medium text-[#374151] py-2.5 rounded-md hover:bg-[#fafaf7] hover:border-[#d1d0ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingGoogle ? <Spinner size={15} /> : (
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
          </svg>
        )}
        Continue with Google
      </button>

      {/* Apple */}
      <button
        type="button"
        onClick={() => signInWith('apple')}
        disabled={loadingGoogle || loadingApple}
        className="w-full flex items-center justify-center gap-3 border border-[#e8e8e3] bg-[#0a0f1e] text-sm font-medium text-white py-2.5 rounded-md hover:bg-[#111827] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingApple ? <Spinner size={15} className="text-white" /> : (
          <svg width="16" height="18" viewBox="0 0 814 1000" aria-hidden fill="currentColor">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-148.3-107.4C108.2 692.1 67.7 612.7 67.7 537.3c0-156.1 102.1-238.8 201.9-238.8 76 0 138.8 50 185.8 50 45.1 0 115.7-52.7 199.7-52.7zm-234-181.5c39.5-47.5 67.8-113.6 67.8-179.7 0-9-.6-18.1-2.2-25.8-63.7 2.3-138.8 42.4-184.4 92.6-35.6 39-68.5 105.1-68.5 172.5 0 9.7 1.6 19.4 2.2 22.5 4.5.6 9 1.3 13.6 1.3 57 0 127.3-38.3 171.5-83.4z"/>
          </svg>
        )}
        Continue with Apple
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e8e8e3]" />
        <span className="text-xs text-[#b0b0a8]">or</span>
        <div className="flex-1 h-px bg-[#e8e8e3]" />
      </div>
    </div>
  )
}
