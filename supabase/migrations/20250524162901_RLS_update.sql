create extension if not exists "pgjwt" with schema "extensions";


drop policy "user can access all" on "public"."profile";

drop policy "user has full access to tribes" on "public"."tribes";

drop policy "Policy with security definer functions" on "public"."events";

drop policy "Policy with security definer functions" on "public"."quests";

create policy "Enable read access for all users"
on "public"."profile"
as permissive
for all
to public
using (true);


create policy "Enable read access for all users"
on "public"."tribes"
as permissive
for all
to public
using (true);


create policy "Policy with security definer functions"
on "public"."events"
as permissive
for all
to public
using (true);


create policy "Policy with security definer functions"
on "public"."quests"
as permissive
for all
to public
using (true);



