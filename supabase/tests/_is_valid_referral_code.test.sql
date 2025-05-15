-- Start a transaction so our test data doesn't persist
BEGIN;
-- Load pgTAP
SELECT
  plan(7);
-- We're going to run 7 distinct tests
-- Test valid formats
SELECT
  ok(
    _is_valid_referral_code('12345678'),
    'Should accept 8-digit numeric code'
  );
SELECT
  ok(
    _is_valid_referral_code('ABCD1234'),
    'Should accept 8-character alphanumeric code'
  );
-- Test invalid formats
SELECT
  ok(
    NOT _is_valid_referral_code(NULL),
    'Should reject NULL input'
  );
SELECT
  ok(
    NOT _is_valid_referral_code('123456'),
    'Should reject codes shorter than 8 characters'
  );
SELECT
  ok(
    NOT _is_valid_referral_code('123456789'),
    'Should reject codes longer than 8 characters'
  );
SELECT
  ok(
    NOT _is_valid_referral_code('ABCD-1234'),
    'Should reject codes with special characters'
  );
SELECT
  ok(
    NOT _is_valid_referral_code('abcd1234'),
    'Should reject lowercase characters'
  );
-- Finish the tests and clean up
SELECT
  *
FROM
  finish();
ROLLBACK;
