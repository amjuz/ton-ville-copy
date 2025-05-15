import { createTestClient } from '@test/utils/client'

/**
 * Cleans up test data from the database.
 * Signs out first to ensure service role access.
 */
export async function cleanupTestData() {
  try {
    const supabase = createTestClient()

    // Clean up in reverse order of dependencies
    await supabase.from('gem_transactions').delete().neq('user_id', '')
    await supabase.from('telegrams').delete().neq('id', '0')
    await supabase.from('referrals').delete().neq('id', '0')
    await supabase.from('profiles').delete().neq('id', '')
    await supabase.from('bases').delete().neq('id', '')

    // Clean up auth users
    const {
      data: { users },
      error: getUsersError,
    } = await supabase.auth.admin.listUsers()
    if (getUsersError) throw getUsersError

    for (const user of users || []) {
      await supabase.auth.admin.deleteUser(user.id)
    }
  } catch (error) {
    console.error('Error cleaning up test data:', error)
  }
}
