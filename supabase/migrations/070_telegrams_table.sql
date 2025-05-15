-- Create telegrams table
CREATE TABLE IF NOT EXISTS "public"."telegrams" (
  "id" BIGINT NOT NULL,
  "first_name" "text",
  "last_name" "text",
  "username" "text",
  "photo_url" "text",
  "user_id" "uuid" NOT NULL
) inherits ("public"."bases");
ALTER TABLE
  "public"."telegrams" owner TO "postgres";
-- Comments
COMMENT ON TABLE "public"."telegrams" IS 'Connected Telegram accounts for users';
COMMENT ON COLUMN "public"."telegrams"."id" IS 'Telegram user ID from telegram_id';
COMMENT ON COLUMN "public"."telegrams"."photo_url" IS 'Optional Telegram profile photo URL';
COMMENT ON COLUMN "public"."telegrams"."user_id" IS 'Reference to the user''s profile';
-- Primary Key and Unique Constraints
ALTER TABLE
  ONLY "public"."telegrams"
ADD
  CONSTRAINT "telegrams_pkey" PRIMARY KEY ("id");
ALTER TABLE
  ONLY "public"."telegrams"
ADD
  CONSTRAINT "telegrams_user_id_key" UNIQUE ("user_id");
-- Foreign Keys
ALTER TABLE
  ONLY "public"."telegrams"
ADD
  CONSTRAINT "telegrams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("id") ON DELETE CASCADE;
-- Trigger for updated_at
CREATE
OR REPLACE trigger "handle_updated_at" before
UPDATE
  ON "public"."telegrams" FOR each ROW EXECUTE function "extensions"."moddatetime" ('updated_at');
-- Enable RLS
ALTER TABLE
  "public"."telegrams" enable ROW level security;
-- RLS Policies
CREATE POLICY "Allow users to fetch own telegram" ON "public"."telegrams" FOR
SELECT
  TO "authenticated" USING (auth.uid() = user_id);
CREATE POLICY "Allow users to update own telegram" ON "public"."telegrams" FOR
UPDATE
  TO "authenticated" USING (auth.uid() = user_id);
-- Grants
GRANT
SELECT
,
INSERT
,
UPDATE
  ON TABLE "public"."telegrams" TO "authenticated";
