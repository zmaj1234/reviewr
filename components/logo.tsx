export function LogoMark({
  size = 24,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 28 / 32)}
      viewBox="0 0 32 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-left star */}
      <polygon points="10,1 11.18,4.38 14.76,4.45 11.90,6.62 12.94,10.05 10,8 7.06,10.05 8.10,6.62 5.24,4.45 8.82,4.38" />
      {/* Bottom-left star */}
      <polygon points="6,13.5 7.06,16.54 10.28,16.61 7.71,18.56 8.65,21.64 6,19.8 3.35,21.64 4.29,18.56 1.72,16.61 4.94,16.54" />
      {/* Bottom-right star */}
      <polygon points="17,16 17.94,18.71 20.80,18.76 18.52,20.49 19.35,23.24 17,21.6 14.65,23.24 15.48,20.49 13.20,18.76 16.06,18.71" />
      {/* Arrow shaft */}
      <path
        d="M 4,21 L 13,11 L 23,15.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Arrowhead */}
      <polygon points="27,17.3 21.42,17.51 23.48,12.95" />
    </svg>
  )
}
