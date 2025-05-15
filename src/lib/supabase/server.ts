import { createServerClient } from '@supabase/ssr'
import { cookies as NextCookies } from 'next/headers'
import { type Database } from '@/types/database'

/**
 * Asynchronous function to initialize and return a Supabase client instance
 * configured with service-role access for server-side operations.
 *
 * @returns {Promise<SupabaseClient>} A promise that resolves to a Supabase client instance.
 *
 * The client is initialized with the Supabase URL and service role key
 * from environment variables. It also sets up cookie management functions to
 * get and set cookies using the provided cookie store.
 *
 * @throws {Promise<Error>} If there is an issue with setting cookies, an error is logged to the console.
 */
export const getServerClient = async () => {
  const cookies = await NextCookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name) => {
          const data = cookies.get(name)?.value
          return data
        },
        remove: (name) => {
          cookies.delete(name)
        },
        set: (name, option) => {
          try {
            cookies.set(name, option)
          } catch (error) {}
        },
      },
      cookieOptions: {
        secure: process.env.NODE_ENV !== 'development',
      },
    }
  )
}
