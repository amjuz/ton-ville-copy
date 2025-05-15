-- Function to check if tables inherited from public.bases have proper triggers
CREATE
OR REPLACE FUNCTION extensions.check_base_table_triggers() RETURNS TABLE (table_name text, issue_type text, issue_message text) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH inherited_tables AS (
        -- Get all tables that inherit from public.bases
        SELECT c.relname::text AS table_name
        FROM pg_inherits i
        JOIN pg_class c ON i.inhrelid = c.oid
        JOIN pg_class p ON i.inhparent = p.oid
        WHERE p.relname = 'bases'
        AND p.relnamespace = 'public'::regnamespace
    ),
    trigger_checks AS (
        -- Check for handle_updated_at triggers using moddatetime
        SELECT 
            t.table_name::text,
            EXISTS (
                SELECT 1
                FROM pg_trigger tr
                JOIN pg_class tc ON tr.tgrelid = tc.oid
                WHERE tc.relname = t.table_name
                AND tr.tgname = 'handle_updated_at'
                AND tr.tgfoid = (
                    SELECT p.oid 
                    FROM pg_proc p 
                    JOIN pg_namespace n ON p.pronamespace = n.oid 
                    WHERE n.nspname = 'extensions' 
                    AND p.proname = 'moddatetime'
                )
                AND tr.tgtype & (1 << 1) > 0  -- BEFORE trigger
                AND tr.tgtype & (1 << 6) > 0  -- UPDATE event
            ) AS has_trigger
        FROM inherited_tables t
    )
    SELECT 
        tc.table_name,
        'missing_trigger'::text,
        format(
            'Table %I inherits from public.bases but lacks proper handle_updated_at trigger for updated_at column',
            tc.table_name
        )::text
    FROM trigger_checks tc
    WHERE NOT tc.has_trigger;
END;
$$;
-- Add to lint.sql script to include this check
CREATE
OR REPLACE FUNCTION extensions.check_schema_extended(schema_name text) RETURNS TABLE (
  check_type text,
  object_name text,
  issue_type text,
  issue_message text
) LANGUAGE plpgsql AS $$
BEGIN
    -- First return plpgsql_check results
    RETURN QUERY
    SELECT 
        'plpgsql'::text as check_type,
        functionid::text as object_name,
        level::text as issue_type,
        plcheck.message::text as issue_message
    FROM extensions.check_schema(schema_name) plcheck
    WHERE level IN ('error', 'warning');

    -- Then return base table trigger checks
    RETURN QUERY
    SELECT 
        'trigger_check'::text as check_type,
        trig.table_name::text as object_name,
        trig.issue_type::text,
        trig.issue_message::text
    FROM extensions.check_base_table_triggers() trig
    WHERE trig.table_name::text ~ ('^' || schema_name || '\.');

    -- Finally return activity_gems checks
    IF schema_name = 'public' THEN
        RETURN QUERY
        SELECT 
            'activity_check'::text as check_type,
            ag.table_name::text as object_name,
            ag.issue_type::text,
            ag.issue_message::text
        FROM extensions.check_activity_gems() ag;
    END IF;
END;
$$;
-- Function to check activity_gems table against gem_activity enum
CREATE
OR REPLACE FUNCTION extensions.check_activity_gems() RETURNS TABLE (table_name text, issue_type text, issue_message text) LANGUAGE plpgsql AS $$
DECLARE
    missing_activities text[];
    duplicate_activities text[];
BEGIN
    -- Check for missing activities
    WITH enum_values AS (
        SELECT unnest(enum_range(NULL::public.gem_activity)) AS activity
    ),
    activity_gems_values AS (
        SELECT activity FROM public.activity_gems
    )
    SELECT array_agg(activity::text)
    INTO missing_activities
    FROM enum_values e
    WHERE NOT EXISTS (
        SELECT 1 FROM activity_gems_values a 
        WHERE a.activity::text = e.activity::text
    );

    -- Check for duplicate activities
    SELECT array_agg(activity::text)
    INTO duplicate_activities
    FROM (
        SELECT activity
        FROM public.activity_gems
        GROUP BY activity
        HAVING COUNT(*) > 1
    ) dupes;

    -- Return missing activities error if any
    IF array_length(missing_activities, 1) > 0 THEN
        RETURN QUERY
        SELECT 
            'activity_gems'::text,
            'missing_activities'::text,
            format(
                'The following gem_activity enum values are missing from activity_gems table: %s',
                array_to_string(missing_activities, ', ')
            )::text;
    END IF;

    -- Return duplicate activities error if any
    IF array_length(duplicate_activities, 1) > 0 THEN
        RETURN QUERY
        SELECT 
            'activity_gems'::text,
            'duplicate_activities'::text,
            format(
                'The following activities have duplicate entries in activity_gems table: %s',
                array_to_string(duplicate_activities, ', ')
            )::text;
    END IF;
END;
$$;
