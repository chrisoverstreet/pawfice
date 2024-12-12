drop trigger if exists "set_timestamp" on "public"."pet_parents";

alter table "public"."pet_parents" alter column "id" drop default;

alter table "public"."pet_parents" alter column "id" add generated always as identity;

alter table "public"."pet_parents" alter column "id" set data type bigint using "id"::bigint;

alter table "public"."pet_parents" alter column "pet_id" set not null;

alter table "public"."pet_parents" alter column "tenant_id" drop default;

alter table "public"."pet_parents" alter column "tenant_id" set not null;

alter table "public"."pet_parents" alter column "user_id" set not null;

drop sequence if exists "public"."pet_parents_id_seq";

CREATE UNIQUE INDEX pet_parents_pet_id_user_id_key ON public.pet_parents USING btree (pet_id, user_id);

alter table "public"."pet_parents" add constraint "pet_parents_pet_id_user_id_key" UNIQUE using index "pet_parents_pet_id_user_id_key";


