import { expect, test } from '@test/api/gems/__fixtures__/setup'
import { assertData } from '@test/utils/assertions/data.assertions'
import { getActivityGems } from '@test/utils/helpers/gems.data'

test.describe('Daily Tasks API Operations', () => {
  test('new user should have access to daily_task_1', async ({ sessionClient }) => {
    const { error: authError } = await sessionClient.auth.getUser()
    expect(authError).toBeNull()

    const dailyTask1Gems = await getActivityGems('daily_task_1')
    const { data, error } = await sessionClient.rpc('get_active_daily_task')
    const nextTask = assertData(data)[0]
    expect(error).toBeNull()
    expect(nextTask).toMatchObject({
      task: 'daily_task_1',
      is_available: true,
      gems_reward: dailyTask1Gems,
    })
  })
})
