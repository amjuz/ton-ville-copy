-- Create claim_easter_egg function
CREATE
OR REPLACE function "public"."claim_easter_egg" () returns "void" language "plpgsql" security definer
SET
  "search_path" TO '' AS $$
DECLARE
    v_user_id uuid;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    PERFORM public._allocate_gems(v_user_id, 'easter_egg'::public.gem_activity);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_easter_egg: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."claim_easter_egg" () owner TO "postgres";
-- Grants
GRANT EXECUTE ON FUNCTION "public"."claim_easter_egg"() TO "authenticated";
