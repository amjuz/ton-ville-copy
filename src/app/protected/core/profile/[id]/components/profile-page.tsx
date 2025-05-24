'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ProfilePicture from '@/assets/images/mock/Animi_Profile_Icon.jpeg'
import Avatar from '@/components/Elements/avatar'
import PolygonStar from '@/components/Icons/polygonStar'
import VerifiedIcon from '@/components/Icons/VerifiedIcon'
import CreateTribeWrapper from '@/components/tribes/create-tribe-wrapper'
import ShowUsersTribeCard from '@/components/tribes/show-users-tribe-card'
import ProfileButtonWrapper from '@/containers/wrappers/buttons/profile-button-wrapper'
import ProfileButtonWrapperThirdParty from '@/containers/wrappers/buttons/profile-button-wrapper-third-party'
import FollowGemWrapper from '@/containers/wrappers/profile/follow-gem-wrapper'
import {
  fetchUserProfile,
  fetchUserSkills,
  fetchUserTribeCount,
  getUserSession,
} from '@/lib/supabase/profile/user'
import SetUsername from './set-username'
import ProfilePageSkelton from '@/components/skelton/profile-page-skelton'
import { ErrorDisplay } from '@/components/error/error-display'
import ErrorPage from '@/app/error'
import ErrorPageDisplay from '@/components/error/error-page-display'

export default function ProfilePage({ userId }: { userId: string }) {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({ queryKey: ['profile-page', userId], queryFn: () => fetchUserProfile(userId) })

  const {
    data: skills,
    // isLoading: skillsLoading,
    // error: skillsError,
  } = useQuery({ queryKey: ['skills', userId], queryFn: () => fetchUserSkills(userId) })

  const {
    data: tribeCount,
    // isLoading: tribeLoading,
    // error: tribeError,
  } = useQuery({
    queryKey: ['tribes-profile-page', userId],
    queryFn: () => fetchUserTribeCount(userId),
  })
  if (profileLoading) return <ProfilePageSkelton />
  if (profileError || !profile) return <ErrorPageDisplay message="Failed to load page" />
  // <div>Error loading profile</div>

  const { bio, follower_count, following_count, gems, name, profile_photo, username } = profile
  const hasTribe = tribeCount && tribeCount > 0
  const isAuth = true
  return (
    <main className="mb-12 px-2 sm:px-4">
      <div className="flex items-center justify-center px-12 pt-12">
        <div className="relative h-32 w-32">
          <Avatar src={profile_photo ?? ProfilePicture.src} AvtImageClassName="w-full h-full" />
          <div className="absolute -right-2 top-[10%] flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_#F5A243_0%,_#FF6200_100%)]">
            <div className="flex items-center justify-center gap-1 px-1 py-1">
              <PolygonStar />
              <p className="text-sm font-medium leading-none">34</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-1">
          <h3 className="text-xl font-bold tracking-tight">{name ?? '-'}</h3>
          <VerifiedIcon />
        </div>
        <div className="m-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          @
          {username ? <p className="text-sm text-muted-foreground">{username}</p> : <SetUsername />}
        </div>
        <div className="mt-2">
          <p className="max-w-sm text-center text-sm sm:max-w-md sm:text-base">{bio}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {skills &&
            skills.map((item, i) => (
              <div key={`${item.id}-${i}-tag-mock`} className="rounded-2xl bg-muted px-3 py-1">
                <p className="text-sm text-muted-foreground">{item.skill}</p>
              </div>
            ))}
        </div>
        {/* <FollowGemWrapper
          gems={gems ?? 0}
          followers={follower_count ?? 0}
          following={following_count ?? 0}
        /> */}
        {isAuth ? <ProfileButtonWrapper userId={userId} /> : <ProfileButtonWrapperThirdParty />}
        <ShowUsersTribeCard userId={userId} />
        <CreateTribeWrapper />
      </div>
    </main>
  )
}
