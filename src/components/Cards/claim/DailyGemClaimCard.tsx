import React from 'react'
import { CheckGreen } from '@/components/Icons/CheckGreen'
import GemYellow from '@/components/Icons/GemYellow'
import { cn } from '@/lib/utils/cn'
type TDailyGemClaimCard = {
  isToday?: boolean
  isTodayClaimed?: boolean
  isClaimed?: boolean
  isMultiple?: boolean
  GemCount: number | string
  index: number
  isForwarded?: boolean
}
export default function DailyGemClaimCard({
  isToday,
  isTodayClaimed = false,
  isMultiple,
  index,
  isClaimed = false,
  GemCount = 20,
  isForwarded,
}: TDailyGemClaimCard) {
  return (
    <div
      className={cn(
        'flex aspect-square h-28 w-28 flex-col items-center justify-between rounded-xl border-2 bg-muted',
        {
          'border-4 border-blue-600': isToday,
          'cursor-pointer': isToday && !isTodayClaimed,
          'border-4 border-green-500': isTodayClaimed || isClaimed,
          'cursor-not-allowed opacity-50': isForwarded,
        }
      )}
    >
      <h3 className="pt-2 text-sm text-muted-foreground">{isToday ? 'Today' : `Day ${index}`}</h3>
      <div className="flex h-full w-full items-center justify-center pt-1">
        {!isTodayClaimed && !isClaimed ? (
          isMultiple ? (
            <div className="flex h-full w-full items-center justify-center">
              <GemYellow className="relative left-1 z-0 max-h-6 max-w-6" />
              <GemYellow className="z-10 max-h-8 max-w-8" />
              <GemYellow className="relative right-1 z-0 max-h-6 max-w-6" />
            </div>
          ) : (
            <GemYellow className="max-h-8 max-w-8" />
          )
        ) : (
          <div className="flex">
            <CheckGreen className="h-8 w-8" />
          </div>
        )}
      </div>
      <p className="pb-1.5 font-bold">{GemCount}</p>
    </div>
  )
}
