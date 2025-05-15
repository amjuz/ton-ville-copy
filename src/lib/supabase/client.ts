import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/types/database'

/**
 * A function that initializes and returns a Supabase client instance
 * configured with anon access for client-side operations.
 * This function is intended for use in the browser.\
 * The role changes to 'authenticated' when the user logs in.
 *
 * @returns {SupabaseClient<Database>} A configured Supabase client instance for browser use.
 */
export const getBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
