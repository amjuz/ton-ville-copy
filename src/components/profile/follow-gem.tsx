import React from 'react'
import { cn } from '@/lib/utils/cn'
import GemYellow from '../Icons/GemYellow'

type TFollowGem = {
  gems: number
}

export default async function FollowGem({ gems }: TFollowGem) {
  return (
    <div className="mt-8 flex items-center justify-around gap-4">
      <div className="flex flex-col items-center justify-center">
        <div className={cn('flex items-start gap-1')}>
          <div className={cn('h-4 w-4 pt-0.5')}>
            <GemYellow />
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* add in the Number formatter */}
            <p className="text-xl font-bold leading-none sm:text-2xl">{gems}</p>
            <p className="text-sm text-muted-foreground">Gems</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* add in the Number formatter */}
        <p className="text-xl font-bold leading-none sm:text-2xl">250</p>
        <p className="text-sm text-muted-foreground">Following</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* add in the Number formatter */}
        <p className="text-xl font-bold leading-none sm:text-2xl">1,236</p>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>
    </div>
  )
}
