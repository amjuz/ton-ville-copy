import { LegacyRef } from 'react'
import { Skeleton } from '../ui/skeleton'

export function LeaderBoardPageSkelton({
  ref,
  count = 1,
}: {
  ref?: LegacyRef<HTMLDivElement>
  count?: number
}) {
  return Array.from({ length: count }).map((_, i) => (
    <div className="my-2 px-2" ref={ref} key={`leader-board-page-skelton-${i}`}>
      <div className="flex w-full items-center justify-between rounded-xl bg-muted px-2 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-700" />
            </div>
          </div>
        </div>
        <Skeleton className="h-4 w-12 bg-gray-700" />
      </div>
    </div>
  ))
}
