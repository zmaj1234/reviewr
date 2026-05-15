'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/toast'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      toast('Password must be at least 8 characters', 'error')
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        toast(error.message, 'error')
        setLoading(false)
        return
      }
      router.push('/connect')
      router.refresh()
    } catch {
      toast('Could not connect. Check your configuration.', 'error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#e8e8e3]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#16a34a] flex items-center justify-center">
              <Star size={12} fill="white" className="text-white" />
            </div>
            <span className="font-serif text-lg text-[#0a0f1e]">Reviewr</span>
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-serif text-3xl text-[#0a0f1e] mb-2">Create your account.</h1>
            <p className="text-sm text-[#6b7280]">Start managing reviews in under 5 minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[#e8e8e3] rounded-lg p-7 space-y-5">
            <OAuthButtons />
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Full name</label>
              <input
                type="text"
                className="w-full bg-[#fafaf7] border border-[#e8e8e3] rounded-md text-sm text-[#0a0f1e] px-3 py-2.5 outline-none focus:border-[#0a0f1e] focus:ring-2 focus:ring-[#0a0f1e]/5 transition-colors placeholder:text-[#b0b0a8]"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Email address</label>
              <input
                type="email"
                className="w-full bg-[#fafaf7] border border-[#e8e8e3] rounded-md text-sm text-[#0a0f1e] px-3 py-2.5 outline-none focus:border-[#0a0f1e] focus:ring-2 focus:ring-[#0a0f1e]/5 transition-colors placeholder:text-[#b0b0a8]"
                placeholder="you@example.com"
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
                  className="w-full bg-[#fafaf7] border border-[#e8e8e3] rounded-md text-sm text-[#0a0f1e] px-3 py-2.5 pr-10 outline-none focus:border-[#0a0f1e] focus:ring-2 focus:ring-[#0a0f1e]/5 transition-colors placeholder:text-[#b0b0a8]"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0a8] hover:text-[#6b7280] transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#16a34a] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#15803d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner size={15} className="text-white" /> : <>Create account <ArrowRight size={14} /></>}
            </button>

            <p className="text-center text-xs text-[#b0b0a8]">
              By signing up you agree to our{' '}
              <a href="#" className="text-[#6b7280] hover:text-[#0a0f1e] transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-[#6b7280] hover:text-[#0a0f1e] transition-colors">Privacy Policy</a>.
            </p>
          </form>

          <p className="text-center text-sm text-[#9ca3af] mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0a0f1e] font-medium hover:text-[#16a34a] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
