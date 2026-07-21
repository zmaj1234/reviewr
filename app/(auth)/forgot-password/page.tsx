'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogoMark } from '@/components/logo'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/" className="transition-all duration-200 hover:-translate-y-px hover:brightness-105">
            <LogoMark size={40} />
          </Link>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">✉️</span>
            </div>
            <h1 className="font-serif text-2xl text-[#0a0f1e] mb-3">Check your inbox</h1>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
              We sent a reset link to <strong>{email}</strong>. Click it to set a new password. Check spam if you don&apos;t see it.
            </p>
            <Link href="/login" className="text-sm text-[#0a0f1e] font-medium hover:text-[#16a34a] transition-colors">
              ← Back to login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl text-[#0a0f1e] mb-2">Reset password</h1>
              <p className="text-sm text-[#6b7280]">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#f4f3ef] border border-[#e0dfd9] rounded-2xl text-sm text-[#0a0f1e] px-4 py-3 outline-none focus:border-[#16a34a] focus:bg-white focus:ring-4 focus:ring-[#16a34a]/10 transition-all placeholder:text-[#b0b0a8] shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)]"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#0a0f1e] text-sm font-medium text-white py-3 rounded-xl hover:bg-[#111827] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <Spinner size={15} className="text-white mx-auto" /> : 'Send reset link'}
              </button>
            </form>

            <p className="text-center text-sm text-[#6b7280] mt-6">
              <Link href="/login" className="text-[#0a0f1e] font-medium hover:text-[#16a34a] transition-colors">
                ← Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
