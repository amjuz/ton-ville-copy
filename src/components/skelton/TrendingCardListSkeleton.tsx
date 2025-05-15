import { LegacyRef } from 'react'
import { cn } from '@/lib/utils/cn'
import TrendingCardSkelton from './TrendingCardSkelton'

export const TrendingCardListSkeleton = ({
  orientation = 'horizontal',
  count = 1,
  className,
  ref,
}: {
  orientation?: 'horizontal' | 'vertical'
  count?: number
  className?: string
  ref?: LegacyRef<HTMLDivElement>
}) => {
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-4 flex w-full gap-5',
        {
          'overflow-x-scroll': orientation === 'horizontal' || !orientation,
          'flex flex-wrap place-content-center place-items-center items-center justify-center overflow-y-scroll px-2 sm:px-4':
            orientation === 'vertical',
        },
        className
      )}
      ref={ref}
    >
      {Array.from({ length: count }).map((_, i) => (
        <TrendingCardSkelton
          key={`trending-card-skeleton-${i}`}
          className={orientation === 'vertical' ? 'max-w-[378px]' : ''}
        />
      ))}
    </div>
  )
}
