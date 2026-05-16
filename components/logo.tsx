export function LogoMark({
  size = 32,
  noShadow = false,
  className = '',
}: {
  size?: number
  noShadow?: boolean
  className?: string
}) {
  const useShadow = !noShadow && size > 24

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Reviewr"
      className={className}
    >
      <defs>
        <linearGradient id="reviewrGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D87A" />
          <stop offset="100%" stopColor="#0EA85A" />
        </linearGradient>
        <linearGradient id="reviewrHL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {useShadow && (
          <filter id="reviewrShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="4" result="off" />
            <feFlood floodColor="#0EA85A" floodOpacity="0.28" />
            <feComposite in2="off" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <g filter={useShadow ? 'url(#reviewrShadow)' : undefined}>
        <path
          d="M 80 0 C 35 0, 0 35, 0 80 C 0 125, 35 160, 80 160 C 125 160, 160 125, 160 80 C 160 35, 125 0, 80 0 Z"
          fill="url(#reviewrGrad)"
        />
        <path
          d="M 80 0 C 35 0, 0 35, 0 80 L 160 80 C 160 35, 125 0, 80 0 Z"
          fill="url(#reviewrHL)"
        />
        <g transform="translate(80, 80)">
          <path
            d="M 0 -34 C 4 -14, 14 -4, 34 0 C 14 4, 4 14, 0 34 C -4 14, -14 4, -34 0 C -14 -4, -4 -14, 0 -34 Z"
            fill="#ffffff"
          />
          <path
            d="M 24 -22 C 25 -16, 28 -13, 34 -12 C 28 -11, 25 -8, 24 -2 C 23 -8, 20 -11, 14 -12 C 20 -13, 23 -16, 24 -22 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </g>
    </svg>
  )
}
