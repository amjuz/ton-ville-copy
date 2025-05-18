create table "public"."tribes" (
    "id" uuid not null default gen_random_uuid(),
    "tribe_name" text not null,
    "description" text,
    "tribe_cover_photo" text,
    "tribe_photo" text not null,
    "subscribers" integer default 0,
    "gems" integer default 0,
    "author_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."tribes" enable row level security;

alter table "public"."tribes" add constraint "tribes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profiles(id) not valid;

alter table "public"."tribes" validate constraint "tribes_author_id_fkey";

grant delete on table "public"."tribes" to "anon";

grant insert on table "public"."tribes" to "anon";

grant references on table "public"."tribes" to "anon";

grant select on table "public"."tribes" to "anon";

grant trigger on table "public"."tribes" to "anon";

grant truncate on table "public"."tribes" to "anon";

grant update on table "public"."tribes" to "anon";

grant delete on table "public"."tribes" to "authenticated";

grant insert on table "public"."tribes" to "authenticated";

grant references on table "public"."tribes" to "authenticated";

grant select on table "public"."tribes" to "authenticated";

grant trigger on table "public"."tribes" to "authenticated";

grant truncate on table "public"."tribes" to "authenticated";

grant update on table "public"."tribes" to "authenticated";

grant delete on table "public"."tribes" to "service_role";

grant insert on table "public"."tribes" to "service_role";

grant references on table "public"."tribes" to "service_role";

grant select on table "public"."tribes" to "service_role";

grant trigger on table "public"."tribes" to "service_role";

grant truncate on table "public"."tribes" to "service_role";

grant update on table "public"."tribes" to "service_role";

create policy "Owner have full access"
on "public"."tribes"
as permissive
for all
to authenticated
using ((auth.uid() = author_id))
with check ((auth.uid() = author_id));



