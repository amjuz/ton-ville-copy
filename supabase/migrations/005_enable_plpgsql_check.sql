-- Enable plpgsql_check extension
CREATE EXTENSION IF NOT EXISTS "plpgsql_check";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
-- Create a function to check all functions in a schema
CREATE
OR REPLACE FUNCTION extensions.check_schema(schema_name text) RETURNS TABLE (
  functionid regproc,
  lineno int,
  statement text,
  sqlstate text,
  message text,
  detail text,
  hint text,
  level text,
  "position" int,
  query text,
  context text
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        p.oid::regproc as functionid,
        plcheck.lineno,
        plcheck.statement,
        plcheck.sqlstate,
        plcheck.message,
        plcheck.detail,
        plcheck.hint,
        plcheck.level,
        plcheck."position",
        plcheck.query,
        plcheck.context
    FROM pg_proc p
    CROSS JOIN LATERAL plpgsql_check_function_tb(p.oid::regprocedure) plcheck
    WHERE p.pronamespace = schema_name::regnamespace
    AND p.prolang = (SELECT oid FROM pg_language WHERE lanname = 'plpgsql');
END;
$$;
