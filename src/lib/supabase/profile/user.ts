'use server'

import { getServerClient } from '../server'

export const getUserSession = async () => {
  const client = await getServerClient()
  const {
    data: { session },
    error,
  } = await client.auth.getSession()

  if (error || !session?.user) {
    throw new Error('User not authenticated')
  }

  return session.user
}

export const fetchUserProfile = async (userId: string) => {
  const client = await getServerClient()
  const { data, error } = await client.from('profile').select('*').eq('id', userId).single()
  if (error) throw new Error(error.message)
  return data
}

export const fetchUserSkills = async (userId: string) => {
  const client = await getServerClient()
  const { data, error } = await client.from('skills').select('*').eq('user_id', userId)
  if (error) throw new Error(error.message)
  return data
}

export const fetchUserTribeCount = async (userId: string) => {
  const client = await getServerClient()
  const { count, error } = await client
    .from('tribes')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', userId)
  if (error) throw new Error(error.message)
  return count
}

export const fetchUsersTribes = async (userId: string) => {
  const supabase = await getServerClient()

  const { data: tribeIdsData, error: tribeIdsError } = await supabase
    .from('tribe_profiles')
    .select('tribe_id')
    .eq('profile_id', userId)

  if (tribeIdsError) throw new Error(tribeIdsError.message)

  const tribeUniqueId = tribeIdsData.map((item) => item.tribe_id)

  if (!tribeUniqueId.length) return null

  const { data: tribeData, error: tribeError } = await supabase
    .from('tribes')
    .select('*')
    .in('id', tribeUniqueId)

  if (tribeError) throw new Error(tribeError.message)
  return tribeData
}

export const fetchUniqueTribe = async (tribeId: string) => {
  const supabase = await getServerClient()
  const { data, error } = await supabase.from('tribes').select('*').eq('id', tribeId).single()
  if (error) {
    console.log('tribes fetch failed:', error)
    throw new Error('Fetch failed tribes data')
  }
  return data
}
