BEGIN;
-- Declare the total number of tests
SELECT
  plan(7);
-- Setup test data
DO $$
DECLARE
    user1_id uuid := gen_random_uuid();
    user2_id uuid := gen_random_uuid();
    user3_id uuid := gen_random_uuid();
    image1_id uuid := gen_random_uuid();
    image2_id uuid := gen_random_uuid();
BEGIN
    -- Insert test users
    INSERT INTO auth.users (id, email, raw_user_meta_data)
    VALUES 
        (user1_id, 'test1@example.com', '{ "telegram_id": 123 }'),
        (user2_id, 'test2@example.com', '{ "telegram_id": 456 }'),
        (user3_id, 'test3@example.com', '{ "telegram_id": 789 }');

    -- Create avatar bucket first
    INSERT INTO storage.buckets (id, name)
    VALUES ('avatar', 'avatar');

    -- Then insert test images in storage
    INSERT INTO storage.objects (id, bucket_id, name)
    VALUES 
        (image1_id, 'avatar', 'test1.jpg'),
        (image2_id, 'avatar', 'test2.jpg');

    -- Update profiles with test data
    UPDATE public.profiles
    SET 
        name = 'Test User 1',
        image_id = image1_id,
        gems = 100
    WHERE id = user1_id;

    UPDATE public.profiles
    SET 
        name = 'Test User 2',
        image_id = image2_id,
        gems = 200
    WHERE id = user2_id;

    UPDATE public.profiles
    SET 
        name = 'Test User 3',
        gems = 150
    WHERE id = user3_id;

    -- Store test data for later use
    CREATE TEMPORARY TABLE test_data(
        user1_id uuid, 
        user2_id uuid, 
        user3_id uuid,
        image1_id uuid,
        image2_id uuid
    );
    INSERT INTO test_data 
    VALUES (user1_id, user2_id, user3_id, image1_id, image2_id);
END $$;
-- Test 1: Default pagination (first page)
SELECT
  results_eq(
    'SELECT user_id, rank, total_gems, name, image_url FROM public.get_gem_leaderboard()',
    $$VALUES 
        ((SELECT user2_id FROM test_data), 1::numeric, 200::numeric, 'Test User 2', 'avatar/test2.jpg'::text),
        ((SELECT user3_id FROM test_data), 2::numeric, 150::numeric, 'Test User 3', NULL::text),
        ((SELECT user1_id FROM test_data), 3::numeric, 100::numeric, 'Test User 1', 'avatar/test1.jpg'::text)
    $$,
    'Should return correct order by gems DESC with default pagination'
  );
-- Test 2: Custom pagination
SELECT
  results_eq(
    'SELECT user_id, rank, total_gems FROM public.get_gem_leaderboard(2, 1)',
    $$VALUES 
        ((SELECT user3_id FROM test_data), 2::numeric, 150::numeric)
    $$,
    'Should return correct single record with custom pagination'
  );
-- Test 3: Empty result with out-of-range offset
SELECT
  is_empty(
    'SELECT * FROM public.get_gem_leaderboard(10, 10)',
    'Should return empty result for out-of-range pagination'
  );
-- Test 4: Check rank continuity
SELECT
  results_eq(
    'SELECT rank FROM public.get_gem_leaderboard()',
    $$VALUES (1::numeric), (2::numeric), (3::numeric)$$,
    'Should return continuous rank numbers'
  );
-- Test 5: Check image_url formatting
SELECT
  matches(
    (
      SELECT
        image_url
      FROM
        public.get_gem_leaderboard()
      WHERE
        user_id = (
          SELECT
            user2_id
          FROM
            test_data
        )
    ),
    '^avatar/.*\.jpg$',
    'Should format image_url correctly with bucket_id/name pattern'
  );
-- Test 6: Verify total_gems type
SELECT
  is(
    pg_typeof(
      (
        SELECT
          total_gems
        FROM
          public.get_gem_leaderboard()
        LIMIT
          1
      )
    ) :: text,
    'numeric' :: text,
    'total_gems column should be of type numeric'
  );
-- Test 7: Check function security
SELECT
  ok(
    has_function_privilege(
      'authenticated',
      'public.get_gem_leaderboard(integer,integer)',
      'EXECUTE'
    ),
    'Authenticated users should have EXECUTE privilege on get_gem_leaderboard'
  );
-- Finish the tests and clean up
SELECT
  *
FROM
  finish();
ROLLBACK;
