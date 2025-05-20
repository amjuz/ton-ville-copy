import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FormatNumber } from '@test/utils/utils'
import { cn } from '@/lib/utils/cn'

// import { cn } from '@/lib/utils/cn'

type THeroCollectionCard = {
  title: string
  IconHolder: ReactNode
  SideIcon: ReactNode
  url?: 'earn' | 'leaderboard'
}
export default function HeroCollectionCard({
  title,
  IconHolder,
  SideIcon,
  url = 'earn',
}: THeroCollectionCard) {
  return (
    <div className="relative flex w-full flex-col justify-center rounded-2xl bg-muted/40 p-4 sm:p-6">
      <Link className="absolute h-full w-full" href={`/protected/core/${url}`} />
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-nowrap text-xs text-muted-foreground">{title}</h4>
          {IconHolder}
        </div>
        <div className="">{SideIcon}</div>
      </div>
    </div>
  )
}

type THeroCollectionScoreCard = {
  IconHolder: React.ReactNode
  IconClassname?: string
  containerClassName?: string
  Score: number
}
export function HeroCollectionScoreCard({
  IconHolder,
  IconClassname,
  containerClassName,
  Score,
}: THeroCollectionScoreCard) {
  const formattedScore = FormatNumber(Score)
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      <div className={cn('h-4 w-4', IconClassname)}>{IconHolder}</div>
      <p className="text-xl font-bold sm:text-2xl">{formattedScore}</p>
    </div>
  )
}
