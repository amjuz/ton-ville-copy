BEGIN;
-- Declare the total number of tests
SELECT
  plan(6);
-- Setup test data
DO $$
DECLARE
    user1_id uuid := gen_random_uuid();
    user2_id uuid := gen_random_uuid();
    user3_id uuid := gen_random_uuid();
BEGIN
    -- Create temporary test data table (fixed syntax)
    CREATE TEMP TABLE test_data (
        user1_id uuid,
        user2_id uuid,
        user3_id uuid
    );

    -- Insert the values
    INSERT INTO test_data (user1_id, user2_id, user3_id)
    VALUES (user1_id, user2_id, user3_id);

    -- Insert test users in auth.users first
    INSERT INTO auth.users (id, email, raw_user_meta_data)
    VALUES
        (user1_id, 'test1@example.com', '{ "telegram_id": 123 }'),
        (user2_id, 'test2@example.com', '{ "telegram_id": 456 }'),
        (user3_id, 'test3@example.com', '{ "telegram_id": 789 }');

    -- Update test profiles
    UPDATE public.profiles
    SET my_referral = 'ABCD1234'
    WHERE id = user2_id;  -- already woke up
END $$;
-- Test 1: Successful wake-up
SELECT
  lives_ok(
    format(
      'SET LOCAL "request.jwt.claim.sub" = %L; SELECT public.wake_up_profile();',
      (
        SELECT
          user1_id
        FROM
          test_data
      ) :: text
    ),
    'Should successfully wake up profile and generate referral code'
  );
-- Test 2: Already woke up
SELECT
  throws_ok(
    format(
      'SET LOCAL "request.jwt.claim.sub" = %L; SELECT public.wake_up_profile();',
      (
        SELECT
          user2_id
        FROM
          test_data
      ) :: text
    ),
    'P0001',
    'Already woke up!',
    'Should raise exception for already woke up profile'
  );
-- Test 4: Not authenticated
SELECT
  throws_ok(
    $$SET LOCAL "request.jwt.claim.sub" = ''; SELECT public.wake_up_profile();$$,
    'P0001',
    'Not authenticated',
    'Should raise exception for unauthenticated user'
  );
-- Test 5: Profile not found
SELECT
  throws_ok(
    format(
      'SET LOCAL "request.jwt.claim.sub" = %L; SELECT public.wake_up_profile();',
      gen_random_uuid() :: text
    ),
    'P0001',
    'Profile not found',
    'Should raise exception for non-existent profile'
  );
-- Test 6: Check referral code format
SELECT
  ok(
    public._is_valid_referral_code(
      (
        SELECT
          my_referral
        FROM
          public.profiles
        WHERE
          id = (
            SELECT
              user1_id
            FROM
              test_data
          )
      )
    ),
    'Generated referral code should be valid'
  );
-- Test 7: Check function security
SELECT
  ok(
    has_function_privilege(
      'authenticated',
      'public.wake_up_profile()',
      'EXECUTE'
    ),
    'Authenticated users should have EXECUTE privilege on wake_up_profile'
  );
-- Clean up
DROP TABLE test_data;
-- Finish the tests
SELECT
  *
FROM
  finish();
ROLLBACK;
