'use server'

import { z } from 'zod'
import { createServerAction, ZSAError } from 'zsa'
import { getAuthCreds } from '@/lib/auth/get-auth-creds'
import { validateInitData } from '@/lib/auth/validate-init-data'
import { getServerClient } from '@/lib/supabase/server'
import { handleAuth } from '@/lib/auth/handle-auth'

const initDataRawSchema = z.object({
  initDataRaw: z.string(),
})

/**
 * Handles the authentication action by validating Telegram data, generating credentials, and performing sign in/up.
 *
 * @param {string} input.initDataRaw - The raw initialization data from Telegram.
 * @returns {Promise<void>} - Returns nothing.
 * @throws {Error} - Throws an error if the authentication fails.
 */

export const authAction = createServerAction()
  .input(initDataRawSchema)
  .handler(async ({ input }) => {
    try {
      const { initDataRaw } = input
      /** Validate Telegram data */

      if (!validateInitData(initDataRaw)) throw new Error('Invalid initialization data')
      /** Generate auth creds */

      const creds = getAuthCreds(initDataRaw)
      /** Execute Authentication with Supabase server client */
      const supabase = await getServerClient()

      const { user, type } = await handleAuth(supabase, creds)
      console.log(`[AUTH] ${user.email} logged in!`)

      return type
    } catch (error: unknown) {
      console.log('ERROR', error)
      throw new ZSAError('ERROR', error instanceof Error ? error.message : 'Authentication error')
    }
  })
