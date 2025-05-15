-- Create get_active_daily_task function
CREATE
OR REPLACE FUNCTION public.get_active_daily_task() RETURNS TABLE (
  task public.gem_activity,
  is_available boolean,
  available_at timestamptz,
  gems_reward integer,
  expires_at timestamptz
) LANGUAGE plpgsql STABLE SECURITY DEFINER
SET
  search_path = '' AS $$
DECLARE
    v_user_id uuid;
    v_last_task public.gem_activity;
    v_last_task_time timestamptz;
    v_active_task public.gem_activity;
BEGIN
    -- Use schema-qualified names
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get the most recent daily task completion
    SELECT activity, created_at
    INTO v_last_task, v_last_task_time
    FROM public.gem_transactions
    WHERE user_id = v_user_id
        AND activity::text LIKE 'daily_task_%'
    ORDER BY created_at DESC
    LIMIT 1;

    -- For new users or expired tasks
    IF v_last_task IS NULL OR
       (v_last_task_time + INTERVAL '48 hours' < CURRENT_TIMESTAMP) THEN
        -- Start/Restart with task_1
        v_active_task := 'daily_task_1'::public.gem_activity;
        -- Set virtual last task time to 24 hours ago
        v_last_task_time := CURRENT_TIMESTAMP - INTERVAL '24 hours';

    -- Completed all tasks, can restart
    ELSIF v_last_task = 'daily_task_7' AND
          CURRENT_TIMESTAMP - v_last_task_time >= INTERVAL '24 hours' THEN
        v_active_task := 'daily_task_1'::public.gem_activity;

    -- Regular progression. Immediately show next task after completion of previous. But only if it's been 24 hours since last task
    ELSE
        v_active_task := (
            CASE v_last_task::text
                WHEN 'daily_task_1' THEN 'daily_task_2'
                WHEN 'daily_task_2' THEN 'daily_task_3'
                WHEN 'daily_task_3' THEN 'daily_task_4'
                WHEN 'daily_task_4' THEN 'daily_task_5'
                WHEN 'daily_task_5' THEN 'daily_task_6'
                WHEN 'daily_task_6' THEN 'daily_task_7'
            END
        )::public.gem_activity;
    END IF;

    RETURN QUERY
    SELECT
        v_active_task,
        CURRENT_TIMESTAMP >= v_last_task_time + INTERVAL '24 hours',
        v_last_task_time + INTERVAL '24 hours',
        ag.gems,
        v_last_task_time + INTERVAL '48 hours'
    FROM public.activity_gems ag
    WHERE ag.activity = v_active_task
    LIMIT 1;
END;
$$;
-- Set owner
ALTER FUNCTION public.get_active_daily_task() OWNER TO postgres;
-- Grants
GRANT EXECUTE ON FUNCTION public.get_active_daily_task() TO authenticated;
