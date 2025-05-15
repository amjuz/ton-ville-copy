import { Enums } from '@/types/database'

export const mockGemActivities: Record<Enums['gem_activity'], { gems: number; maxUsage?: number }> =
  {
    daily_task_1: { gems: 50 },
    daily_task_2: { gems: 100 },
    daily_task_3: { gems: 150 },
    daily_task_4: { gems: 200 },
    daily_task_5: { gems: 250 },
    daily_task_6: { gems: 300 },
    daily_task_7: { gems: 500 },
    connect_twitter: { gems: 200, maxUsage: 1 },
    follow_twitter: { gems: 200, maxUsage: 1 },
    join_group: { gems: 200, maxUsage: 1 },
    join_channel: { gems: 200, maxUsage: 1 },
    easter_egg: { gems: 500, maxUsage: 1 },
    referral_generate: { gems: 1000, maxUsage: 1 },
    referral_share_primary: { gems: 120 },
    referral_share_secondary: { gems: 40 },
    airdrop: { gems: 1000 },
    connect_wallet: { gems: 2000, maxUsage: 1 },
  }
