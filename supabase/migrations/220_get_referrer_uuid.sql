CREATE
OR REPLACE FUNCTION public._get_referrer_uuid(referral_code text) RETURNS uuid LANGUAGE "plpgsql" SECURITY DEFINER AS $$
DECLARE
    found_id uuid;
    matching_profiles integer;
    normalized_code text;
BEGIN
    IF referral_code IS NULL THEN
        RETURN NULL;
    END IF;

    normalized_code := UPPER(TRIM(referral_code));

    IF NOT public._is_valid_referral_code(normalized_code) THEN
        RETURN NULL;
    END IF;

    SELECT COUNT(*)
    INTO matching_profiles
    FROM public.profiles
    WHERE my_referral = normalized_code;

    IF matching_profiles > 1 THEN
        RAISE WARNING 'Data integrity issue: Multiple profiles found with referral code %', normalized_code;
    END IF;

    SELECT id
    INTO found_id
    FROM public.profiles
    WHERE my_referral = normalized_code
    FOR UPDATE
    LIMIT 1;

    RETURN found_id;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."_get_referrer_uuid"("referral_code" "text") OWNER TO "postgres";
GRANT EXECUTE ON FUNCTION "public"."_get_referrer_uuid"("referral_code" "text") TO "authenticated";
