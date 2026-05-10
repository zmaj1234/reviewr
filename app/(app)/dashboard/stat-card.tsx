'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  label: string
  value: number | string
  highlight?: boolean
  suffix?: string
}

export function StatCard({ label, value, highlight, suffix }: StatCardProps) {
  const [display, setDisplay] = useState(typeof value === 'number' ? 0 : value)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (typeof value !== 'number' || animatedRef.current) return
    animatedRef.current = true
    const duration = 800
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * (value as number)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return (
    <div className={`card p-5 ${highlight ? 'border-accent/40 bg-accent/5' : ''}`}>
      <div className={`font-serif text-3xl font-medium mb-1 ${highlight ? 'text-accent' : 'text-primary'}`}>
        {typeof value === 'number' ? display : value}
        {suffix && <span className="text-base ml-0.5 opacity-60">{suffix}</span>}
      </div>
      <div className="text-sm text-secondary">{label}</div>
    </div>
  )
}
