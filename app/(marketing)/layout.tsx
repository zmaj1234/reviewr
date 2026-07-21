import { CookieBanner } from '@/components/cookie-banner'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#fafaf7', minHeight: '100vh' }}>
      {children}
      <CookieBanner />
    </div>
  )
}
