import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import type { SupabaseFixtures } from '@test/fixtures/supabase.fixtures'
import { test as base } from '@test/fixtures/supabase.fixtures'
import { createTestSessionList, signOutAll } from '@test/utils/auth'

/**
 * A session object that contains a Supabase user and a Supabase client.
 *
 * @property {User} user - The Supabase user object.
 * @property {SupabaseClient<Database>} supabase - The Supabase client.
 */
type session = {
  user: User
  supabase: SupabaseClient<Database>
}

export type SessionFixtures = SupabaseFixtures & {
  /**
   * The number of test sessions to create. Default to `1`.
   */
  count: number
  /**
   * A session object that contains a Supabase user and a Supabase client.
   */
  session: session

  /**
   * A list of session objects that contain Supabase users and their corresponding Supabase clients.
   */
  sessions: session[]
}

export const test = base.extend<SessionFixtures>({
  count: [1, { option: true }], // Default to `1` session.
  sessions: async ({ count }, use) => {
    const sessionList = await createTestSessionList(count)
    await use(sessionList)
    await signOutAll(sessionList)
  },
  session: async ({ sessions }, use) => {
    const session = sessions[0]
    await use(session)
  },
})

export { expect } from '@playwright/test'
