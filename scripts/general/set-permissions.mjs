import { execSync } from 'node:child_process'

/**
 * Checks if the current environment is a production environment
 * @param {NodeJS.ProcessEnv} env
 * @returns {boolean}
 */
const isProductionEnvironment = (env) => {
  return Boolean(env.CI || env.NODE_ENV === 'production' || env.VERCEL)
}

/**
 * Sets execute permissions for shell scripts and husky hooks
 * @throws {Error} If permission setting fails
 */
const setPermissions = () => {
  try {
    execSync('chmod +x scripts/**/*.sh && chmod +x .husky/*', {
      stdio: 'inherit',
    })
  } catch (error) {
    console.error(
      'Failed to set permissions:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

if (!isProductionEnvironment(process.env)) {
  console.log('Setting permissions for development environment...')
  setPermissions()
} else {
  console.log('Skipping permissions in CI/Production')
}
