alter table "public"."tribes" add column "twitter_id" text;

alter table "public"."tribes"
drop constraint "tribes_author_id_fkey";

alter table "public"."tribes"
alter column "author_id"
drop default;


create table
    "public"."tribe_profiles" (
        "tribe_id" uuid not null,
        "profile_id" uuid not null default auth.uid (),
        "created_at" timestamp
        with
            time zone not null default now ()
    );

alter table "public"."tribe_profiles" enable row level security;

CREATE UNIQUE INDEX tribe_profiles_pkey ON public.tribe_profiles USING btree (tribe_id, profile_id);

alter table "public"."tribe_profiles" add constraint "tribe_profiles_pkey" PRIMARY KEY using index "tribe_profiles_pkey";

alter table "public"."tribe_profiles" add constraint "tribe_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile (id) not valid;

alter table "public"."tribe_profiles" validate constraint "tribe_profiles_profile_id_fkey";

alter table "public"."tribe_profiles" add constraint "tribe_profiles_tribe_id_fkey" FOREIGN KEY (tribe_id) REFERENCES tribes (id) not valid;

alter table "public"."tribe_profiles" validate constraint "tribe_profiles_tribe_id_fkey";

grant delete on table "public"."tribe_profiles" to "anon";

grant insert on table "public"."tribe_profiles" to "anon";

grant references on table "public"."tribe_profiles" to "anon";

grant
select
    on table "public"."tribe_profiles" to "anon";

grant trigger on table "public"."tribe_profiles" to "anon";

grant truncate on table "public"."tribe_profiles" to "anon";

grant
update on table "public"."tribe_profiles" to "anon";

grant delete on table "public"."tribe_profiles" to "authenticated";

grant insert on table "public"."tribe_profiles" to "authenticated";

grant references on table "public"."tribe_profiles" to "authenticated";

grant
select
    on table "public"."tribe_profiles" to "authenticated";

grant trigger on table "public"."tribe_profiles" to "authenticated";

grant truncate on table "public"."tribe_profiles" to "authenticated";

grant
update on table "public"."tribe_profiles" to "authenticated";

grant delete on table "public"."tribe_profiles" to "service_role";

grant insert on table "public"."tribe_profiles" to "service_role";

grant references on table "public"."tribe_profiles" to "service_role";

grant
select
    on table "public"."tribe_profiles" to "service_role";

grant trigger on table "public"."tribe_profiles" to "service_role";

grant truncate on table "public"."tribe_profiles" to "service_role";

grant
update on table "public"."tribe_profiles" to "service_role";

create policy "owner has full access" on "public"."tribe_profiles" as permissive for all to authenticated using (true);

alter table "public"."tribes" alter column "author_id" set default auth.uid();

alter table "public"."tribes" add constraint "tribes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profile(id) not valid;

alter table "public"."tribes" validate constraint "tribes_author_id_fkey";


