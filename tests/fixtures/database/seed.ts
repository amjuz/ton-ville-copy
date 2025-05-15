import { mockGemActivities } from '@test/fixtures/gems/activities'
import { Enums } from '@/types/database'
import { createTestClient } from '@test/utils/client'

export type ActivityConfig = {
  activity: Enums['gem_activity']
  gems: number
  maxUsage?: number | null
}

const defaultActivities: ActivityConfig[] = Object.entries(mockGemActivities).map(
  ([activity, config]) => ({
    activity: activity as ActivityConfig['activity'],
    gems: config.gems,
    maxUsage: config.maxUsage ?? null,
  })
)

export async function seedTestData() {
  const supabase = await createTestClient()

  try {
    // Seed activity gems
    for (const config of defaultActivities) {
      const { error } = await supabase.from('activity_gems').upsert({
        activity: config.activity,
        gems: config.gems,
        max_usage: config.maxUsage,
      })
      if (error) throw error
    }
  } catch (error) {
    console.error('Error seeding test data:', error)
    throw error
  }
}
