import { expect, test } from '@test/fixtures/session.fixtures'

test.describe('Supabase Authentication', () => {
  test('should retrieve profile', async ({ session }) => {
    const { data: profile, error: getError } = await session.supabase
      .from('telegrams')
      .select()
      .eq('user_id', session.user.id)
      .single()

    expect(getError).toBeNull()
    expect(profile).toBeDefined()
    expect(profile!.user_id).toBe(session.user!.id)
  })

  test('should update own telegram data', async ({ session }) => {
    const newFirstName = 'New First Name'

    const { error: putError, status: putStatus } = await session.supabase
      .from('telegrams')
      .update({ first_name: newFirstName })
      .eq('user_id', session.user.id)

    expect(putError).toBeNull()
    expect(putStatus).toBe(204)

    const { data: telegram, error: getError } = await session.supabase
      .from('telegrams')
      .select()
      .eq('user_id', session.user.id)
      .single()

    expect(getError).toBeNull()
    expect(telegram).toBeDefined()
    expect(telegram!.first_name).toBe(newFirstName)
  })
})
