import { parse } from '@telegram-apps/init-data-node'
import { GenerateInviteOrMagiclinkParams, UserMetadata } from '@supabase/auth-js/src/lib/types'
import { generateEmailByTelegramId } from '@/lib/utils/telegram'

/**
 * The authentication credentials required for user authentication on Supabase from the Telegram init data.
 *
 * @type {UserMetadata} - The user metadata interface.
 * @property {number} options.data.telegram_id - Mandatory Telegram ID of the user.
 * @property {string} options.data.first_name - Mandatory first name of the user.
 * @property {string|undefined} options.data.last_name - Optional last name of the user.
 * @property {string|undefined} options.data.username - Optional username of the user.
 * @property {string|undefined} options.data.photo_url - Optional photo URL of the user.
 */
export type AuthUserMetadata = UserMetadata & {
  telegram_id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  referral_code?: string
}

export type AuthCreds = Omit<GenerateInviteOrMagiclinkParams, 'options'> & {
  options: { data: AuthUserMetadata }
}

/**
 * Generates the authentication credentials required for user authentication
 * on Supabase from the Telegram init data.
 *
 * @param {string} initDataRaw - The raw init data from Telegram in query string format.
 * @returns {AuthCreds} - The authentication credentials.
 */
export function getAuthCreds(initDataRaw: string): AuthCreds {
  /** Parse Telegram data */
  const { user, startParam: referral_code } = parse(initDataRaw)
  if (!user?.id) {
    throw new Error('Init data is missing Telegram ID')
  }

  /** Prepare user data */
  const {
    id: telegram_id,
    firstName: first_name,
    lastName: last_name,
    username,
    photoUrl: photo_url,
  } = user

  /** Generate email */
  const email = generateEmailByTelegramId(telegram_id)
  const data: AuthUserMetadata = {
    telegram_id,
    first_name,
    last_name,
    username,
    photo_url,
    referral_code: referral_code === 'debug' ? undefined : referral_code,
  }

  return {
    email,
    type: 'magiclink',
    options: {
      data,
    },
  }
}
