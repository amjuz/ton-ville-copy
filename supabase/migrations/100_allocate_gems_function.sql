-- Create _allocate_gems function
CREATE
OR REPLACE FUNCTION public._allocate_gems(p_user_id uuid, p_activity public.gem_activity) RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = '' AS $$
DECLARE
    v_gems int;
    v_max_usage int;
    v_current_usage int;
    v_lock_key bigint;
BEGIN
    -- Generate lock key from user_id only
    v_lock_key := ('x' || substr(md5(p_user_id::text), 1, 16))::bit(64)::bigint;

    -- Acquire transaction-level advisory lock
    PERFORM pg_advisory_xact_lock(v_lock_key);

    -- Get activity configuration
    SELECT gems, max_usage
    INTO v_gems, v_max_usage
    FROM public.activity_gems
    WHERE activity = p_activity;

    IF v_gems IS NULL THEN
        RAISE WARNING 'No gems configured for activity %, skipping allocation', p_activity;
        RETURN;
    END IF;

    -- Check max usage within the same transaction
    IF v_max_usage IS NOT NULL THEN
        SELECT COUNT(*)
        INTO v_current_usage
        FROM public.gem_transactions
        WHERE user_id = p_user_id
        AND activity = p_activity;

        IF v_current_usage >= v_max_usage THEN
            RAISE WARNING 'Maximum usage reached for activity %, skipping allocation', p_activity;
            RETURN;
        END IF;
    END IF;

    -- Insert transaction
    INSERT INTO public.gem_transactions (user_id, activity, gems)
    VALUES (p_user_id, p_activity, v_gems);

EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in allocate_gems: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION public._allocate_gems(p_user_id uuid, p_activity public.gem_activity) OWNER TO postgres;
-- No need to grant EXECUTE to authenticated
