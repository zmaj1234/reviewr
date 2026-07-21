'use client'

import { TrendingUp, BarChart2, Lock } from 'lucide-react'

interface WeekData {
  label: string
  count: number
  avgRating: number | null
}

interface Props {
  plan: 'solo' | 'growth'
  businessName: string
  weeks: WeekData[]
  totalReviews: number
  avgRating: string
  responseRate: number
  avgResponseTimeHours: number
  sentimentCounts: { positive: number; neutral: number; negative: number }
}

function formatTime(hours: number): string {
  if (hours === 0) return '—'
  if (hours < 1) return '< 1h'
  if (hours < 24) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

// ── SVG Line Chart ─────────────────────────────────────────────────────────────
function RatingLineChart({ weeks }: { weeks: WeekData[] }) {
  const W = 400, H = 100
  const PAD_X = 8, PAD_Y = 14
  const chartW = W - 2 * PAD_X
  const chartH = H - 2 * PAD_Y

  const points = weeks.map((w, i) => ({
    x: PAD_X + (i / Math.max(weeks.length - 1, 1)) * chartW,
    y: w.avgRating !== null
      ? PAD_Y + ((5 - w.avgRating) / 4) * chartH
      : null,
  }))

  const valid = points.filter((p): p is { x: number; y: number } => p.y !== null)

  const linePath = valid.length >= 2
    ? valid.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
    : ''

  const areaPath = valid.length >= 2
    ? `${linePath} L${valid[valid.length - 1].x.toFixed(1)},${H - PAD_Y} L${valid[0].x.toFixed(1)},${H - PAD_Y} Z`
    : ''

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 100 }}>
      <defs>
        <linearGradient id="lgRating" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Guide lines */}
      {[1, 2, 3].map(i => {
        const y = PAD_Y + (i / 4) * chartH
        return <line key={i} x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} stroke="rgba(0,0,0,0.045)" strokeWidth="1" />
      })}

      {areaPath && <path d={areaPath} fill="url(#lgRating)" />}
      {linePath && (
        <path
          d={linePath}
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {valid.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="white"
          stroke="#16a34a"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

// ── SVG Bar Chart ──────────────────────────────────────────────────────────────
function VolumeBarChart({ weeks }: { weeks: WeekData[] }) {
  const W = 400, H = 72
  const PAD_Y = 4
  const chartH = H - PAD_Y
  const maxCount = Math.max(...weeks.map(w => w.count), 1)
  const slotW = W / weeks.length
  const barW = Math.max(slotW * 0.52, 8)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 72 }}>
      {weeks.map((w, i) => {
        const barH = w.count === 0 ? 3 : Math.max(6, (w.count / maxCount) * chartH)
        const x = i * slotW + (slotW - barW) / 2
        const y = H - barH
        return (
          <rect
            key={i}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            width={barW.toFixed(1)}
            height={barH.toFixed(1)}
            rx="4"
            ry="4"
            fill={w.count === 0 ? '#e5e5ea' : '#16a34a'}
            opacity={w.count === 0 ? 0.5 : 0.8}
          />
        )
      })}
    </svg>
  )
}

// ── Sentiment Bars ─────────────────────────────────────────────────────────────
function SentimentSection({
  counts, total,
}: {
  counts: { positive: number; neutral: number; negative: number }
  total: number
}) {
  const items = [
    { label: 'Positive', count: counts.positive, color: '#16a34a', trackBg: '#f0fdf4' },
    { label: 'Neutral',  count: counts.neutral,  color: '#6c6c70', trackBg: '#f2f2f7' },
    { label: 'Negative', count: counts.negative, color: '#ff3b30', trackBg: '#fff1f0' },
  ]

  return (
    <div className="space-y-4">
      {items.map(item => {
        const pct = total > 0 ? Math.round((item.count / total) * 100) : 0
        return (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] font-medium text-[#1c1c1e]">{item.label}</span>
              <span className="text-[13px] font-semibold tabular-nums" style={{ color: item.color }}>
                {pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: item.trackBg }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: item.color, opacity: 0.7 }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Upgrade Prompt ─────────────────────────────────────────────────────────────
function UpgradePrompt({ businessName }: { businessName: string }) {
  return (
    <div className="px-8 py-10 max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-[2rem] text-[#1c1c1e] leading-tight">Analytics</h1>
        <p className="text-sm text-[#aeaeb2] mt-1 font-medium">{businessName}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] px-8 py-16 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#f2f2f7] border border-[#e5e5ea] flex items-center justify-center mb-5">
          <Lock size={22} className="text-[#aeaeb2]" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-xl text-[#1c1c1e] mb-2">Analytics — Growth plan</h3>
        <p className="text-sm text-[#aeaeb2] max-w-[260px] leading-relaxed mb-6">
          Rating trends, weekly volume, response time, sentiment — all in one clean view.
        </p>
        <a
          href="/api/stripe/checkout?plan=growth"
          className="inline-flex items-center gap-2 bg-[#16a34a] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#15803d] transition-colors shadow-[0_2px_8px_rgba(22,163,74,0.3)]"
        >
          Upgrade to Growth
        </a>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function AnalyticsClient({
  plan,
  businessName,
  weeks,
  totalReviews,
  avgRating,
  responseRate,
  avgResponseTimeHours,
  sentimentCounts,
}: Props) {
  if (plan === 'solo') return <UpgradePrompt businessName={businessName} />

  const hasData = totalReviews > 0
  const sentimentTotal = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative

  const isHighRating = avgRating !== '—' && parseFloat(avgRating) >= 4.0

  const statCards = [
    {
      label: 'Avg rating',
      value: avgRating,
      suffix: avgRating !== '—' ? '★' : '',
      highlight: isHighRating,
    },
    { label: 'Total reviews', value: String(totalReviews), suffix: '',  highlight: false },
    { label: 'Response rate', value: `${responseRate}`, suffix: '%',   highlight: false },
    { label: 'Avg response',  value: formatTime(avgResponseTimeHours),  suffix: '', highlight: false },
  ]

  return (
    <div className="px-8 py-10 max-w-4xl animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[2rem] text-[#1c1c1e] leading-tight">Analytics</h1>
        <p className="text-sm text-[#aeaeb2] mt-1 font-medium">{businessName}</p>
      </div>

      {/* ── Stat row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {statCards.map(card => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl px-5 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] ${
              card.highlight ? 'ring-1 ring-[#16a34a]/30 bg-[#f0fdf4]' : ''
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aeaeb2] mb-2.5">
              {card.label}
            </p>
            <p className={`font-serif text-[2.25rem] leading-none tracking-tight ${
              card.highlight ? 'text-[#16a34a]' : 'text-[#1c1c1e]'
            }`}>
              {card.value}
              {card.suffix && (
                <span className="text-xl ml-0.5 opacity-60">{card.suffix}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* ── Rating trend + Sentiment ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

        {/* Line chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aeaeb2] mb-0.5">
                Rating trend
              </p>
              <p className="text-xs text-[#6c6c70]">Last 8 weeks</p>
            </div>
            <TrendingUp size={15} className="text-[#16a34a]" />
          </div>

          {hasData ? (
            <>
              <RatingLineChart weeks={weeks} />
              <div className="flex justify-between mt-2 px-0.5">
                <span className="text-[10px] text-[#aeaeb2]">{weeks[0]?.label}</span>
                <span className="text-[10px] text-[#aeaeb2]">Now</span>
              </div>
            </>
          ) : (
            <div className="h-[100px] flex items-center justify-center">
              <p className="text-sm text-[#aeaeb2]">Reviews will appear here once they arrive</p>
            </div>
          )}
        </div>

        {/* Sentiment */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aeaeb2] mb-5">
            Sentiment
          </p>
          {sentimentTotal > 0 ? (
            <SentimentSection counts={sentimentCounts} total={sentimentTotal} />
          ) : (
            <div className="h-[100px] flex items-center justify-center">
              <p className="text-sm text-[#aeaeb2] text-center">No data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Weekly volume ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.04)] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aeaeb2] mb-0.5">
              Weekly volume
            </p>
            <p className="text-xs text-[#6c6c70]">Reviews received per week</p>
          </div>
          <BarChart2 size={15} className="text-[#aeaeb2]" />
        </div>

        {hasData ? (
          <>
            <VolumeBarChart weeks={weeks} />
            <div className="flex justify-between mt-2 px-0.5">
              <span className="text-[10px] text-[#aeaeb2]">{weeks[0]?.label}</span>
              <span className="text-[10px] text-[#aeaeb2]">Now</span>
            </div>
          </>
        ) : (
          <div className="h-[72px] flex items-center justify-center">
            <p className="text-sm text-[#aeaeb2]">No reviews in the last 8 weeks</p>
          </div>
        )}
      </div>
    </div>
  )
}
