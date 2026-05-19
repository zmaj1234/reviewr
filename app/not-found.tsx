import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LogoWithText } from '@/components/logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col">
      <header className="border-b border-[#e8e8e3]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-px hover:brightness-105">
            <LogoWithText height={28} />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="font-serif text-8xl text-[#e8e8e3] leading-none mb-6">404</div>
          <h1 className="font-serif text-2xl text-[#0a0f1e] mb-3">Page not found.</h1>
          <p className="text-sm text-[#6b7280] mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0f1e] border border-[#0a0f1e] px-4 py-2.5 rounded-md hover:bg-[#0a0f1e] hover:text-white transition-colors"
          >
            Back to home
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
