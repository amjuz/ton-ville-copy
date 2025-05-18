'use server'

import { getServerClient } from '@/lib/supabase/server'

export async function updateUsername(username: string) {
  //@TODO: need to do username validation here
  const supabase = await getServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User fetch error:', userError?.message)
    return
  }

  const { error } = await supabase.from('profile').update({ username }).eq('id', user.id)

  if (error) {
    console.error('Failed to update username:', error.message)
  } else {
    console.log('Username updated to:', username)
  }
}
