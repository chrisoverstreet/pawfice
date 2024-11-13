create extension if not exists "pg_hashids" with schema "extensions";


create type "public"."tenant_membership_role" as enum ('owner');

create type "public"."tenant_role" as enum ('owner', 'admin');

create type "public"."tenant_user_role" as enum ('owner', 'admin', 'staff', 'customer');

create sequence "public"."tenant_memberships_id_seq";

create sequence "public"."tenants_serial_id_seq";

create table "public"."platform_profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "first_name" text,
    "last_name" text
);


alter table "public"."platform_profiles" enable row level security;

create table "public"."tenant_memberships" (
    "id" integer not null default nextval('tenant_memberships_id_seq'::regclass),
    "tenant_id" text not null,
    "user_id" uuid not null,
    "role" tenant_membership_role not null default 'owner'::tenant_membership_role,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."tenant_user_profiles" (
    "id" uuid not null,
    "tenant_id" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "first_name" text,
    "last_name" text,
    "role" tenant_user_role not null default 'customer'::tenant_user_role
);


create table "public"."tenants" (
    "serial_id" integer not null default nextval('tenants_serial_id_seq'::regclass),
    "id" text not null generated always as (id_encode((serial_id)::bigint, 'tenants'::text, 6)) stored,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter sequence "public"."tenant_memberships_id_seq" owned by "public"."tenant_memberships"."id";

alter sequence "public"."tenants_serial_id_seq" owned by "public"."tenants"."serial_id";

CREATE INDEX idx_tenant_memberships_tenant_id ON public.tenant_memberships USING btree (tenant_id);

CREATE INDEX idx_tenant_memberships_user_id ON public.tenant_memberships USING btree (user_id);

CREATE INDEX idx_tenant_user_profiles_tenant_id ON public.tenant_user_profiles USING btree (tenant_id);

CREATE UNIQUE INDEX platform_profiles_pkey ON public.platform_profiles USING btree (id);

CREATE UNIQUE INDEX tenant_memberships_tenant_id_user_id_key ON public.tenant_memberships USING btree (tenant_id, user_id);

CREATE UNIQUE INDEX tenant_user_profiles_pkey ON public.tenant_user_profiles USING btree (id);

CREATE UNIQUE INDEX tenant_user_profiles_tenant_id_id_key ON public.tenant_user_profiles USING btree (tenant_id, id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

alter table "public"."platform_profiles" add constraint "platform_profiles_pkey" PRIMARY KEY using index "platform_profiles_pkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_pkey" PRIMARY KEY using index "tenant_user_profiles_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."platform_profiles" add constraint "platform_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."platform_profiles" validate constraint "platform_profiles_id_fkey";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_memberships" validate constraint "tenant_memberships_tenant_id_fkey";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_tenant_id_user_id_key" UNIQUE using index "tenant_memberships_tenant_id_user_id_key";

alter table "public"."tenant_memberships" add constraint "tenant_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_memberships" validate constraint "tenant_memberships_user_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_user_profiles" validate constraint "tenant_user_profiles_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_user_profiles" validate constraint "tenant_user_profiles_tenant_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_tenant_id_id_key" UNIQUE using index "tenant_user_profiles_tenant_id_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.has_platform_access()
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
    SELECT EXISTS (
        SELECT 1 FROM platform_profiles
        WHERE id = auth.uid()
    );
$function$
;

grant delete on table "public"."platform_profiles" to "anon";

grant insert on table "public"."platform_profiles" to "anon";

grant references on table "public"."platform_profiles" to "anon";

grant select on table "public"."platform_profiles" to "anon";

grant trigger on table "public"."platform_profiles" to "anon";

grant truncate on table "public"."platform_profiles" to "anon";

grant update on table "public"."platform_profiles" to "anon";

grant delete on table "public"."platform_profiles" to "authenticated";

grant insert on table "public"."platform_profiles" to "authenticated";

grant references on table "public"."platform_profiles" to "authenticated";

grant select on table "public"."platform_profiles" to "authenticated";

grant trigger on table "public"."platform_profiles" to "authenticated";

grant truncate on table "public"."platform_profiles" to "authenticated";

grant update on table "public"."platform_profiles" to "authenticated";

grant delete on table "public"."platform_profiles" to "service_role";

grant insert on table "public"."platform_profiles" to "service_role";

grant references on table "public"."platform_profiles" to "service_role";

grant select on table "public"."platform_profiles" to "service_role";

grant trigger on table "public"."platform_profiles" to "service_role";

grant truncate on table "public"."platform_profiles" to "service_role";

grant update on table "public"."platform_profiles" to "service_role";

grant delete on table "public"."tenant_memberships" to "anon";

grant insert on table "public"."tenant_memberships" to "anon";

grant references on table "public"."tenant_memberships" to "anon";

grant select on table "public"."tenant_memberships" to "anon";

grant trigger on table "public"."tenant_memberships" to "anon";

grant truncate on table "public"."tenant_memberships" to "anon";

grant update on table "public"."tenant_memberships" to "anon";

grant delete on table "public"."tenant_memberships" to "authenticated";

grant insert on table "public"."tenant_memberships" to "authenticated";

grant references on table "public"."tenant_memberships" to "authenticated";

grant select on table "public"."tenant_memberships" to "authenticated";

grant trigger on table "public"."tenant_memberships" to "authenticated";

grant truncate on table "public"."tenant_memberships" to "authenticated";

grant update on table "public"."tenant_memberships" to "authenticated";

grant delete on table "public"."tenant_memberships" to "service_role";

grant insert on table "public"."tenant_memberships" to "service_role";

grant references on table "public"."tenant_memberships" to "service_role";

grant select on table "public"."tenant_memberships" to "service_role";

grant trigger on table "public"."tenant_memberships" to "service_role";

grant truncate on table "public"."tenant_memberships" to "service_role";

grant update on table "public"."tenant_memberships" to "service_role";

grant delete on table "public"."tenant_user_profiles" to "anon";

grant insert on table "public"."tenant_user_profiles" to "anon";

grant references on table "public"."tenant_user_profiles" to "anon";

grant select on table "public"."tenant_user_profiles" to "anon";

grant trigger on table "public"."tenant_user_profiles" to "anon";

grant truncate on table "public"."tenant_user_profiles" to "anon";

grant update on table "public"."tenant_user_profiles" to "anon";

grant delete on table "public"."tenant_user_profiles" to "authenticated";

grant insert on table "public"."tenant_user_profiles" to "authenticated";

grant references on table "public"."tenant_user_profiles" to "authenticated";

grant select on table "public"."tenant_user_profiles" to "authenticated";

grant trigger on table "public"."tenant_user_profiles" to "authenticated";

grant truncate on table "public"."tenant_user_profiles" to "authenticated";

grant update on table "public"."tenant_user_profiles" to "authenticated";

grant delete on table "public"."tenant_user_profiles" to "service_role";

grant insert on table "public"."tenant_user_profiles" to "service_role";

grant references on table "public"."tenant_user_profiles" to "service_role";

grant select on table "public"."tenant_user_profiles" to "service_role";

grant trigger on table "public"."tenant_user_profiles" to "service_role";

grant truncate on table "public"."tenant_user_profiles" to "service_role";

grant update on table "public"."tenant_user_profiles" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant select on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant select on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant truncate on table "public"."tenants" to "service_role";

grant update on table "public"."tenants" to "service_role";

create policy "Users can update their own platform profile"
on "public"."platform_profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view their own platform profile"
on "public"."platform_profiles"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Tenant owners can manage memberships"
on "public"."tenant_memberships"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM tenant_memberships tenant_memberships_1
  WHERE ((tenant_memberships_1.tenant_id = tenant_memberships_1.tenant_id) AND (tenant_memberships_1.user_id = auth.uid()) AND (tenant_memberships_1.role = 'owner'::tenant_membership_role)))));


create policy "Users can view their tenant memberships"
on "public"."tenant_memberships"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Platform owners can update their tenants"
on "public"."tenants"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM tenant_memberships
  WHERE ((tenant_memberships.tenant_id = tenants.id) AND (tenant_memberships.user_id = auth.uid()) AND (tenant_memberships.role = 'owner'::tenant_membership_role)))));


create policy "Platform users can view tenants they have access to"
on "public"."tenants"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM tenant_memberships
  WHERE ((tenant_memberships.tenant_id = tenants.id) AND (tenant_memberships.user_id = auth.uid())))));


create policy "Tenant users can view their own tenant"
on "public"."tenants"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM tenant_user_profiles
  WHERE ((tenant_user_profiles.tenant_id = tenants.id) AND (tenant_user_profiles.id = auth.uid())))));



