'use server'

import { Tables } from '@/types/database'
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

export type TQuestTableExtendsAuthor = Tables['quests']['Row'] & {
  author: Tables['tribes']['Row']['author']
}

export async function getTribeQuests({ tribeId }: { tribeId: string }) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('tribes_quests')
    .select(
      `
      quests (
        id,
        created_at,
        title,
        subTitle,
        description,
        guidelines,
        questImage
      ),
      tribes (
        author
      )
    `
    )
    .eq('tribes_id', tribeId)
    .order('created_at', { ascending: false })

  if (error) throw new Error('Failed to fetch quests with tribe author')

  if (!data?.length) return null

  // Transform to flatten the output (combine quest + author)
  const questsData = data.map(({ quests, tribes }) => ({
    ...quests,
    author: tribes?.author ?? null,
  })) as TQuestTableExtendsAuthor[]

  return questsData
}

export async function getQuest(questId: string) {
  const supabase = await getServerClient()
  const { data, error } = await supabase.from('quests').select('*').eq('id', questId).single()
  if (error) throw new Error('Quest fetch failed')
  return data
}
