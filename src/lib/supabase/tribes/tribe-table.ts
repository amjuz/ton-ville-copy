'use server'

import { TTribesValidator } from '@/lib/validators/forms'
import { getServerClient } from '../server'
import { getUser } from '@/lib/utils/user'

export async function updateTwitterId(twitterId: string, tribeId: string) {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('tribes')
    .update({ twitter_id: twitterId })
    .eq('id', tribeId)
  if (error) throw new Error(error.message)
  return data
}

export async function createTribes({
  author,
  tribeCoverPhoto,
  tribeName,
  tribeProfilePhoto,
}: TTribesValidator) {
  const supabase = await getServerClient()
  const { id } = await getUser()
  console.log('id:', id)

  const { error: tribeError, data: tribeData } = await supabase
    .from('tribes')
    .insert({
      author,
      tribe_cover_photo: tribeCoverPhoto,
      tribe_photo: tribeProfilePhoto,
      tribe_name: tribeName,
    })
    .eq('author_id', id)
    .select('id')
    .single()

  if (tribeError) throw new Error('Tribes creation failed')
  const { error, data } = await supabase
    .from('tribe_profiles')
    .insert({ tribe_id: tribeData.id, profile_id: id })

  if (error) throw new Error('Failed to create junction table')
  return data
}
