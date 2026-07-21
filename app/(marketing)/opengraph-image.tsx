import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reviewr — Reply to every Google review in one tap'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0f1e',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Stars row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ fontSize: '28px', color: '#16a34a' }}>★</div>
          ))}
        </div>

        {/* Logo / brand name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-3px',
            marginBottom: '24px',
            lineHeight: 1,
          }}
        >
          Reviewr
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
            marginBottom: '48px',
          }}
        >
          Reply to every Google review in one tap.
        </div>

        {/* Pill badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['AI-drafted replies', 'One-tap approve', '24/7 monitoring'].map(label => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '100px',
                padding: '10px 24px',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          reviewrai.app
        </div>
      </div>
    ),
    { ...size }
  )
}
