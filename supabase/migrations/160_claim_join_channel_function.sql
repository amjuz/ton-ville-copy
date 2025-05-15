-- Create claim_join_channel function
CREATE
OR REPLACE FUNCTION public.claim_join_channel() RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = '' -- Prevent search_path injection
  AS $$
DECLARE
    v_user_id uuid;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Use schema-qualified names
    PERFORM public._allocate_gems(v_user_id, 'join_channel'::public.gem_activity);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_join_channel: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION public.claim_join_channel() OWNER TO postgres;
-- Grants
GRANT EXECUTE ON FUNCTION public.claim_join_channel() TO authenticated;
