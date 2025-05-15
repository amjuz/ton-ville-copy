import { test as base } from '@playwright/test'
import { cleanupTestData } from '@test/utils/database'

export type BaseFixtures = {
  /**
   * Cleans database before and after each test.
   */
  cleanTestData: void
}

export const test = base.extend<BaseFixtures>({
  cleanTestData: async ({}, use) => {
    await cleanupTestData()
    await use()
    await cleanupTestData()
  },
})

export { expect } from '@playwright/test'
