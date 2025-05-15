import { expect, test } from '@test/api/gems/__fixtures__/setup'
import { assertData } from '@test/utils/assertions/data.assertions'
import { assertUser } from '@test/utils/assertions/auth.assertions'
import { getActivityGems } from '@test/utils/helpers/gems.data'

test.describe('Profile Gems Operations', () => {
  test('new user should start with 0 gems', async ({ sessionClient }) => {
    const { data: userData, error: authError } = await sessionClient.auth.getUser()
    expect(authError).toBeNull()
    const user = assertUser(userData)

    // Check profile gems with user client
    const { data: profile, error: profileError } = await sessionClient
      .from('profiles')
      .select('gems')
      .eq('id', user.id)
      .single()

    expect(profileError).toBeNull()
    expect(profile?.gems).toBe(0)
  })

  test('profile gems should update after claiming task', async ({ sessionClient }) => {
    const { data: userData, error: authError } = await sessionClient.auth.getUser()
    expect(authError).toBeNull()
    const user = assertUser(userData)

    // Get expected gems amount
    const dailyTask1Gems = await getActivityGems('daily_task_1')

    // Claim task with user client
    const { error: claimError } = await sessionClient.rpc('claim_active_daily_task')
    expect(claimError).toBeNull()

    // Verify profile gems with user client
    const { data: profile, error: profileError } = await sessionClient
      .from('profiles')
      .select('gems')
      .eq('id', user.id)
      .single()

    expect(profileError).toBeNull()
    expect(profile?.gems).toBe(dailyTask1Gems)
  })

  test('profile gems should update after multiple transactions', async ({ sessionClient }) => {
    const { data: userData, error: authError } = await sessionClient.auth.getUser()
    expect(authError).toBeNull()
    const user = assertUser(userData)

    // Get expected gems amounts
    const dailyTask1Gems = await getActivityGems('daily_task_1')
    const easterEggGems = await getActivityGems('easter_egg')
    const expectedTotal = dailyTask1Gems + easterEggGems

    // Claim multiple rewards with user client
    const { error: claimDailyError } = await sessionClient.rpc('claim_active_daily_task')
    expect(claimDailyError).toBeNull()

    const { error: claimEasterError } = await sessionClient.rpc('claim_easter_egg')
    expect(claimEasterError).toBeNull()

    // Verify profile gems with user client
    const { data: profile, error: profileError } = await sessionClient
      .from('profiles')
      .select('gems')
      .eq('id', user.id)
      .single()

    expect(profileError).toBeNull()
    expect(profile?.gems).toBe(expectedTotal)
  })

  test('profile gems should update after transaction deletion', async ({
    sessionClient,
    baseClient,
  }) => {
    const { data: userData, error: authError } = await sessionClient.auth.getUser()
    expect(authError).toBeNull()
    const user = assertUser(userData)

    // Get expected gems amount
    const dailyTask1Gems = await getActivityGems('daily_task_1')

    // Claim task with user client
    const { error: claimError } = await sessionClient.rpc('claim_active_daily_task')
    expect(claimError).toBeNull()

    // Verify initial state with user client
    const { data: profileBefore } = await sessionClient
      .from('profiles')
      .select('gems')
      .eq('id', user.id)
      .single()
    expect(profileBefore?.gems).toBe(dailyTask1Gems)

    // Get transaction to delete with user client
    const { data: transactions, error: getError } = await sessionClient
      .from('gem_transactions')
      .select()
      .eq('user_id', user.id)
    expect(getError).toBeNull()
    const transaction = assertData(transactions)[0]

    // Delete transaction using server client without session
    const { error: deleteError } = await baseClient
      .from('gem_transactions')
      .delete()
      .eq('id', transaction.id)
    expect(deleteError).toBeNull()

    // Verify transaction was deleted with user client
    const { data: transactionsAfter } = await sessionClient
      .from('gem_transactions')
      .select()
      .eq('user_id', user.id)
    expect(transactionsAfter).toHaveLength(0)

    // Verify profile gems with user client
    const { data: profileAfter } = await sessionClient
      .from('profiles')
      .select('gems')
      .eq('id', user.id)
      .single()
    expect(profileAfter?.gems).toBe(0)
  })
})
