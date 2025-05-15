BEGIN;
-- Declare the total number of tests
SELECT
  plan(4);
-- Setup test data
DO $$
DECLARE
    test_user_id uuid := gen_random_uuid();
    test_referral_code text := _generate_referral_code();
BEGIN
    -- Insert test user and profile
    INSERT INTO auth.users (id, email, raw_user_meta_data)
    VALUES (test_user_id, 'test@example.com', '{ "telegram_id": 123 }');

    -- Update the profile with generated referral code
    UPDATE public.profiles
    SET my_referral = test_referral_code
    WHERE id = test_user_id;

    -- Set the test data in temporary table for access in test cases
    CREATE TEMPORARY TABLE test_data(user_id uuid, referral_code text);
    INSERT INTO test_data VALUES (test_user_id, test_referral_code);
END $$;
-- Test 1: Valid code lookup
SELECT
  is(
    _get_referrer_uuid(
      (
        SELECT
          referral_code
        FROM
          test_data
      )
    ),
    (
      SELECT
        user_id
      FROM
        test_data
    ),
    'Should find correct referrer UUID for valid code'
  );
-- Test 2: Case insensitive lookup
SELECT
  is(
    _get_referrer_uuid(
      LOWER(
        (
          SELECT
            referral_code
          FROM
            test_data
        )
      )
    ),
    (
      SELECT
        user_id
      FROM
        test_data
    ),
    'Should handle case-insensitive lookup'
  );
-- Test 3: NULL input handling
SELECT
  is(
    _get_referrer_uuid(NULL),
    NULL :: uuid,
    'Should return NULL for NULL input'
  );
-- Test 4: Non-existent code handling
SELECT
  is(
    _get_referrer_uuid('INVALID12'),
    NULL :: uuid,
    'Should return NULL for non-existent code'
  );
SELECT
  *
FROM
  finish();
ROLLBACK;
