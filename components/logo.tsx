export function LogoMark({
  size = 32,
  noShadow: _noShadow,
  className = '',
}: {
  size?: number
  noShadow?: boolean
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-icon.png"
      alt="Reviewr"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block', flexShrink: 0 }}
      className={className}
    />
  )
}

export function LogoWithText({
  height = 32,
  className = '',
}: {
  height?: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-full.png"
      alt="Reviewr"
      height={height}
      style={{ width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
      className={className}
    />
  )
}
