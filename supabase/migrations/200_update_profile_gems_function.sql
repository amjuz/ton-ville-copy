-- Create function to update profile gems
CREATE
OR REPLACE FUNCTION public._update_profile_gems() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET
  search_path = '' AS $$
BEGIN
    -- Use schema-qualified names for all table references
    UPDATE public.profiles
    SET gems = (
        SELECT COALESCE(SUM(gems), 0)
        FROM public.gem_transactions
        WHERE user_id = CASE
            WHEN TG_OP = 'DELETE' THEN OLD.user_id
            ELSE NEW.user_id
        END
    )
    WHERE id = CASE
        WHEN TG_OP = 'DELETE' THEN OLD.user_id
        ELSE NEW.user_id
    END;
    RETURN NULL;
END;
$$;
-- Set owner
ALTER FUNCTION public._update_profile_gems() OWNER TO postgres;
-- Add comment
COMMENT ON FUNCTION public._update_profile_gems() IS 'Updates profile gems total when gem transactions change';
-- Create trigger for INSERT, UPDATE, and DELETE on gem_transactions
CREATE
OR REPLACE trigger "handle_updated_at"
AFTER
INSERT
  OR
UPDATE
  OR DELETE ON "public"."gem_transactions" FOR EACH ROW EXECUTE FUNCTION public._update_profile_gems();
-- Ensure the function has the correct EXECUTE grant for the authenticated role
GRANT EXECUTE ON FUNCTION public._update_profile_gems() TO authenticated;
