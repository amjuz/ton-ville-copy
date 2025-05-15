-- Create _handle_new_user function
CREATE
OR REPLACE FUNCTION "public"."_handle_new_user" () RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET
  "search_path" TO '' AS $_$
DECLARE
  referrer_uuid UUID;
  selected_avatar_id UUID;
  avatar_bucket_id TEXT;
  avatar_name TEXT;
  avatar_src TEXT;
  telegram_id_str TEXT;
  user_name TEXT;
BEGIN
  BEGIN
    -- First validate required telegram_id
    telegram_id_str := new.raw_user_meta_data ->> 'telegram_id';
    IF telegram_id_str IS NULL THEN
      RAISE EXCEPTION 'telegram_id is required in user metadata';
    END IF;

    IF NOT telegram_id_str ~ '^[0-9]+$' THEN
      RAISE EXCEPTION 'Invalid telegram_id format: %', telegram_id_str;
    END IF;

    -- Optional: Check referral code
    IF new.raw_user_meta_data ->> 'referral_code' IS NOT NULL THEN
      SELECT user_id
      INTO referrer_uuid
      FROM public.referrals
      WHERE code = new.raw_user_meta_data ->> 'referral_code'
      LIMIT 1;

      IF referrer_uuid IS NULL THEN
        RAISE NOTICE 'Invalid referral code % for user %', new.raw_user_meta_data ->> 'referral_code', new.id;
      END IF;
    END IF;

    -- Optional: Avatar-related operations
    BEGIN
      -- Try to get an avatar
      WITH random_avatars AS (
        SELECT id
        FROM storage.objects
        WHERE bucket_id = 'avatar'
        ORDER BY random()
        LIMIT 5
        FOR UPDATE SKIP LOCKED
      ),
      avatar_usage AS (
        SELECT ra.id AS avatar_id, COUNT(p.image_id) AS usage_count
        FROM random_avatars ra
        LEFT JOIN public.profiles p ON ra.id = p.image_id
        GROUP BY ra.id
      )
      SELECT avatar_id INTO selected_avatar_id
      FROM avatar_usage
      ORDER BY usage_count ASC, random()
      LIMIT 1;

      -- Get avatar details and update metadata if avatar was found
      IF selected_avatar_id IS NOT NULL THEN
        SELECT o.bucket_id, o.name INTO avatar_bucket_id, avatar_name
        FROM storage.objects o
        WHERE o.id = selected_avatar_id;

        IF avatar_bucket_id IS NOT NULL AND avatar_name IS NOT NULL THEN
          avatar_src := avatar_bucket_id || '/' || avatar_name;

          -- Update auth.users within the same exception block
          UPDATE auth.users
          SET raw_user_meta_data = jsonb_set(
            COALESCE(raw_user_meta_data, '{}'),
            '{avatar_src}',
            TO_JSONB(avatar_src)
          )
          WHERE id = new.id;
        END IF;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Avatar processing failed: %, continuing without avatar', SQLERRM;
      selected_avatar_id := NULL;
      avatar_src := NULL;
    END;

    -- Prepare user name with proper fallback
    user_name := CASE
      WHEN (new.raw_user_meta_data ->> 'first_name') IS NOT NULL
           AND (new.raw_user_meta_data ->> 'last_name') IS NOT NULL
      THEN (new.raw_user_meta_data ->> 'first_name') || ' ' || (new.raw_user_meta_data ->> 'last_name')
      WHEN (new.raw_user_meta_data ->> 'first_name') IS NOT NULL
      THEN new.raw_user_meta_data ->> 'first_name'
      WHEN (new.raw_user_meta_data ->> 'last_name') IS NOT NULL
      THEN new.raw_user_meta_data ->> 'last_name'
      ELSE 'Unnamed' || substr(new.id::TEXT, 1, 8)
    END;

    -- Required: Create profile (core operation)
    INSERT INTO public.profiles (
      id,
      name,
      referrer_id,
      image_id
    ) VALUES (
      new.id,
      user_name,
      referrer_uuid,
      selected_avatar_id
    );

    -- Required: Create Telegram account
    INSERT INTO public.telegrams (
      id,
      first_name,
      last_name,
      username,
      photo_url,
      user_id
    ) VALUES (
      telegram_id_str::BIGINT,
      new.raw_user_meta_data ->> 'first_name',
      new.raw_user_meta_data ->> 'last_name',
      new.raw_user_meta_data ->> 'username',
      new.raw_user_meta_data ->> 'photo_url',
      new.id
    );

    RETURN new;
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to process user creation: %', SQLERRM;
  END;
END;
$_$;
-- Set owner
ALTER FUNCTION "public"."_handle_new_user" () OWNER TO "postgres";
-- Add comment
COMMENT ON FUNCTION "public"."_handle_new_user" () IS 'Handles new user registration by creating profile, assigning avatar, and storing Telegram details';
-- Create trigger on auth.users
CREATE
OR REPLACE TRIGGER "on_auth_user_created"
AFTER
INSERT
  ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."_handle_new_user" ();
-- Grant EXECUTE on _handle_new_user to authenticated
GRANT EXECUTE ON FUNCTION "public"."_handle_new_user"() TO "authenticated";
