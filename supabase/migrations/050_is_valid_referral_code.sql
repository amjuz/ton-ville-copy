CREATE
OR REPLACE FUNCTION public._is_valid_referral_code(code text) RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER
SET
  search_path = '' AS $$
BEGIN
    RETURN CASE
        WHEN code IS NULL THEN false
        WHEN code ~ '^[A-Z0-9]{8}$' THEN true
        ELSE false
    END;
END;
$$;
ALTER FUNCTION public._is_valid_referral_code(code text) OWNER TO postgres;
