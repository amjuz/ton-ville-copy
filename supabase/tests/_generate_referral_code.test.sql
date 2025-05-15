BEGIN;
-- Declare the total number of tests
SELECT
  plan(6);
-- Test code length
SELECT
  is(
    length(public._generate_referral_code()),
    8,
    'Code length should be 8'
  );
-- Test character set
SELECT
  ok(
    public._generate_referral_code() ~ '^[A-Z0-9]+$',
    'Code should be uppercase alphanumeric'
  );
-- Test uniqueness with proper type casting
WITH generations AS (
  SELECT
    public._generate_referral_code() as code
  FROM
    generate_series(1, 1000)
)
SELECT
  is(
    COUNT(DISTINCT code) :: integer,
    -- Cast BIGINT to INTEGER
    1000,
    'Should generate 1000 unique codes'
  )
FROM
  generations;
-- Test non-null generation
SELECT
  isnt(
    _generate_referral_code(),
    NULL,
    'Generated code should not be NULL'
  );
-- Test format validation
SELECT
  ok(
    _is_valid_referral_code(_generate_referral_code()),
    'Generated code should be valid'
  );
-- Test sequential uniqueness
SELECT
  isnt(
    _generate_referral_code(),
    _generate_referral_code(),
    'Sequential generations should produce different codes'
  );
SELECT
  *
FROM
  finish();
ROLLBACK;
