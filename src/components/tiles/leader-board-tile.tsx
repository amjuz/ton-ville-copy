import React, { LegacyRef } from 'react'
import Avatar from '../Elements/avatar'
import { cn } from '@/lib/utils/cn'

type ILeaderboardTile = {
  userName: string
  rank: number
  gems: number
  ref?: LegacyRef<HTMLDivElement>
  className?: string
}

export default function LeaderboardTile({
  ref,
  gems,
  rank,
  userName,
  className,
}: ILeaderboardTile) {
  return (
    <div className="px-2" ref={ref}>
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-xl bg-muted px-2 py-3',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-sm font-bold">
            {rank}
          </div>
          <div className="flex items-center gap-2">
            <Avatar AvtImageClassName="w-10 h-10" />
            <div>
              <p className="text-sm font-medium">{userName}</p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-muted-foreground">{gems}</p>
        </div>
      </div>
    </div>
  )
}
