import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── iOS Light Theme ───────────────────────────────────
        bg:              '#f2f2f7',          // iOS systemGroupedBackground
        surface:         '#ffffff',          // iOS systemBackground
        card:            '#ffffff',          // iOS card surface
        border:          'rgba(60,60,67,0.12)',   // iOS separator
        'border-strong': 'rgba(60,60,67,0.24)',
        primary:         '#1c1c1e',          // iOS label
        secondary:       '#6c6c70',          // iOS secondaryLabel
        muted:           '#aeaeb2',          // iOS tertiaryLabel
        accent:          '#16a34a',          // Reviewr brand green
        'accent-hover':  '#15803d',
        'accent-subtle': 'rgba(22,163,74,0.1)',
        danger:          '#ff3b30',          // iOS systemRed
        warning:         '#ff9500',          // iOS systemOrange
        // ── v3 landing (Apple design) — scoped to app/(marketing)/page.tsx ──
        ink:             '#1d1d1f',
        fog:             '#f5f5f7',
        mist:            '#86868b',
        live:            '#1d7a3e',
        livedim:         '#e8f3ec',
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
