CREATE TABLE IF NOT EXISTS "public"."bases" (
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
ALTER TABLE
  "public"."bases" owner TO "postgres";
-- Comments
COMMENT ON TABLE "public"."bases" IS 'Base table for timestamp inheritance';
COMMENT ON COLUMN "public"."bases"."created_at" IS 'Timestamp when the record was created';
COMMENT ON COLUMN "public"."bases"."updated_at" IS 'Timestamp when the record was last updated';
