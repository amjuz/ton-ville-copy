CREATE TYPE "public"."gem_activity" AS ENUM(
  'connect_twitter',
  'referral_generate',
  'referral_share_primary',
  'referral_share_secondary',
  'follow_twitter',
  'join_group',
  'join_channel',
  'easter_egg',
  'daily_task_1',
  'daily_task_2',
  'daily_task_3',
  'daily_task_4',
  'daily_task_5',
  'daily_task_6',
  'daily_task_7',
  'airdrop',
  'connect_wallet'
);
ALTER TYPE "public"."gem_activity" owner TO "postgres";
comment ON type "public"."gem_activity" IS 'Enumeration of all possible activities that can earn gems';
