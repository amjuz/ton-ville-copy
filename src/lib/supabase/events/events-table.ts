'use server'

import { Tables } from '@/types/database'
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

export type TEventTableExtendsAuthor = Pick<
  Tables['events']['Row'],
  'eventPhoto' | 'title' | 'created_at' | 'genre' | 'id'
> & {
  author: Tables['tribes']['Row']['author']
}

export async function getTribeEvents({ tribeId }: { tribeId: string }) {
  const supabase = await getServerClient()

  // await supabase.from('events').update({date,eventPhoto,genre,id,location,summary,title,created_at})
  const { data, error } = await supabase
    .from('tribes_events')
    .select(
      `
      events (
        eventPhoto,genre,title,created_at,id
      ),
      tribes (
        author
      )
    `
    )
    .eq('tribe_id', tribeId)
    .order('created_at', { ascending: false })

  // console.log("error:",error?.message);

  if (error) throw new Error('Failed to fetch Events with tribe author')

  if (!data?.length) return null

  // Transform to flatten the output (combine Event + author)
  const eventsData = data.map(({ events, tribes }) => ({
    ...events,
    author: tribes?.author ?? null,
  })) as TEventTableExtendsAuthor[]

  return eventsData
}

export async function getEvent(eventId: string) {
  const supabase = await getServerClient()
  const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single()
  if (error) throw new Error('Events fetch failed')
  return data
}

export type TAllEvents = (Pick<Tables['tribes']['Row'], 'author' | 'id'> &
  Tables['events']['Row'])[]
export async function getAllEvent() {
  const supabase = await getServerClient()
  const { data, error } = await supabase.from('tribes_events').select(`
    events(*),
    tribes(id,author)
    `)
  if (error) throw new Error('Events fetch failed')
  const eventsData = data.map(({ events, tribes }) => ({
    ...events,
    tribeId: tribes?.id,
    author: tribes?.author,
  }))
  return eventsData
}
