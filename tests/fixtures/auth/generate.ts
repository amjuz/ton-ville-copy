import { getSignedInitDataRawMock, InitDataUser } from '@/lib/utils/mock'
import { getAuthCreds } from '@/lib/auth/get-auth-creds'
import { mockTelegramUsers } from '@test/fixtures/auth/mock-users'

export async function generateTestCreds(initDataUser?: InitDataUser, referralCode?: string) {
  const initDataRaw = await getSignedInitDataRawMock(
    {
      ...mockTelegramUsers.standard, // Use the default values from the mock data
      ...initDataUser, // Override the default values with the provided initDataUser
    },
    referralCode
  )

  return getAuthCreds(initDataRaw)
}
