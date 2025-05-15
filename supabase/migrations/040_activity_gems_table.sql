CREATE TABLE IF NOT EXISTS "public"."activity_gems" AS
SELECT
  v.activity,
  v.gems,
  v.max_usage
FROM
  (
    VALUES
      ('daily_task_1' :: public.gem_activity, 50, NULL),
      ('daily_task_2' :: public.gem_activity, 100, NULL),
      ('daily_task_3' :: public.gem_activity, 150, NULL),
      ('daily_task_4' :: public.gem_activity, 200, NULL),
      ('daily_task_5' :: public.gem_activity, 250, NULL),
      ('daily_task_6' :: public.gem_activity, 300, NULL),
      ('daily_task_7' :: public.gem_activity, 500, NULL),
      ('connect_twitter' :: public.gem_activity, 200, 1),
      ('referral_generate' :: public.gem_activity, 1000, 1),
      (
        'referral_share_primary' :: public.gem_activity,
        120,
        NULL
      ),
      (
        'referral_share_secondary' :: public.gem_activity,
        40,
        NULL
      ),
      ('follow_twitter' :: public.gem_activity, 200, 1),
      ('join_group' :: public.gem_activity, 200, 1),
      ('join_channel' :: public.gem_activity, 200, 1),
      ('easter_egg' :: public.gem_activity, 500, 1),
      ('airdrop' :: public.gem_activity, 1000, NULL),
      ('connect_wallet' :: public.gem_activity, 2000, 1)
  ) AS v(activity, gems, max_usage);
-- Add NOT NULL constraints
ALTER TABLE
  "public"."activity_gems"
ALTER COLUMN
  "activity"
SET
  NOT NULL,
ALTER COLUMN
  "gems"
SET
  NOT NULL;
-- Add check constraints
ALTER TABLE
  "public"."activity_gems"
ADD
  CONSTRAINT "activity_gems_gems_positive" CHECK (("gems" >= 0)),
ADD
  CONSTRAINT "activity_gems_max_usage_positive" CHECK (
    ("max_usage" IS NULL)
    OR ("max_usage" > 0)
  );
ALTER TABLE
  "public"."activity_gems" owner TO "postgres";
-- Comments
COMMENT ON TABLE "public"."activity_gems" IS 'Configuration table for gem rewards per activity';
COMMENT ON COLUMN "public"."activity_gems"."gems" IS 'Number of gems awarded for the activity';
COMMENT ON COLUMN "public"."activity_gems"."max_usage" IS 'Maximum times a user can perform this activity, NULL for unlimited';
-- Primary Key
ALTER TABLE
  ONLY "public"."activity_gems"
ADD
  CONSTRAINT "activity_gems_pkey" PRIMARY KEY ("activity");
-- Enable RLS
ALTER TABLE
  "public"."activity_gems" enable ROW level security;
-- RLS Policies
CREATE POLICY "activity_gems_read_policy" ON "public"."activity_gems" FOR
SELECT
  TO "authenticated" USING (TRUE);
-- Grants
GRANT
SELECT
  ON TABLE "public"."activity_gems" TO "authenticated";
-- Add unique constraint to prevent duplicate activities
ALTER TABLE
  "public"."activity_gems"
ADD
  CONSTRAINT "activity_gems_activity_unique" UNIQUE ("activity");
