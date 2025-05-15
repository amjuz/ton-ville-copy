import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export type TSupabaseClient = SupabaseClient<Database>
