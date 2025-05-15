-- Create referrals table
CREATE TABLE IF NOT EXISTS "public"."referrals" (
  "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
  "referrer_id" "uuid" NOT NULL,
  "referred_id" "uuid" NOT NULL
) inherits ("public"."bases");
ALTER TABLE
  "public"."referrals" owner TO "postgres";
-- Comments
comment ON TABLE "public"."referrals" IS 'Tracks referral relationships between users';
comment ON COLUMN "public"."referrals"."referrer_id" IS 'The user who made the referral';
comment ON COLUMN "public"."referrals"."referred_id" IS 'The user who was referred';
-- Primary Key and Unique Constraints
ALTER TABLE
  ONLY "public"."referrals"
ADD
  CONSTRAINT "referrals_pkey" PRIMARY KEY ("id");
ALTER TABLE
  ONLY "public"."referrals"
ADD
  CONSTRAINT "referrals_unique_referral" UNIQUE ("referrer_id", "referred_id");
-- Foreign Keys
ALTER TABLE
  ONLY "public"."referrals"
ADD
  CONSTRAINT "referrals_referrer_id_fkey" FOREIGN key ("referrer_id") REFERENCES "public"."profiles" ("id") ON DELETE cascade;
ALTER TABLE
  ONLY "public"."referrals"
ADD
  CONSTRAINT "referrals_referred_id_fkey" FOREIGN key ("referred_id") REFERENCES "public"."profiles" ("id") ON DELETE cascade;
-- Indexes
CREATE INDEX "idx_referrals_referrer_id" ON "public"."referrals" USING btree ("referrer_id");
CREATE INDEX "idx_referrals_referred_id" ON "public"."referrals" USING btree ("referred_id");
-- Trigger for updated_at
CREATE
OR REPLACE trigger "handle_updated_at" before
UPDATE
  ON "public"."referrals" FOR each ROW EXECUTE function "extensions"."moddatetime" ('updated_at');
-- Enable RLS
ALTER TABLE
  "public"."referrals" enable ROW level security;
-- RLS Policies
CREATE POLICY "Users can view their own referrals" ON "public"."referrals" FOR
SELECT
  TO "authenticated" USING (
    (
      ("auth"."uid" () = "referrer_id")
      OR ("auth"."uid" () = "referred_id")
    )
  );
-- Grants
GRANT
SELECT
,
INSERT
  ON TABLE "public"."referrals" TO "authenticated";
