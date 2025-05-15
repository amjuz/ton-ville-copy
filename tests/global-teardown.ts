import { FullConfig } from '@playwright/test'
import { cleanupTestData } from '@test/utils/database'

async function globalTeardown(config: FullConfig) {
  // Clean up test data
  await cleanupTestData()
}

export default globalTeardown
