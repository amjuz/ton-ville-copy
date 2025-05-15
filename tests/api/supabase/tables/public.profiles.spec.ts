import { expect, test } from '@test/fixtures/session.fixtures'

test.describe('Supabase Authentication', () => {
  test('should retrieve profile', async ({ session }) => {
    const { data: profile, error: getError } = await session.supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .single()

    expect(getError).toBeNull()
    expect(profile).toBeDefined()
    expect(profile!.id).toBe(session.user!.id)
    expect(profile!.name).toBeDefined()
  })

  test('should update own profile data', async ({ session }) => {
    const newBio = 'New Bio'

    const { error: putError, status: putStatus } = await session.supabase
      .from('profiles')
      .update({ bio: newBio })
      .eq('id', session.user.id)

    expect(putError).toBeNull()
    expect(putStatus).toBe(204)

    const { data: profile, error: getError } = await session.supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .single()

    expect(getError).toBeNull()
    expect(profile).toBeDefined()
    expect(profile!.bio).toBe(newBio)
  })

  test.use({ count: 2 }) // Create 2 test user sessions.
  test('should only update own profile data', async ({ sessions }) => {
    const newBio = 'New Bio'

    const { error: putError, status: putStatus } = await sessions[0].supabase
      .from('profiles')
      .update({ bio: newBio })
      .eq('id', sessions[1].user.id)

    expect(putError).toBeNull()
    expect(putStatus).toBe(204)

    const { data: profile, error: getError } = await sessions[1].supabase
      .from('profiles')
      .select()
      .eq('id', sessions[1].user.id)
      .single()

    expect(getError).toBeNull()
    expect(profile).toBeDefined()
    expect(profile!.bio).not.toBe(newBio)
  })
})
