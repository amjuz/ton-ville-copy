import { defineConfig, devices } from '@playwright/test'
import path from 'path'

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  // Test directory and match pattern
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // Run tests in files in parallel - disabled for Supabase operations
  fullyParallel: false,
  workers: 1,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: process.env.CI ? 'github' : [['html', { open: 'never' }]],

  // Shared settings for all the projects below
  use: {
    // Base URL for navigation
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Record video only when retrying a test for the first time
    video: 'on-first-retry',

    // Viewport size matches common mobile devices
    viewport: { width: 390, height: 844 },

    // Device scale factor for retina displays
    deviceScaleFactor: 2,
  },

  // Configure projects for different test types
  projects: [
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
        // Force portrait mode for Telegram Mini App
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'API Testing',
      testMatch: 'tests/api/**/*.spec.ts',
      use: {
        // Use headless browser for API tests
        browserName: 'chromium',
        headless: true,
      },
    },
  ],

  // Local development server
  webServer: process.env.CI
    ? undefined
    : {
        command: 'next dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000, // 120 seconds
      },

  // Directory for test artifacts
  outputDir: 'test-results',

  // Global timeout for tests
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined, // 1 hour for CI

  // Global setup
  globalSetup: path.join(__dirname, 'tests/global-setup.ts'),

  // Global teardown
  globalTeardown: path.join(__dirname, 'tests/global-teardown.ts'),
})
