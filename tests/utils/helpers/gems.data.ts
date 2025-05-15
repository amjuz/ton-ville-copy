import { assertData } from '@test/utils/assertions/supabase.assertions'
import { createTestClient } from '@test/utils/client'

/**
 * Fetches gems associated with a specific activity from the database.
 *
 * @param {string} activity - The activity for which gems are being fetched.
 * @return {Promise<number>} - A promise that resolves to an object containing the gems for the specified activity.
 * @throws Will throw an error if there is an issue fetching data from the database.
 */
export async function getActivityGems(activity: string) {
  const supabase = await createTestClient()
  const { data: activityGemsData, error: activityGemsError } = await supabase
    .from('activity_gems')
    .select()
    .eq('activity', activity)

  if (activityGemsError) throw activityGemsError
  const gemsData = assertData(activityGemsData)[0]
  const { gems } = gemsData
  return gems
}
