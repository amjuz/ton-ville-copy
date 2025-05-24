import { LegacyRef } from 'react'
import { cn } from '@/lib/utils/cn'

export default function MiniCardSkelton({
  count = 1,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 grid grid-flow-col grid-rows-2 gap-4 overflow-x-scroll',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          className={cn('flex h-full max-w-[350px] gap-2')}
          key={`Mini-card-prefetching-skelton-${i}`}
        >
          <div className="basis-[30%]">
            {/* image animation */}
            <div className="h-24 w-24 animate-pulse rounded-xl bg-gray-800"></div>
          </div>
          <div className="basis-[70%] py-1">
            <div className="flex h-full flex-col justify-around gap-2">
              {/*  */}
              <div className="flex items-center gap-3">
                {/* avatar rounded */}
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-800"></div>
                {/* user name */}
                <div className="h-3 w-28 animate-pulse rounded-2xl bg-gray-800"></div>
              </div>
              <div className="h-3 w-56 animate-pulse rounded-2xl bg-gray-800"></div>
              <div className="h-3 w-36 animate-pulse rounded-2xl bg-gray-800"></div>
              <div className="h-3 w-24 animate-pulse rounded-2xl bg-gray-800"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function MiniCardInfiniteQuerySkelton({
  count,
  ref,
}: {
  count: number
  ref?: LegacyRef<HTMLDivElement>
}) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      className={cn('flex h-full max-w-[350px] gap-2')}
      key={`Mini-card-infinity-query-fetching-skelton-${i}`}
      ref={ref}
    >
      <div className="basis-[30%]">
        {/* image animation */}
        <div className="h-24 w-24 animate-pulse rounded-xl bg-gray-800"></div>
      </div>
      <div className="basis-[70%] py-1">
        <div className="flex h-full flex-col justify-around gap-2">
          {/*  */}
          <div className="flex items-center gap-3">
            {/* avatar rounded animation*/}
            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-800"></div>
            {/* user name animation*/}
            <div className="h-3 w-28 animate-pulse rounded-2xl bg-gray-800"></div>
          </div>
          {/* line animation */}
          <div className="h-3 w-56 animate-pulse rounded-2xl bg-gray-800"></div>
          <div className="h-3 w-36 animate-pulse rounded-2xl bg-gray-800"></div>
          <div className="h-3 w-24 animate-pulse rounded-2xl bg-gray-800"></div>
        </div>
      </div>
    </div>
  ))
}
