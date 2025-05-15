CREATE
OR REPLACE FUNCTION public.wake_up_profile() RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = '' AS $function$
DECLARE
    v_user_id uuid;
    v_referral_code text;
BEGIN
    -- Get and validate user
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Lock the profile row and check existence
    PERFORM 1
    FROM public.profiles
    WHERE id = v_user_id
    FOR UPDATE NOWAIT;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile not found';
    END IF;

    -- Check if already woke up
    IF EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = v_user_id
        AND my_referral IS NOT NULL
    ) THEN
        RAISE EXCEPTION 'Already woke up!';
    END IF;

    -- Generate and set referral code
    SELECT public._generate_referral_code() INTO v_referral_code;

    UPDATE public.profiles
    SET
        my_referral = v_referral_code,
        updated_at = NOW()
    WHERE id = v_user_id;

EXCEPTION
    WHEN lock_not_available THEN
        RAISE EXCEPTION 'Waking up already!';
    WHEN OTHERS THEN
        RAISE;
END;
$function$;
-- Set owner
ALTER FUNCTION public.wake_up_profile() OWNER TO postgres;
-- Grants
GRANT EXECUTE ON FUNCTION public.wake_up_profile() TO authenticated;
-- Add comment
COMMENT ON FUNCTION public.wake_up_profile() IS 'Wakes up a profile by generating a referral code if none exists. Handles race conditions and prevents duplicate wake-ups using transaction-level advisory locks.';
