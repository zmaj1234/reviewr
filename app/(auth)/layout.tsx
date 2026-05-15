import { ToastProvider } from '@/components/ui/toast'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f7faf7' }}>

        {/* Top-right curtain */}
        <div className="absolute top-0 right-0 w-[200px] h-[260px] sm:w-[420px] sm:h-[500px] pointer-events-none" style={{ overflow: 'hidden' }}>
          {/* Base drape shape */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 105% -5%, rgba(22,163,74,0.22) 0%, rgba(22,163,74,0.1) 45%, transparent 70%)',
          }} />
          {/* Fold stripes */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(205deg, transparent 0px, rgba(22,163,74,0.07) 18px, rgba(22,163,74,0.18) 30px, rgba(22,163,74,0.07) 42px, transparent 60px)',
            maskImage: 'radial-gradient(ellipse at 105% -5%, black 0%, black 35%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 105% -5%, black 0%, black 35%, transparent 68%)',
          }} />
          {/* Highlight ridges */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(205deg, transparent 0px, transparent 27px, rgba(134,239,172,0.45) 29px, rgba(134,239,172,0.45) 31px, transparent 33px)',
            maskImage: 'radial-gradient(ellipse at 105% -5%, black 0%, black 30%, transparent 62%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 105% -5%, black 0%, black 30%, transparent 62%)',
          }} />
        </div>

        {/* Bottom-left curtain */}
        <div className="absolute bottom-0 left-0 w-[200px] h-[260px] sm:w-[420px] sm:h-[500px] pointer-events-none" style={{ overflow: 'hidden' }}>
          {/* Base drape shape */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at -5% 105%, rgba(22,163,74,0.22) 0%, rgba(22,163,74,0.1) 45%, transparent 70%)',
          }} />
          {/* Fold stripes */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(25deg, transparent 0px, rgba(22,163,74,0.07) 18px, rgba(22,163,74,0.18) 30px, rgba(22,163,74,0.07) 42px, transparent 60px)',
            maskImage: 'radial-gradient(ellipse at -5% 105%, black 0%, black 35%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(ellipse at -5% 105%, black 0%, black 35%, transparent 68%)',
          }} />
          {/* Highlight ridges */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(25deg, transparent 0px, transparent 27px, rgba(134,239,172,0.45) 29px, rgba(134,239,172,0.45) 31px, transparent 33px)',
            maskImage: 'radial-gradient(ellipse at -5% 105%, black 0%, black 30%, transparent 62%)',
            WebkitMaskImage: 'radial-gradient(ellipse at -5% 105%, black 0%, black 30%, transparent 62%)',
          }} />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ToastProvider>
  )
}
