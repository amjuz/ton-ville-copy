import { expect, test } from '@test/api/gems/__fixtures__/setup'
import { assertData } from '@test/utils/assertions/data.assertions'
import { mockGemActivities } from '@test/fixtures/gems/activities'

test.describe('Activity Gems Configuration', () => {
  test('should have all essential activities configured', async ({ sessionClient }) => {
    // Get all configured activities
    const { data: activityGems, error } = await sessionClient
      .from('activity_gems')
      .select('activity, gems, max_usage')

    expect(error).toBeNull()
    const activities = assertData(activityGems)

    // Convert mock data to expected format
    const expectedActivities = Object.entries(mockGemActivities).map(([activity, config]) => ({
      activity,
      gems: config.gems,
      max_usage: config.maxUsage ?? null,
    }))

    // Verify all expected activities exist
    expect(activities).toHaveLength(expectedActivities.length)

    // Sort both arrays by activity for consistent comparison
    const sortedActivities = [...activities].sort((a, b) => a.activity.localeCompare(b.activity))
    const sortedExpected = [...expectedActivities].sort((a, b) =>
      a.activity.localeCompare(b.activity)
    )

    // Verify each activity's configuration
    sortedExpected.forEach((expected, index) => {
      const actual = sortedActivities[index]
      expect(actual).toMatchObject(expected)
    })
  })

  test('should have valid gem amounts', async ({ sessionClient }) => {
    const { data: activityGems, error } = await sessionClient
      .from('activity_gems')
      .select('activity, gems')

    expect(error).toBeNull()
    const activities = assertData(activityGems)

    // Verify against fixture data
    activities.forEach((activity) => {
      const expectedGems = mockGemActivities[activity.activity].gems
      expect(activity.gems).toBe(expectedGems)
      expect(activity.gems).toBeGreaterThan(0)
    })
  })

  test('should have valid max_usage values', async ({ sessionClient }) => {
    const { data: activityGems, error } = await sessionClient
      .from('activity_gems')
      .select('activity, max_usage')

    expect(error).toBeNull()
    const activities = assertData(activityGems)

    // Verify against fixture data
    activities.forEach((activity) => {
      const expectedMaxUsage = mockGemActivities[activity.activity].maxUsage ?? null
      expect(activity.max_usage).toBe(expectedMaxUsage)
      if (activity.max_usage !== null) {
        expect(activity.max_usage).toBeGreaterThan(0)
      }
    })
  })
})
