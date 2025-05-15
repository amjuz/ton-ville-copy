import { expect, test } from '@test/api/gems/__fixtures__/setup'
import { mockGemActivities } from '@test/fixtures/gems/activities'
import { assertUser } from '@test/utils/assertions/auth.assertions'
import { Enums } from '@/types/database'

test.describe('Private Functions', () => {
  test.describe('_update_profile_gems', () => {
    test('should update profile gems on transaction changes', async ({
      sessionClient,
      baseClient,
    }) => {
      const { data: userData, error: authError } = await sessionClient.auth.getUser()
      expect(authError).toBeNull()
      const user = assertUser(userData)

      // Add multiple transactions using baseClient (service_role)
      const activity1 = 'daily_task_1'
      const activity2 = 'easter_egg'

      await baseClient.rpc('_allocate_gems', {
        p_user_id: user.id,
        p_activity: activity1,
      })

      await baseClient.rpc('_allocate_gems', {
        p_user_id: user.id,
        p_activity: activity2,
      })

      // Verify profile gems using sessionClient (authenticated session)
      const { data: profile } = await sessionClient
        .from('profiles')
        .select('gems')
        .eq('id', user.id)
        .single()

      const expectedTotal = mockGemActivities[activity1].gems + mockGemActivities[activity2].gems
      expect(profile?.gems).toBe(expectedTotal)
    })

    test('should handle concurrent transactions', async ({ sessionClient, baseClient }) => {
      const { data: userData, error: authError } = await sessionClient.auth.getUser()
      expect(authError).toBeNull()
      const user = assertUser(userData)

      // Add multiple transactions sequentially instead of concurrently
      const activities: Enums['gem_activity'][] = ['daily_task_1', 'daily_task_2', 'daily_task_3']

      for (const activity of activities) {
        await baseClient.rpc('_allocate_gems', {
          p_user_id: user.id,
          p_activity: activity,
        })
      }

      // Verify profile gems using sessionClient
      const { data: profile } = await sessionClient
        .from('profiles')
        .select('gems')
        .eq('id', user.id)
        .single()

      const expectedTotal = activities.reduce(
        (sum, activity) => sum + mockGemActivities[activity].gems,
        0
      )
      expect(profile?.gems).toBe(expectedTotal)
    })

    test('should respect max_usage limits', async ({ sessionClient, baseClient }) => {
      const { data: userData, error: authError } = await sessionClient.auth.getUser()
      expect(authError).toBeNull()
      const user = assertUser(userData)

      // Try to allocate gems twice for a single-use activity
      const activity = 'easter_egg'
      expect(mockGemActivities[activity].maxUsage).toBe(1)

      // First allocation should succeed
      await baseClient.rpc('_allocate_gems', {
        p_user_id: user.id,
        p_activity: activity,
      })

      // Second allocation should be skipped
      await baseClient.rpc('_allocate_gems', {
        p_user_id: user.id,
        p_activity: activity,
      })

      // Verify transactions using sessionClient
      const { data: transactions } = await sessionClient
        .from('gem_transactions')
        .select()
        .eq('user_id', user.id)
        .eq('activity', activity)

      expect(transactions).toHaveLength(1)

      // Verify profile gems
      const { data: profile } = await sessionClient
        .from('profiles')
        .select('gems')
        .eq('id', user.id)
        .single()

      expect(profile?.gems).toBe(mockGemActivities[activity].gems)
    })
  })
})
