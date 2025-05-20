'use server'

import { getServerClient } from '../server'

export async function createQuests({
  description,
  guidelines,
  questImage,
  subTitle,
  title,
  tribesId,
}: {
  tribesId: string
  description: string
  guidelines: string
  questImage: string
  subTitle: string
  title: string
}) {
  const supabase = await getServerClient()

  const { data: questData, error: questInsertError } = await supabase
    .from('quests')
    .insert({ description, guidelines, questImage, subTitle, title })
    .select('id')
    .single()
  if (questInsertError)
    throw new Error('Failed to create quests', { cause: questInsertError.message })

  const { data, error: junctionTableError } = await supabase
    .from('tribes_quests')
    .insert({ quests_id: questData.id, tribes_id: tribesId })
  if (junctionTableError)
    throw new Error('Failed to create junction table', { cause: junctionTableError.cause })

  return data
}
