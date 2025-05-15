import { AuthError, User } from '@supabase/supabase-js'
import { AuthUserMetadata } from '@/lib/auth/get-auth-creds'

export type AuthData =
  | {
      user: User | null
    }
  | {
      user: null
    }

/**
 * Asserts that auth data contains a valid user and returns user ID
 * Also ensures type safety for auth response data
 */
export function assertUser(authData: AuthData): User {
  if (!authData?.user) throw new AuthError('User is undefined')
  if (!authData.user.id) throw new AuthError('User ID is undefined')

  return authData.user
}

/**
 * Asserts that user metadata exists and has correct type
 */
export function assertUserMetadata(userData: { user: User | null }): AuthUserMetadata {
  if (!userData.user) throw new Error('User is undefined')
  if (!userData.user.user_metadata) throw new Error('User metadata is undefined')
  return userData.user.user_metadata as AuthUserMetadata
}
