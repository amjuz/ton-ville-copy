-- Create get_gem_leaderboard function
CREATE
OR REPLACE FUNCTION public.get_gem_leaderboard(p_offset integer DEFAULT 1, p_limit integer DEFAULT 10) RETURNS TABLE (
  user_id uuid,
  rank numeric,
  total_gems numeric,
  name text,
  image_url text
) LANGUAGE plpgsql STABLE SECURITY DEFINER
SET
  search_path = '' -- Prevent search_path injection
  AS $$
DECLARE
    v_offset integer := p_offset;
    v_limit integer := p_limit;
BEGIN
    -- Use schema-qualified names
    RETURN QUERY
    SELECT
        p.id,
        row_number() OVER (ORDER BY p.gems DESC)::numeric AS rank,
        p.gems::numeric AS total_gems,
        p.name,
        CASE 
            WHEN obj.id IS NOT NULL THEN obj.bucket_id || '/' || obj.name
            ELSE NULL
        END as image_url
    FROM public.profiles p
    LEFT JOIN storage.objects obj ON p.image_id = obj.id
    ORDER BY p.gems DESC
    OFFSET v_offset - 1 LIMIT v_limit;
END;
$$;
-- Set owner
ALTER FUNCTION public.get_gem_leaderboard(integer, integer) OWNER TO postgres;
-- Grants
GRANT EXECUTE ON FUNCTION public.get_gem_leaderboard(integer, integer) TO authenticated;
-- Add comment
COMMENT ON FUNCTION public.get_gem_leaderboard(integer, integer) IS 'Returns paginated leaderboard of users ranked by gems using offset/limit pagination.';
