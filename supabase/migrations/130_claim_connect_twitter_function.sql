-- Create claim_connect_twitter function
CREATE
OR REPLACE FUNCTION public.claim_connect_twitter() RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = '' AS $$
DECLARE
    v_user_id uuid;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    PERFORM public._allocate_gems(v_user_id, 'connect_twitter'::public.gem_activity);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in claim_connect_twitter: %', SQLERRM;
        RAISE;
END;
$$;
-- Set owner
ALTER FUNCTION public.claim_connect_twitter() OWNER TO postgres;
-- Grants
GRANT EXECUTE ON FUNCTION public.claim_connect_twitter() TO authenticated;
