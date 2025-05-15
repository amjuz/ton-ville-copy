import { LegacyRef } from 'react'

export default function QuestCardSkelton({ count = 3 }: { count?: number }) {
  return (
    <div className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-4 flex w-full gap-5 overflow-x-scroll">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`quest-skelton-${i}`}
          className="relative flex w-full max-w-[240px] flex-shrink-0 animate-pulse flex-col gap-2"
        >
          {/* Skeleton for Image */}
          <div className="h-[180px] w-[240px] rounded-md bg-gray-800"></div>

          {/* Skeleton for Text */}
          <div className="my-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-800"></div>
            <div className="h-3 w-1/2 rounded bg-gray-800"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function QuestCardInfiniteQuerySkelton({ ref }: { ref?: LegacyRef<HTMLDivElement> }) {
  return (
    <div
      key={`quest-card-infinite-quest-skelton`}
      className="relative ml-0 flex w-full max-w-[240px] flex-shrink-0 animate-pulse flex-col gap-2 pl-0 pt-0"
      ref={ref}
    >
      {/* Skeleton for Image */}
      <div className="h-[145px] w-[240px] rounded-2xl bg-gray-800"></div>

      {/* Skeleton for Text */}
      <div className="my-1 space-y-2">
        <div className="h-4 w-5/6 rounded bg-gray-800"></div>
        <div className="h-3 w-3/4 rounded bg-gray-800"></div>
        <div className="h-3 w-2/3 rounded bg-gray-800"></div>
        <div className="h-3 w-1/3 rounded bg-gray-800"></div>
      </div>
    </div>
  )
}
