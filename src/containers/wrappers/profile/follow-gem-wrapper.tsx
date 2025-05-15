import React from 'react'
import GemYellow from '@/components/Icons/GemYellow'
import FollowGem from '@/components/profile/follow-gem'
import { cn } from '@/lib/utils/cn'
type TFollowGemWrapper = {
  gems: number
}
export default function FollowGemWrapper({ gems }: TFollowGemWrapper) {
  /**
   * @TODO addin suspense and loading state for this.
   */
  return <FollowGem gems={gems} />
}
