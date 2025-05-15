import { cn } from '@/lib/utils/cn'

export default function TrendingCardSkelton({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        'relative grid aspect-square w-full max-w-[238px] flex-shrink-0 grid-rows-2 overflow-hidden rounded-2xl',
        className
      )}
    >
      {/* Image Skeleton */}
      <div className="h-full w-full animate-pulse bg-gray-800">
        {/* profile pic skelton */}
        <div className="absolute left-3 top-24 h-12 w-12 animate-pulse rounded-full border-2 bg-gray-800 shadow-2xl" />
      </div>

      {/* Content Skeleton */}
      <div className="relative">
        <div className="relative top-1 h-full w-full bg-muted/5 px-2 py-7">
          <div className="mb-1 flex items-center justify-between gap-4">
            {/* Tribe Name Skeleton */}
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800"></div>

            {/* Rank Skeleton */}
            <div className="flex h-4 w-1/4 animate-pulse items-center gap-2 rounded bg-gray-800"></div>
          </div>

          {/* Author and Members Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-800"></div>
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-800"></div>
          </div>
        </div>
      </div>
    </article>
  )
}
