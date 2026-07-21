'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import { LogoMark } from '@/components/logo'

export default function SignupPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { toast('Password must be at least 8 characters', 'error'); return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) { toast(error.message, 'error'); setLoading(false); return }

      if (data.session) {
        // Signed in immediately — go to connect
        window.location.href = '/connect'
      } else {
        // Email confirmation required
        toast('Check your email and click the confirmation link to continue.', 'success')
        setLoading(false)
      }
    } catch {
      toast('Could not connect. Please try again.', 'error')
      setLoading(false)
    }
  }

  async function signInWithGoogle() {
    setLoadingGoogle(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoadingGoogle(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="transition-all duration-200 hover:-translate-y-px hover:brightness-105">
            <LogoMark size={40} />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#0a0f1e] mb-2">Create your account</h1>
          <p className="text-sm text-[#6b7280]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0a0f1e] hover:text-[#16a34a] transition-colors font-medium">
              Log in
            </Link>
          </p>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loadingGoogle || loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-[#e0dfd9] hover:border-[#c8c7c1] hover:bg-[#fafaf7] text-sm font-medium text-[#0a0f1e] py-3 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-5"
        >
          {loadingGoogle ? <Spinner size={15} /> : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
          )}
          Log in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#e8e8e3]" />
          <span className="text-xs text-[#b0b0a8]">or</span>
          <div className="flex-1 h-px bg-[#e8e8e3]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">Email</label>
            <input
              type="email"
              className="w-full bg-[#f4f3ef] border border-[#e0dfd9] rounded-2xl text-sm text-[#0a0f1e] px-4 py-3 outline-none focus:border-[#16a34a] focus:bg-white focus:ring-4 focus:ring-[#16a34a]/10 transition-all placeholder:text-[#b0b0a8] shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)] hover:border-[#c8c7c1]"
              placeholder="alan.turing@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="w-full bg-[#f4f3ef] border border-[#e0dfd9] rounded-2xl text-sm text-[#0a0f1e] px-4 py-3 pr-11 outline-none focus:border-[#16a34a] focus:bg-white focus:ring-4 focus:ring-[#16a34a]/10 transition-all placeholder:text-[#b0b0a8] shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)] hover:border-[#c8c7c1]"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b0b0a8] hover:text-[#6b7280] transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || loadingGoogle || !email || !password}
            className="w-full bg-[#0a0f1e] text-sm font-medium text-white py-3 rounded-xl hover:bg-[#111827] transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          >
            {loading ? <Spinner size={15} className="text-white mx-auto" /> : 'Create account'}
          </button>
        </form>

        <p className="text-center text-xs text-[#9ca3af] mt-6 leading-relaxed">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-[#6b7280] hover:text-[#0a0f1e] transition-colors">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-[#6b7280] hover:text-[#0a0f1e] transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
