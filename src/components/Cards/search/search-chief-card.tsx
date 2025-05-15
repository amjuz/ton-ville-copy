import React from 'react'
import Avatar from '@/components/Elements/avatar'
import FollowerCard from './follower-card'
import SkillCards from './skill-card'

// @Amjad need to refactor types for this component
export type TSearchChiefCard = {
  type: 'Skill' | 'Profile'
  id?: number
  userName?: string
  nickName?: string
  followers?: number
  following?: number
  profilePic?: string
  skills?: string[]
}

export default function SearchChiefCard({
  type,
  userName,
  nickName,
  followers,
  following,
  profilePic,
  skills,
}: TSearchChiefCard) {
  return (
    <div className="flex w-full gap-4 overflow-hidden rounded-xl py-2 hover:bg-muted-foreground/5">
      <Avatar src={profilePic} AvtImageClassName="w-16 h-16" />
      <div className="w-full">
        <h3 className="text-sm font-medium leading-4">{userName}</h3>
        <p className="text-sm text-muted-foreground">@{nickName}</p>
        <div className="">
          {type === 'Profile' ? (
            <FollowerCard followers={followers} following={following} />
          ) : (
            <SkillCards skills={skills} />
          )}
        </div>
      </div>
    </div>
  )
}

export function SkeltonSearchChiefCard() {
  return (
    <div className="flex w-full gap-4 overflow-hidden rounded-xl py-2 hover:bg-muted-foreground/5">
      {/* Avatar skeleton */}
      <div className="h-16 w-16 animate-pulse rounded-full bg-slate-200" />

      <div className="w-full">
        {/* Username skeleton */}
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

        {/* Nickname skeleton */}
        <div className="mt-1 h-4 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  )
}
