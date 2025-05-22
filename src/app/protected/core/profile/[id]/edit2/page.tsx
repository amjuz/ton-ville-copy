'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ImageUploadComponent from './components/image-upload-component'
import UpdateProfileForm from './components/update-profile-form'
import { fetchUserProfileForEdit } from '@/lib/utils/user'
import { fetchUserSkills } from '@/lib/supabase/profile/user'
import { useAppSelector } from '@/hooks/reduxHooks'
import ImageUploadSkelton from '@/components/skelton/image-upload-skelton'

export default function ProfileEditPage() {
  const userId = useAppSelector((state) => state.profile.userId)
  const {
    data: profileData,
    isLoading: loadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['user-profile-edit', userId],
    queryFn: () => fetchUserProfileForEdit(userId ?? ''),
  })

  const {
    data: skills,
    isLoading: loadingSkills,
    error: skillsError,
  } = useQuery({
    queryKey: ['user-skills', userId],
    queryFn: () => fetchUserSkills(userId ?? ''),
  })

  if (!userId || loadingProfile || loadingSkills || loadingProfile) {
    return <ImageUploadSkelton/>
  }

  if (profileError || skillsError) {
    return <div className="p-4 text-red-500">Failed to load profile. Please try again later.</div>
  }


  return (
    <main className="px-4 pt-2">
      <h1 className="my-5 text-2xl font-bold">Edit Profile</h1>
      <ImageUploadComponent imageUrl={profileData?.profile_photo ?? ''} />
      <UpdateProfileForm bio={profileData?.bio} name={profileData?.name} skills={skills ?? []} />
    </main>
  )
}
