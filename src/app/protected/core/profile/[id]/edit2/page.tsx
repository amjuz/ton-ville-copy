'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ImageUploadComponent from './components/image-upload-component'
import UpdateProfileForm from './components/update-profile-form'
import { fetchUserProfileForEdit } from '@/lib/utils/user'
import { fetchUserSkills } from '@/lib/profile/user'
import { useAppSelector } from '@/hooks/reduxHooks'

export default function ProfileEditPage() {
  const userId = useAppSelector((state) => state.profile.userId)

  // const [userId, setUserId] = useState<string | null>(null)
  // const { userId } = useProfile()
  // useEffect(() => {
  //   async function handleUser() {
  //     await getUser()
  //       .then((user) => setUserId(user.id))
  //       .catch((err) => {
  //         console.error('Auth error:', err.message)
  //       })
  //     await handleUser()
  //   }
  // }, [getUser, setUserId])

  const {
    data: profileData,
    isLoading: loadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => fetchUserProfileForEdit(userId ?? ''),
    enabled: !!userId,
  })

  const {
    data: skills,
    isLoading: loadingSkills,
    error: skillsError,
  } = useQuery({
    queryKey: ['user-skills', userId],
    queryFn: () => fetchUserSkills(userId ?? ''),
    enabled: !!userId,
  })

  if (!userId || loadingProfile || loadingSkills) {
    return <div className="p-4">Loading profile...</div>
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
