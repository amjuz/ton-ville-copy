import { SupabaseClient } from '@supabase/supabase-js'
import type { BaseFixtures } from '@test/fixtures/base.fixtures'
import { test as base } from '@test/fixtures/base.fixtures'
import { Database } from '@/types/database'
import { createTestClient } from '@test/utils/client'

export type SupabaseFixtures = BaseFixtures & {
  /**
   * An instance of SupabaseClient with `service_role` access.
   * Switches to `authenticated` role on sign-in.
   * Reverts to `service_role` role on sign-out.
   *
   * @type {SupabaseClient<Database>}
   */
  supabase: SupabaseClient<Database>
}

export const test = base.extend<SupabaseFixtures>({
  supabase: async ({}, use) => {
    const client = createTestClient()
    await use(client)
  },
})

export { expect } from '@playwright/test'
