import { ToastProvider } from '@/components/ui/toast'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen relative" style={{ backgroundColor: '#f9f9f7' }}>

        {/* Subtle centered glow — green, very faint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(22,163,74,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ToastProvider>
  )
}
