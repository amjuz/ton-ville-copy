'use server'

import { getUserProfileData, getUserSession } from '@/data/dto/user'
import { getServerClient } from '@/lib/supabase/server'

export default async function UpdateBioAction({
  data: { bio, name },
}: {
  data: {
    bio: string
    name?: string
  }
}) {
  try {
    const client = await getServerClient()
    const user = await getUserSession(client)
    if (!user.user?.id) {
      return {
        error: {
          message: 'Invalid session, Please reauthenticate and try again',
        },
        data: null,
      }
    }

    if (typeof bio !== 'string') {
      return { error: { message: 'Not a valid bio' }, data: null }
    }

    const updatedBio = await client.from('profiles').update({ bio, name }).eq('id', user.user?.id)
    console.log(updatedBio)
    if (updatedBio.status !== 204) {
      return {
        error: {
          message: 'Bio is not updated.',
        },
        data: null,
      }
    }
    return {
      error: null,
      data: 'Bio Updated successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Something went wrong Please try again',
      },
      data: null,
    }
  }
}
