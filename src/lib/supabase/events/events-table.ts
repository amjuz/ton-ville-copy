'use server'

import { getServerClient } from '../server'

export async function createEvents({
  date,
  eventPhoto,
  genre,
  location,
  summary,
  title,
  tribesId,
}: {
  tribesId: string
  date: string
  eventPhoto: string
  genre: string
  location: string
  summary: string
  title: string
}) {
  const supabase = await getServerClient()

  const { data: eventsData, error: eventInsertError } = await supabase
    .from('events')
    .insert({ date, eventPhoto, genre, location, summary, title })
    .select('id')
    .single()
  if (eventInsertError)
    throw new Error('Failed to create quests', { cause: eventInsertError.message })

  const { data, error: junctionTableError } = await supabase
    .from('tribes_events')
    .insert({ events_id: eventsData.id, tribe_id: tribesId })
  if (junctionTableError)
    throw new Error('Failed to create junction table', { cause: junctionTableError.cause })

  return data
}
