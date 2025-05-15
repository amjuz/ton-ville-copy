import { LegacyRef } from 'react'

export default function LeaderBoardSkelton({ count = 8 }: { count?: number }) {
  return (
    <div className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-4 flex w-full flex-col gap-5 overflow-x-scroll">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`leader-board-skelton-${i}`}
          className="flex w-full animate-pulse items-center gap-2"
        >
          <div className="h-12 w-12 rounded-full bg-muted"></div>
          <div className="flex w-full items-center justify-between">
            <div>
              <div className="flex w-fit items-center rounded-2xl bg-muted px-2.5 py-1 text-xs font-medium">
                <div className="h-4 w-6 rounded bg-muted"></div>
              </div>
              <div className="mt-2 h-4 w-20 rounded bg-muted"></div>
            </div>
            <div className="h-4 w-10 rounded bg-muted"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LeaderboardInfinityQuery({ ref }: { ref?: LegacyRef<HTMLDivElement> }) {
  return (
    <div
      key={`leader-board-infinity-query-skelton`}
      className="flex w-full animate-pulse items-center gap-2"
      ref={ref}
    >
      <div className="h-12 w-12 rounded-full bg-gray-800"></div>
      <div className="flex w-full items-center justify-between">
        <div>
          <div className="flex w-fit items-center rounded-2xl bg-gray-800 px-2.5 py-1 text-xs font-medium">
            <div className="h-4 w-6 rounded bg-gray-800"></div>
          </div>
          <div className="mt-2 h-4 w-20 rounded bg-gray-800"></div>
        </div>
        <div className="h-4 w-10 rounded bg-gray-800"></div>
      </div>
    </div>
  )
}
