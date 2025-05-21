'use server'

import { TTribesValidator } from '@/lib/validators/forms'
import { getServerClient } from '../server'
import { getUser } from '@/lib/utils/user'
import { faker } from '@faker-js/faker'

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
  description,
}: TTribesValidator) {
  const supabase = await getServerClient()
  const { id } = await getUser()

  const gems = faker.number.int({ min: 200, max: 3250, multipleOf: 12 })
  const { error: tribeError, data: tribeData } = await supabase
    .from('tribes')
    .insert({
      author,
      tribe_cover_photo: tribeCoverPhoto,
      tribe_photo: tribeProfilePhoto,
      tribe_name: tribeName,
      description,
      gems: gems,
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

export async function updateTribes({
  tribeId,
  author,
  description,
  tribeCoverPhoto,
  tribeName,
  tribeProfilePhoto,
}: { tribeId: string } & TTribesValidator) {
  const supabase = await getServerClient()
  const { id } = await getUser()

  const { data, error } = await supabase
    .from('tribes')
    .update({
      author,
      tribe_cover_photo: tribeCoverPhoto,
      tribe_photo: tribeProfilePhoto,
      tribe_name: tribeName,
      description,
    })
    .eq('id', tribeId)
    .eq('author_id', id)

  if (error) throw new Error('Failed to update tribes')
  return data
}
