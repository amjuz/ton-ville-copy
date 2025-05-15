CREATE
OR REPLACE FUNCTION public._generate_referral_code() RETURNS text LANGUAGE "plpgsql" SECURITY DEFINER AS $$
DECLARE
    generated_code text;
BEGIN
    generated_code := UPPER(
        SUBSTRING(
            REGEXP_REPLACE(
                ENCODE(
                    extensions.digest(gen_random_uuid()::TEXT, 'sha256'),
                    'hex'
                ),
                '[^A-Z0-9]',
                ''
            ),
            1,
            8
        )
    );

    -- Verify the generated code matches our format requirements
    IF NOT public._is_valid_referral_code(generated_code) THEN
        RAISE EXCEPTION 'Generated invalid referral code: %. This indicates a bug in the generation function.', generated_code;
    END IF;

    RETURN generated_code;
END;
$$;
-- Set owner
ALTER FUNCTION "public"."_generate_referral_code"() OWNER TO "postgres";
GRANT EXECUTE ON FUNCTION "public"."_generate_referral_code"() TO "authenticated";
