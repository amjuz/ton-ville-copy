import { SupabaseClient } from '@supabase/supabase-js'
import { InitDataUser } from '@/lib/utils/mock'
import { generateTestCreds } from '@test/fixtures/auth/generate'
import { handleAuth } from '@/lib/supabase/auth/handle-auth'

/**
 * Creates a session with the provided Supabase client, initial user data, and an optional referral code.
 * On creation of the new user, session is persisted in the client.
 * @see {@link createTestServerClient} to for `auth` params when creating the server client.
 *
 * @param {SupabaseClient} serverClient - The Supabase client with SERVICE_ROLE_KEY.
 * @param {InitDataUser} [initDataUser] - Optional initial user data to use for generating test credentials.
 * @param {string} [referralCode] - Optional referral code to use during the session creation.
 * @return {Promise<SupabaseClient>} The Supabase client with a session.
 */
export async function createSessionClient(
  serverClient: SupabaseClient,
  initDataUser?: InitDataUser,
  referralCode?: string
) {
  const creds = await generateTestCreds(initDataUser, referralCode)
  await handleAuth(serverClient, creds) // Create user and persist session
  return serverClient
}
