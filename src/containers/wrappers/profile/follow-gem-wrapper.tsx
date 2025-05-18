import React from 'react'
import GemYellow from '@/components/Icons/GemYellow'
import FollowGem from '@/components/profile/follow-gem'
import { cn } from '@/lib/utils/cn'
type TFollowGemWrapper = {
  gems: number
  followers: number
  following: number
}
export default function FollowGemWrapper({ gems, followers, following }: TFollowGemWrapper) {
  /**
   * @TODO addin suspense and loading state for this.
   */
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
        <p className="text-xl font-bold leading-none sm:text-2xl">{following}</p>
        <p className="text-sm text-muted-foreground">Following</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* add in the Number formatter */}
        <p className="text-xl font-bold leading-none sm:text-2xl">{followers}</p>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>
    </div>
  )
  // <FollowGem gems={gems} />
}
