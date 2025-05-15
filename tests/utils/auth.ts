import { AuthError, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { createTestClient } from '@test/utils/client'

/**
 * Stores the ID of the last processed Telegram message.
 *
 * This variable is initialized with the current timestamp to ensure
 * that it has a unique value when the application starts.
 *
 * @type {number}
 */
let lastTelegramId: number = Date.now()

/**
 * Creates a test session by generating a magic link for a new user and verifying it.
 * The user's telegram_id and first_name are added as custom data fields.
 *
 * @return {Promise<Object>} A promise that resolves to an object containing the verified user and the Supabase client.
 * @throws {AuthError} If there is any error during the link generation or OTP verification process.
 */
async function createTestSession() {
  lastTelegramId += 1
  const telegram_id = lastTelegramId
  const email = `telegram.${telegram_id}@test.com`
  const first_name = 'Test'
  const supabase = createTestClient()

  const {
    data: { user: generateLinkUser, properties },
    error: generateLinkError,
  } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      data: { telegram_id, first_name },
    },
  })

  if (generateLinkError) throw generateLinkError
  if (!generateLinkUser) throw new AuthError('User not found!', 500, 'unexpected_failure')
  if (!generateLinkUser.email) throw new AuthError('User has no email!', 500, 'unexpected_failure')
  if (!properties) throw new AuthError('OTP auth failed!', 500, 'unexpected_failure')

  const { verification_type, email_otp } = properties
  if (verification_type !== 'magiclink' && verification_type !== 'signup') {
    throw new AuthError('Invalid OTP type!', 500, 'unexpected_failure')
  }

  const {
    data: { user: verifyOtpUser },
    error: verifyOtpError,
  } = await supabase.auth.verifyOtp({
    email,
    token: email_otp,
    type: verification_type,
  })

  if (verifyOtpError) throw verifyOtpError
  if (!verifyOtpUser) throw new AuthError('User not found!', 500, 'unexpected_failure')
  if (generateLinkUser.id !== verifyOtpUser.id) {
    throw new AuthError('User ID mismatch!', 500, 'unexpected_failure')
  }

  return { user: verifyOtpUser, supabase }
}

/**
 * Creates a list of test sessions.
 *
 * @param {number} sessionCount - The number of test sessions to create.
 * @return {Promise<Array>} A promise that resolves to an array of created test sessions.
 */
export function createTestSessionList(sessionCount: number) {
  return Promise.all(
    Array(sessionCount)
      .fill(null)
      .map(async (_) => {
        return createTestSession()
      })
  )
}

/**
 * Signs out the current user from the Supabase session.
 *
 * @param {object} session - The session object containing the Supabase client.
 * @param {SupabaseClient<Database>} session.supabase - The Supabase client instance to use for signing out.
 *
 * @return {Promise<void>} A promise that resolves when the sign-out process is complete.
 */
async function signOut(session: { supabase: SupabaseClient<Database> }) {
  await session.supabase.auth.signOut()
}

/**
 * Signs out all active sessions provided in the sessions array.
 *
 * @param {Object[]} sessions - The array of session objects to be signed out.
 * @param {SupabaseClient<Database>} sessions[].supabase - The Supabase client instance associated with each session.
 * @return {Promise<unknown[]>} A promise that resolves when all sessions have been signed out.
 */
export function signOutAll(sessions: { supabase: SupabaseClient<Database> }[]) {
  return Promise.all(sessions.map(({ supabase }) => signOut({ supabase })))
}
