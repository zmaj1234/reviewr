import { ToastProvider } from '@/components/ui/toast'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0d1210' }}>

        {/* Top-right curtain */}
        <div className="absolute top-0 right-0 w-80 h-96 pointer-events-none">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(210deg, rgba(22,163,74,0.18) 0%, rgba(22,163,74,0.08) 20%, rgba(16,120,56,0.12) 38%, rgba(22,163,74,0.04) 55%, transparent 72%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(195deg, rgba(134,239,172,0.07) 0%, rgba(22,163,74,0.05) 30%, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(225deg, rgba(22,163,74,0.1) 0%, rgba(22,163,74,0.06) 25%, transparent 50%)',
            filter: 'blur(18px)',
          }} />
          {/* Fold highlight */}
          <div style={{
            position: 'absolute',
            top: '8%', right: '15%',
            width: '2px', height: '55%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(134,239,172,0.25) 30%, rgba(134,239,172,0.1) 70%, transparent 100%)',
            transform: 'rotate(12deg)',
            filter: 'blur(3px)',
          }} />
          <div style={{
            position: 'absolute',
            top: '5%', right: '32%',
            width: '1px', height: '40%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(134,239,172,0.12) 40%, transparent 100%)',
            transform: 'rotate(8deg)',
            filter: 'blur(2px)',
          }} />
        </div>

        {/* Bottom-left curtain */}
        <div className="absolute bottom-0 left-0 w-80 h-96 pointer-events-none">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(30deg, rgba(22,163,74,0.18) 0%, rgba(22,163,74,0.08) 20%, rgba(16,120,56,0.12) 38%, rgba(22,163,74,0.04) 55%, transparent 72%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(15deg, rgba(134,239,172,0.07) 0%, rgba(22,163,74,0.05) 30%, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(45deg, rgba(22,163,74,0.1) 0%, rgba(22,163,74,0.06) 25%, transparent 50%)',
            filter: 'blur(18px)',
          }} />
          {/* Fold highlight */}
          <div style={{
            position: 'absolute',
            bottom: '8%', left: '15%',
            width: '2px', height: '55%',
            background: 'linear-gradient(0deg, transparent 0%, rgba(134,239,172,0.25) 30%, rgba(134,239,172,0.1) 70%, transparent 100%)',
            transform: 'rotate(-12deg)',
            filter: 'blur(3px)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '5%', left: '32%',
            width: '1px', height: '40%',
            background: 'linear-gradient(0deg, transparent 0%, rgba(134,239,172,0.12) 40%, transparent 100%)',
            transform: 'rotate(-8deg)',
            filter: 'blur(2px)',
          }} />
        </div>

        {/* Soft center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ToastProvider>
  )
}
