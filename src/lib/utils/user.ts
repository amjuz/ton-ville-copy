'use server'

import { getServerClient } from '../supabase/server'

export const getUser = async () => {
  const supabase = await getServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) throw new Error('Invalid session')
  return user
}

export const fetchUserProfileForEdit = async (userId: string) => {
  const supabase = await getServerClient()
  const { data, error } = await (await supabase)
    .from('profile')
    .select('name, bio, profile_photo')
    .eq('id', userId)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export const fetchUserSkills = async (userId: string) => {
  const supabase = await getServerClient()
  const { data, error } = await supabase.from('skills').select('*').eq('id', userId)

  if (error) throw new Error(error.message)
  return data
}
