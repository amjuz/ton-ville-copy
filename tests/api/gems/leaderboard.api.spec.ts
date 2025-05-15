import { expect, test } from '@test/fixtures/session.fixtures'
import { FunctionName } from '@/types/database'
import { createTestSession, createTestSessionList } from '@test/utils/auth'

test.describe('Gems Leaderboard API Operations', () => {
  test('should show empty leaderboard for new user', async ({ supabase }) => {
    const session = await createTestSession(supabase)

    const { data, error } = await session.supabase.rpc('get_gem_leaderboard')
    expect(error).toBeNull()
    expect(data).toBeDefined()
    expect(data).toHaveLength(0)
  })

  test('should respect default pagination values', async ({ supabase }) => {
    // Create 15 test sessions
    const sessions = await createTestSessionList(supabase, 15)

    // Give each user some gems
    for (const session of sessions) {
      const rpcCalls: FunctionName[] = [
        'claim_active_daily_task',
        'claim_easter_egg',
        'claim_join_group',
        'claim_join_channel',
        'claim_connect_twitter',
      ]

      const numRpcCalls = Math.floor(Math.random() * rpcCalls.length) + 1
      const randomRpcCalls = rpcCalls.slice(0, numRpcCalls)

      for (const call of randomRpcCalls) {
        const { error: rpcError, data: rpcData } = await session.supabase.rpc(call)
        expect(rpcError).toBeNull()
        expect(rpcData).toBeDefined()
      }

      session.supabase.auth.signOut()
    }

    // Test leaderboard
    const { data } = await supabase.rpc('get_gem_leaderboard')
    expect(data).toHaveLength(10) // Default limit
  })

  test('should handle custom offset and limit', async ({ supabase }) => {
    // Create 15 test users
    const sessions = await createTestSessionList(supabase, 15)

    // Give each user some gems
    for (const session of sessions) {
      const rpcCalls: FunctionName[] = [
        'claim_active_daily_task',
        'claim_easter_egg',
        'claim_join_group',
        'claim_join_channel',
        'claim_connect_twitter',
      ]

      const numRpcCalls = Math.floor(Math.random() * rpcCalls.length) + 1
      const randomRpcCalls = rpcCalls.slice(0, numRpcCalls)

      for (const call of randomRpcCalls) {
        const { error: rpcError, data: rpcData } = await session.supabase.rpc(call)
        expect(rpcError).toBeNull()
        expect(rpcData).toBeDefined()
      }

      session.supabase.auth.signOut()
    }

    // Test custom pagination
    const { data: customPage, error } = await supabase.rpc('get_gem_leaderboard', {
      p_offset: 5,
      p_limit: 5,
    })
    expect(error).toBeNull()
    expect(customPage).toHaveLength(5)
    expect(customPage?.[0].rank).toBe(5) // Should start at rank 5
    expect(customPage?.[4].rank).toBe(9) // Should end at rank 9
  })

  test('should handle invalid pagination values', async ({ session }) => {
    // Create a test user with some gems

    // Give user some gems to appear in leaderboard
    const rpcCalls: FunctionName[] = ['claim_active_daily_task', 'claim_easter_egg']

    for (const call of rpcCalls) {
      const { error: rpcError } = await session.supabase.rpc(call)
      expect(rpcError).toBeNull()
    }

    // Test negative offset
    const { data: negativeOffset, error: negativeOffsetError } = await session.supabase.rpc(
      'get_gem_leaderboard',
      { p_offset: -1 }
    )
    expect(negativeOffsetError).toBeNull()
    expect(negativeOffset?.[0]?.rank).toBe(1) // Should default to 1

    // Test negative limit
    const { data: negativeLimit, error: negativeLimitError } = await session.supabase.rpc(
      'get_gem_leaderboard',
      { p_limit: -1 }
    )
    expect(negativeLimitError).toBeNull()
    expect(negativeLimit).toHaveLength(1) // Should default to 1

    // Test zero values
    const { data: zeroValues, error: zeroValuesError } = await session.supabase.rpc(
      'get_gem_leaderboard',
      {
        p_offset: 0,
        p_limit: 0,
      }
    )
    expect(zeroValuesError).toBeNull()
    expect(zeroValues?.[0]?.rank).toBe(1) // Should default to offset 1
    expect(zeroValues).toHaveLength(1) // Should default to limit 1

    session.supabase.auth.signOut()
  })
})
