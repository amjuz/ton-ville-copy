import { getServerClient } from '@/lib/supabase/server'
import ImageUploadComponent from './components/image-upload-component'
import UpdateProfileForm from './components/update-profile-form'

export default async function ProfileEditPage() {
  const supabase = await getServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.id) {
    return {
      error: {
        message: 'Invalid session, Please reauthenticate and try again',
      },
      data: null,
    }
  }

  const [{ data: profileData, error: profileErr }, { data: skills, error: skillsError }] =
    await Promise.all([
      supabase.from('profile').select('name, bio,profile_photo').eq('id', user.id).single(),
      supabase.from('skills').select('*').eq('id', user.id),
    ])

  if (profileErr || skillsError) {
    console.error('Profile fetch error:', profileErr?.message, skillsError?.message)
    return <div className="p-4 text-red-500">Failed to load profile. Please try again later.</div>
  }

  return (
    <main className="px-4 pt-2">
      <h1 className="my-5 text-2xl font-bold">Edit Profile</h1>
      <ImageUploadComponent imageUrl={profileData?.profile_photo ?? ''} />
      <UpdateProfileForm bio={profileData?.bio} name={profileData?.name} skills={skills} />
    </main>
  )
}
