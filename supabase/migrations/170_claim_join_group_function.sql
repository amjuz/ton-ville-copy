-- Create claim_join_group function
CREATE
OR REPLACE function "public"."claim_join_group" () returns "void" language "plpgsql" security definer
SET
  "search_path" TO '' AS $$
DECLARE
    v_user_id uuid;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    PERFORM "public"."_allocate_gems"(v_user_id, 'join_group'::"public"."gem_activity");
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_join_group: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."claim_join_group" () owner TO "postgres";
-- Grants
GRANT ALL ON function "public"."claim_join_group" () TO "authenticated";
GRANT EXECUTE ON FUNCTION "public"."claim_join_group"() TO "authenticated";
