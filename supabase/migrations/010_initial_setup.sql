SET
  statement_timeout = 0;
SET
  lock_timeout = 0;
SET
  idle_in_transaction_session_timeout = 0;
SET
  client_encoding = 'UTF8';
SET
  standard_conforming_strings = ON;
SELECT
  pg_catalog.set_config ('search_path', '', FALSE);
SET
  check_function_bodies = FALSE;
SET
  xmloption = content;
SET
  client_min_messages = warning;
SET
  row_security = off;
-- First revoke all permissions from anon role
REVOKE ALL ON ALL tables IN schema public
FROM
  anon;
REVOKE ALL ON ALL functions IN schema public
FROM
  anon;
REVOKE ALL ON ALL sequences IN schema public
FROM
  anon;
REVOKE ALL ON schema public
FROM
  anon;
-- Then set up specific grants
GRANT usage ON schema "public" TO "postgres";
GRANT usage ON schema "public" TO "authenticated";
GRANT usage ON schema "public" TO "service_role";
-- Extensions
CREATE EXTENSION if NOT EXISTS "pg_net" WITH schema "extensions";
CREATE EXTENSION if NOT EXISTS "pgsodium" WITH schema "pgsodium";
CREATE EXTENSION if NOT EXISTS "moddatetime" WITH schema "extensions";
CREATE EXTENSION if NOT EXISTS "pg_graphql" WITH schema "graphql";
CREATE EXTENSION if NOT EXISTS "pg_stat_statements" WITH schema "extensions";
CREATE EXTENSION if NOT EXISTS "pgcrypto" WITH schema "extensions";
CREATE EXTENSION if NOT EXISTS "pgjwt" WITH schema "extensions";
CREATE EXTENSION if NOT EXISTS "supabase_vault" WITH schema "vault";
CREATE EXTENSION if NOT EXISTS "uuid-ossp" WITH schema "extensions";
-- Schema comment
comment ON schema "public" IS 'standard public schema';
-- Publication
ALTER PUBLICATION "supabase_realtime" owner TO "postgres";
-- Default privileges for postgres role
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON sequences TO "postgres";
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON functions TO "postgres";
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON tables TO "postgres";
-- Default privileges for authenticated role
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON sequences TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT
SELECT
,
insert
,
UPDATE
  ON tables TO "authenticated";
-- Default privileges for service_role
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON sequences TO "service_role";
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON functions TO "service_role";
ALTER DEFAULT PRIVILEGES FOR role "postgres" IN schema "public" GRANT ALL ON tables TO "service_role";
