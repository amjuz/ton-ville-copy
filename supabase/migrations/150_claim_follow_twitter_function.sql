-- Create claim_follow_twitter function
CREATE
OR REPLACE function "public"."claim_follow_twitter" () returns "void" language "plpgsql" security definer
SET
  "search_path" TO 'public' AS $$
DECLARE
    v_user_id uuid;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    PERFORM _allocate_gems(v_user_id, 'follow_twitter'::gem_activity);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_follow_twitter: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."claim_follow_twitter" () owner TO "postgres";
-- Grants
GRANT EXECUTE ON FUNCTION "public"."claim_follow_twitter"() TO "authenticated";
