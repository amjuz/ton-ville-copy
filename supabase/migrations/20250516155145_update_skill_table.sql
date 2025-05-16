alter table "public"."skills" alter column "id" drop identity;

alter table "public"."skills" alter column "id" set data type character varying using "id"::character varying;


