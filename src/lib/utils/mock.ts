import { sign } from '@telegram-apps/init-data-node/web'
import { z } from 'zod'
import { getEnvVariable } from '@/lib/utils/env'

/**
 * A schema for validating user objects in the init data for the Telegram SDK.
 *
 * This schema ensures that the user object adheres to the specified structure and types.
 *
 * Properties:
 * - id: A required unique identifier for the user, represented as a number.
 * - firstName: A required string representing the user's first name.
 * - lastName: An optional string representing the user's last name.
 * - username: An optional string representing the user's username.
 * - photoUrl: An optional string representing the URL to the user's photo.
 */
const userSchema = z
  .object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string().optional(),
    username: z.string().optional(),
    photoUrl: z.string().optional(),
  })
  .strict()

/**
 * signDataSchema is a Zod schema object used for validating unsigned init data.
 *
 * Schema Structure:
 * - user: User schema defined by 'userSchema'.
 * - startParam: Optional string parameter.
 */
const signDataSchema = z
  .object({
    user: userSchema,
    startParam: z.string().optional(),
  })
  .strict()

/**
 * Represents the initial data for a user.
 * This type is inferred from the userSchema using the Zod library.
 *
 * The structure of this type can include various user-related properties
 * defined in the userSchema, such as username, email, id, and other
 * relevant user information.
 *
 * Changes to the underlying userSchema will automatically update this type,
 * ensuring type safety in your TypeScript codebase.
 *
 * This type is useful for representing user data throughout the application,
 * such as initial user profile setup, authentication contexts, and user data
 * validation.
 */
export type InitDataUser = z.infer<typeof userSchema>

/**
 * Represents unsigned initialization data inferred from the signDataSchema.
 *
 * This type is used to define the structure of data required before it is signed.
 */
export type UnSignedInitData = z.infer<typeof signDataSchema> & {
  signature: string
}

/**
 * Generate mock unsigned telegram init data.
 *
 * @param {InitDataUser} initDataUser - User data part of the init data.
 * @param {string} referralCode - The referral code.
 * @returns {UnSignedInitData} - The mock init data.
 */
export function getUnSignedInitDataMock(
  initDataUser?: InitDataUser,
  referralCode?: string
): UnSignedInitData {
  return {
    user: {
      id: 69696969,
      firstName: 'Default',
      lastName: 'Mocker',
      username: 'default.mocker',

      ...initDataUser,
    },
    startParam: referralCode,
    signature: 'abcd',
  }
}

/**
 * Generate signed mock InitDataRaw.
 *
 */
export async function getSignedInitDataRawMock(
  initDataUser?: InitDataUser,
  referralCode?: string
): Promise<string> {
  const initData = getUnSignedInitDataMock(initDataUser, referralCode)
  const botToken = getEnvVariable('BOT_TOKEN')
  return await sign(initData, botToken, new Date())
}
