-- Create profiles table
CREATE TABLE IF NOT EXISTS "public"."profiles" (
  "id" "uuid" NOT NULL,
  "name" "text",
  "bio" "text",
  "referrer_id" "uuid",
  "image_id" "text",
  "gems" INTEGER NOT NULL DEFAULT 0,
  "my_referral" text,
  CONSTRAINT "unique_my_referral" UNIQUE ("my_referral"),
  CONSTRAINT "valid_my_referral" CHECK (
    my_referral IS NULL
    OR public._is_valid_referral_code(my_referral)
  )
) inherits ("public"."bases");
ALTER TABLE
  "public"."profiles" owner TO "postgres";
-- Comments
comment ON TABLE "public"."profiles" IS 'User profiles and account information';
comment ON COLUMN "public"."profiles"."bio" IS 'User''s biography or self description';
-- comment ON COLUMN "public"."profiles"."image_id" IS 'References storage.objects(id). Initially set to a random avatar from avatar bucket, can be updated to user uploaded image from upload bucket';
comment ON COLUMN "public"."profiles"."gems" IS 'Total gems earned by the user';
comment ON COLUMN "public"."profiles"."my_referral" IS 'Unique referral code for this user';
-- Primary Key
ALTER TABLE
  ONLY "public"."profiles"
ADD
  CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
-- Foreign Keys
ALTER TABLE
  ONLY "public"."profiles"
ADD
  CONSTRAINT "profiles_id_fkey" FOREIGN key ("id") REFERENCES "auth"."users" ("id") ON DELETE cascade;

ALTER TABLE
  ONLY "public"."profiles"
ADD
  CONSTRAINT "profiles_referrer_id_fkey" FOREIGN key ("referrer_id") REFERENCES "public"."profiles" ("id") ON DELETE
SET
  NULL;
-- Indexes
-- CREATE INDEX "idx_profiles_image_id" ON "public"."profiles" USING btree ("image_id");
CREATE INDEX "idx_profiles_referrer_id" ON "public"."profiles" USING btree ("referrer_id");
CREATE INDEX "idx_profiles_my_referral" ON "public"."profiles" USING btree ("my_referral");
-- Trigger for updated_at
CREATE
OR REPLACE trigger "handle_updated_at" before
UPDATE
  ON "public"."profiles" FOR each ROW EXECUTE function "extensions"."moddatetime" ('updated_at');
-- Enable RLS
ALTER TABLE
  "public"."profiles" enable ROW level security;
-- RLS Policies
-- Policy for full access to own profile
CREATE POLICY "profiles_owner_full_access" ON "public"."profiles" FOR ALL TO "authenticated" USING (auth.uid() = id);
-- Policy for read-only access to other profiles (for leaderboard, etc)
CREATE POLICY "profiles_public_read" ON "public"."profiles" FOR
SELECT
  TO "authenticated" USING (true);
-- Grants
GRANT
SELECT
,
INSERT
,
UPDATE
  ON TABLE "public"."profiles" TO "authenticated";
