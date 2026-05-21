'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export function AnimateIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('in-view'), delay)
          ob.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -56px 0px' }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`will-animate ${className}`}>
      {children}
    </div>
  )
}
