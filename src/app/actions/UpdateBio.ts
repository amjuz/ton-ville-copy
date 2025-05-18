'use server'

import { getUserProfileData, getUserSession } from '@/data/dto/user'
import { getServerClient } from '@/lib/supabase/server'

export default async function UpdateBioAction({
  data: { bio, name, skills },
}: {
  data: {
    bio: string
    name?: string
    skills: {
      skill: string
      sub_skills: string[]
      id: string
    }[]
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

    const [bioUpdateResult, skillsInsertResult] = await Promise.all([
      client.from('profile').update({ bio, name }).eq('id', user.user.id),
      client.from('skills').upsert(skills).eq('user_id', user.user.id),
    ])

    if (bioUpdateResult.error) {
      return {
        error: {
          message: `Failed to update bio: ${bioUpdateResult.error.message}`,
        },
        data: null,
      }
    }

    if (skillsInsertResult.error) {
      // console.log("error:",skillsInsertResult.error);

      return {
        error: {
          message: `Failed to insert skills: ${skillsInsertResult.error.message}`,
        },
        data: null,
      }
    }

    return {
      error: null,
      data: 'Bio Updated successfully',
    }
  } catch (error) {
    // console.log(error)
    return {
      error: {
        message: 'Something went wrong Please try again',
      },
      data: null,
    }
  }
}
