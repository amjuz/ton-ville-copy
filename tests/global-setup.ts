import { FullConfig } from '@playwright/test'
import { config as dotEnvConfig } from 'dotenv-flow'

async function globalSetup(config: FullConfig) {
  // Load environment variables
  dotEnvConfig()

  // Verify required env variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ]

  const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
        'Please ensure these are set in your .env.local file'
    )
  }
}

export default globalSetup
