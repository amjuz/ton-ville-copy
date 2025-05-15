import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { type Database } from '@/types/database'

/**
 * Create Supabase client with service role access.
 * @returns {SupabaseClient<Database>} A configured Supabase client instance for testing.
 */
export function createTestClient(): SupabaseClient<Database> {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
