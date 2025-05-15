import { getServerClient } from '@/lib/supabase/server'
import { TSupabaseClient } from '@/types/app/supabase/Client'

export async function getUserSession(supabaseClient?: TSupabaseClient) {
  const client = supabaseClient ?? (await getServerClient())
  const { data, error } = await client.auth.getUser()

  return { user: data.user, error }
}

export async function getUserProfileData({
  id,
  supabaseClient,
}: {
  supabaseClient?: TSupabaseClient
  id: string
}) {
  const client = supabaseClient ?? (await getServerClient())
  // skills (id, skill, sub_skills),
  const { data, error } = await client
    .from('profiles')
    .select('*, telegrams (id, username), skills (id, skill, sub_skills)')
    .eq('id', id)
    // .eq('skills.user_id', id)
    .single()
  console.log(error)
  return { data, error }
}
