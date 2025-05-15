DO $$
DECLARE
    r RECORD;
    v_errors TEXT;
BEGIN
    FOR r IN 
        SELECT routine_schema, routine_name 
        FROM information_schema.routines 
        WHERE routine_schema = 'public' 
        AND routine_type = 'FUNCTION'
    LOOP
        SELECT string_agg(message, E'\n')
        INTO v_errors
        FROM plpgsql_check_function_tb(
            funcoid := format('%I.%I', r.routine_schema, r.routine_name)::regproc,
            relid := NULL,
            fatal_errors := true,
            other_warnings := true,
            performance_warnings := true,
            security_warnings := true
        );

        IF v_errors IS NOT NULL THEN
            RAISE WARNING 'Linting errors in function %:
%', r.routine_name, v_errors;
        END IF;
    END LOOP;
END $$;
