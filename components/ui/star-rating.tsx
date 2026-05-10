import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  const colorMap: Record<number, string> = {
    1: 'text-danger',
    2: 'text-danger',
    3: 'text-warning',
    4: 'text-accent',
    5: 'text-accent',
  }

  const color = colorMap[rating] ?? 'text-secondary'

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? color : 'text-border-strong'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}
