create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "eventPhoto" text,
    "genre" text,
    "title" text,
    "date" timestamp with time zone,
    "location" text,
    "about" character varying,
    "summary" character varying
);


alter table "public"."events" enable row level security;

create table "public"."profile" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_photo" text,
    "name" text,
    "bio" text,
    "follower_count" integer,
    "following_count" integer,
    "username" text,
    "gems" integer,
    "rank" integer not null
);


alter table "public"."profile" enable row level security;

create table "public"."quests" (
    "created_at" timestamp with time zone not null default now(),
    "titile" text,
    "subTitle" text,
    "description" character varying,
    "questImage" text,
    "guidelines" character varying,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."quests" enable row level security;

create table "public"."skills" (
    "id" character varying not null,
    "created_at" timestamp with time zone not null default now(),
    "skill" character varying not null,
    "sub_skills" text[],
    "user_id" uuid default auth.uid()
);


alter table "public"."skills" enable row level security;

create table "public"."tribes" (
    "created_at" timestamp with time zone not null default now(),
    "tribe_name" text,
    "tribe_photo" text,
    "tribe_cover_photo" text,
    "description" text,
    "subscribers" integer default 0,
    "gems" integer default 0,
    "author_id" uuid default auth.uid(),
    "author" text,
    "event_id" uuid,
    "quest_id" bigint,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."tribes" enable row level security;

create table "public"."tribes_events" (
    "tribe_id" uuid not null,
    "events_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."tribes_events" enable row level security;

create table "public"."tribes_quests" (
    "tribes_id" uuid not null,
    "quests_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."tribes_quests" enable row level security;

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

CREATE UNIQUE INDEX quests_pkey ON public.quests USING btree (id);

CREATE UNIQUE INDEX skills_pkey ON public.skills USING btree (id);

CREATE UNIQUE INDEX tribes_events_pkey ON public.tribes_events USING btree (tribe_id, events_id);

CREATE UNIQUE INDEX tribes_pkey ON public.tribes USING btree (id);

CREATE UNIQUE INDEX tribes_quests_pkey ON public.tribes_quests USING btree (tribes_id, quests_id);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."quests" add constraint "quests_pkey" PRIMARY KEY using index "quests_pkey";

alter table "public"."skills" add constraint "skills_pkey" PRIMARY KEY using index "skills_pkey";

alter table "public"."tribes" add constraint "tribes_pkey" PRIMARY KEY using index "tribes_pkey";

alter table "public"."tribes_events" add constraint "tribes_events_pkey" PRIMARY KEY using index "tribes_events_pkey";

alter table "public"."tribes_quests" add constraint "tribes_quests_pkey" PRIMARY KEY using index "tribes_quests_pkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

alter table "public"."skills" add constraint "skills_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profile(id) not valid;

alter table "public"."skills" validate constraint "skills_user_id_fkey";

alter table "public"."tribes" add constraint "tribes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profile(id) not valid;

alter table "public"."tribes" validate constraint "tribes_author_id_fkey";

alter table "public"."tribes_events" add constraint "tribes_events_events_id_fkey" FOREIGN KEY (events_id) REFERENCES events(id) not valid;

alter table "public"."tribes_events" validate constraint "tribes_events_events_id_fkey";

alter table "public"."tribes_events" add constraint "tribes_events_tribe_id_fkey" FOREIGN KEY (tribe_id) REFERENCES tribes(id) not valid;

alter table "public"."tribes_events" validate constraint "tribes_events_tribe_id_fkey";

alter table "public"."tribes_quests" add constraint "tribes_quests_quests_id_fkey" FOREIGN KEY (quests_id) REFERENCES quests(id) not valid;

alter table "public"."tribes_quests" validate constraint "tribes_quests_quests_id_fkey";

alter table "public"."tribes_quests" add constraint "tribes_quests_tribe_id_fkey" FOREIGN KEY (tribes_id) REFERENCES tribes(id) not valid;

alter table "public"."tribes_quests" validate constraint "tribes_quests_tribe_id_fkey";

set check_function_bodies = off;

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";

grant delete on table "public"."quests" to "anon";

grant insert on table "public"."quests" to "anon";

grant references on table "public"."quests" to "anon";

grant select on table "public"."quests" to "anon";

grant trigger on table "public"."quests" to "anon";

grant truncate on table "public"."quests" to "anon";

grant update on table "public"."quests" to "anon";

grant delete on table "public"."quests" to "authenticated";

grant insert on table "public"."quests" to "authenticated";

grant references on table "public"."quests" to "authenticated";

grant select on table "public"."quests" to "authenticated";

grant trigger on table "public"."quests" to "authenticated";

grant truncate on table "public"."quests" to "authenticated";

grant update on table "public"."quests" to "authenticated";

grant delete on table "public"."quests" to "service_role";

grant insert on table "public"."quests" to "service_role";

grant references on table "public"."quests" to "service_role";

grant select on table "public"."quests" to "service_role";

grant trigger on table "public"."quests" to "service_role";

grant truncate on table "public"."quests" to "service_role";

grant update on table "public"."quests" to "service_role";

grant delete on table "public"."skills" to "anon";

grant insert on table "public"."skills" to "anon";

grant references on table "public"."skills" to "anon";

grant select on table "public"."skills" to "anon";

grant trigger on table "public"."skills" to "anon";

grant truncate on table "public"."skills" to "anon";

grant update on table "public"."skills" to "anon";

grant delete on table "public"."skills" to "authenticated";

grant insert on table "public"."skills" to "authenticated";

grant references on table "public"."skills" to "authenticated";

grant select on table "public"."skills" to "authenticated";

grant trigger on table "public"."skills" to "authenticated";

grant truncate on table "public"."skills" to "authenticated";

grant update on table "public"."skills" to "authenticated";

grant delete on table "public"."skills" to "service_role";

grant insert on table "public"."skills" to "service_role";

grant references on table "public"."skills" to "service_role";

grant select on table "public"."skills" to "service_role";

grant trigger on table "public"."skills" to "service_role";

grant truncate on table "public"."skills" to "service_role";

grant update on table "public"."skills" to "service_role";

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

grant delete on table "public"."tribes_events" to "anon";

grant insert on table "public"."tribes_events" to "anon";

grant references on table "public"."tribes_events" to "anon";

grant select on table "public"."tribes_events" to "anon";

grant trigger on table "public"."tribes_events" to "anon";

grant truncate on table "public"."tribes_events" to "anon";

grant update on table "public"."tribes_events" to "anon";

grant delete on table "public"."tribes_events" to "authenticated";

grant insert on table "public"."tribes_events" to "authenticated";

grant references on table "public"."tribes_events" to "authenticated";

grant select on table "public"."tribes_events" to "authenticated";

grant trigger on table "public"."tribes_events" to "authenticated";

grant truncate on table "public"."tribes_events" to "authenticated";

grant update on table "public"."tribes_events" to "authenticated";

grant delete on table "public"."tribes_events" to "service_role";

grant insert on table "public"."tribes_events" to "service_role";

grant references on table "public"."tribes_events" to "service_role";

grant select on table "public"."tribes_events" to "service_role";

grant trigger on table "public"."tribes_events" to "service_role";

grant truncate on table "public"."tribes_events" to "service_role";

grant update on table "public"."tribes_events" to "service_role";

grant delete on table "public"."tribes_quests" to "anon";

grant insert on table "public"."tribes_quests" to "anon";

grant references on table "public"."tribes_quests" to "anon";

grant select on table "public"."tribes_quests" to "anon";

grant trigger on table "public"."tribes_quests" to "anon";

grant truncate on table "public"."tribes_quests" to "anon";

grant update on table "public"."tribes_quests" to "anon";

grant delete on table "public"."tribes_quests" to "authenticated";

grant insert on table "public"."tribes_quests" to "authenticated";

grant references on table "public"."tribes_quests" to "authenticated";

grant select on table "public"."tribes_quests" to "authenticated";

grant trigger on table "public"."tribes_quests" to "authenticated";

grant truncate on table "public"."tribes_quests" to "authenticated";

grant update on table "public"."tribes_quests" to "authenticated";

grant delete on table "public"."tribes_quests" to "service_role";

grant insert on table "public"."tribes_quests" to "service_role";

grant references on table "public"."tribes_quests" to "service_role";

grant select on table "public"."tribes_quests" to "service_role";

grant trigger on table "public"."tribes_quests" to "service_role";

grant truncate on table "public"."tribes_quests" to "service_role";

grant update on table "public"."tribes_quests" to "service_role";

create policy "Policy with security definer functions"
on "public"."events"
as permissive
for all
to authenticated
using (true);


create policy "user can access all"
on "public"."profile"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Policy with security definer functions"
on "public"."quests"
as permissive
for all
to authenticated
using (true);


create policy "user has full access to skills"
on "public"."skills"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "user has full access to tribes"
on "public"."tribes"
as permissive
for all
to authenticated
using ((auth.uid() = author_id))
with check ((auth.uid() = author_id));


create policy "user has full access to tribes events table"
on "public"."tribes_events"
as permissive
for all
to authenticated
using (true);


create policy "user has full access to tribe quest table"
on "public"."tribes_quests"
as permissive
for all
to authenticated
using (true);

insert into
    storage.buckets (id, name, file_size_limit)
values
    (
        'images',
        'images',
        52428800
    );

create policy "Full Public Access" 
on storage.objects for all 
using (bucket_id = 'images')
with check (bucket_id = 'images');


