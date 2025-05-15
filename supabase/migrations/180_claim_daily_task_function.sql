-- Create claim_active_daily_task function
CREATE
OR REPLACE function "public"."claim_active_daily_task" () returns "void" language "plpgsql" security definer
SET
  "search_path" TO 'public' AS $$
DECLARE
    v_user_id uuid;
    v_active_task public.gem_activity;
    v_is_available boolean;
    v_expires_at timestamptz;
BEGIN
    -- Get user_id from current session
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get active task details
    SELECT task, is_available, expires_at
    INTO v_active_task, v_is_available, v_expires_at
    FROM public.get_active_daily_task();

    -- Validate task availability
    IF v_active_task IS NULL THEN
        RAISE EXCEPTION 'No daily task currently available';
    END IF;

    IF NOT v_is_available THEN
        RAISE EXCEPTION 'Daily task is not yet available';
    END IF;

    IF CURRENT_TIMESTAMP > v_expires_at THEN
        RAISE EXCEPTION 'Daily task has expired';
    END IF;

    -- Use _allocate_gems instead of direct insert
    PERFORM _allocate_gems(v_user_id, v_active_task);

EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_active_daily_task: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."claim_active_daily_task" () owner TO "postgres";
-- Grants
GRANT ALL ON function "public"."claim_active_daily_task" () TO "authenticated";
