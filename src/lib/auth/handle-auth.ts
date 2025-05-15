import { AuthError, SupabaseClient } from '@supabase/supabase-js'
import { GenerateInviteOrMagiclinkParams } from '@supabase/auth-js/src/lib/types'

/**
 * Passwordless user authentication by generating an email OTP as admin and verifying it as user.
 * If the user does not exist, it will sign up the user automatically.
 *
 * @param {SupabaseClient} serverClient - The Supabase client.
 * @param {AuthCreds} creds - The user creds.
 *
 * @throws {Error} - Throws an error if sign in fails for reasons other than invalid creds or if sign up fails.
 */
export async function handleAuth(
  serverClient: SupabaseClient,
  creds: GenerateInviteOrMagiclinkParams
) {
  /** Generate Email OTP using Admin API (Make sure Server Supabase Client is initiated with `SUPABASE_SERVICE_ROLE_KEY` */
  const {
    data: { properties },
    error: generateLinkError,
  } = await serverClient.auth.admin.generateLink(creds)
  if (generateLinkError) throw generateLinkError
  if (!properties) throw new AuthError('Passwordless-auth failed!', 500, 'unexpected_failure')

  const { email_otp: token, verification_type: type } = properties

  if (type !== 'magiclink' && type !== 'signup') {
    throw new AuthError('Invalid OTP type!', 500, 'unexpected_failure')
  }

  /** Immediately verify the OTP with Auth API to mimic user */
  const {
    data: { user },
    error: verifyOtpError,
  } = await serverClient.auth.verifyOtp({
    ...(creds as { email: string }),
    token,
    type,
  })

  if (verifyOtpError) throw verifyOtpError
  if (!user) throw new AuthError('Passwordless-auth failed!', 500, 'unexpected_failure')
  return { user, type }
}
