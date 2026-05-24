'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  label: string
  value: number | string
  highlight?: boolean
  suffix?: string
  icon?: React.ElementType  // kept for API compat, not rendered
  iconBg?: string
  iconColor?: string
}

export function StatCard({ label, value, highlight, suffix }: StatCardProps) {
  const [display, setDisplay] = useState(typeof value === 'number' ? 0 : value)
  const animated = useRef(false)

  useEffect(() => {
    if (typeof value !== 'number' || animated.current) return
    animated.current = true
    const duration = 900
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * (value as number)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return (
    <div
      className={`bg-white rounded-2xl px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] ${
        highlight ? 'ring-1 ring-[#16a34a]/30 bg-[#f0fdf4]' : ''
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aeaeb2] mb-2.5">
        {label}
      </p>
      <p className={`font-serif leading-none tracking-tight ${
        highlight ? 'text-[#16a34a] text-[2.25rem]' : 'text-[#1c1c1e] text-[2.25rem]'
      }`}>
        {typeof value === 'number' ? display : value}
        {suffix && (
          <span className="text-xl ml-0.5 opacity-60">{suffix}</span>
        )}
      </p>
    </div>
  )
}
