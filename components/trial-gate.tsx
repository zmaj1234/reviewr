'use client'

import { usePathname } from 'next/navigation'

interface Props {
  trialExpired: boolean
}

export function TrialGate({ trialExpired }: Props) {
  const pathname = usePathname()

  // Allow settings so they can subscribe
  if (!trialExpired || pathname.startsWith('/settings')) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#f2f2f7] border border-[#e5e5ea] flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">⏰</span>
        </div>
        <h2 className="font-serif text-2xl text-[#1c1c1e] mb-2">Trial ended</h2>
        <p className="text-sm text-[#6c6c70] leading-relaxed mb-6">
          Your 7-day free trial has ended. Subscribe to keep managing your reviews.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="/api/stripe/checkout?plan=solo"
            className="block w-full text-center text-sm font-semibold bg-[#1c1c1e] text-white px-4 py-3 rounded-xl hover:bg-black transition-colors"
          >
            Subscribe — €19/month
          </a>
          <a
            href="/api/stripe/checkout?plan=growth"
            className="block w-full text-center text-sm font-semibold bg-[#16a34a] text-white px-4 py-3 rounded-xl hover:bg-[#15803d] transition-colors"
          >
            Growth — €49/month
          </a>
          <a
            href="/settings"
            className="block w-full text-center text-sm text-[#aeaeb2] px-4 py-2 hover:text-[#6c6c70] transition-colors"
          >
            Go to billing settings
          </a>
        </div>
      </div>
    </div>
  )
}
