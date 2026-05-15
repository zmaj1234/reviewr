'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'

export function OAuthButtons() {
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  async function signInWith(provider: 'google') {
    const setLoading = setLoadingGoogle
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
        disabled={loadingGoogle}
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

<div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e8e8e3]" />
        <span className="text-xs text-[#b0b0a8]">or</span>
        <div className="flex-1 h-px bg-[#e8e8e3]" />
      </div>
    </div>
  )
}
