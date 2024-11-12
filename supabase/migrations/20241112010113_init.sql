create extension if not exists "pg_hashids" with schema "public" version '1.3';

create type "public"."tenant_role" as enum ('owner', 'admin', 'parent');

create sequence "public"."pet_parents_id_seq";

create sequence "public"."pets_serial_id_seq";

create sequence "public"."tenant_profiles_serial_id_seq";

create sequence "public"."tenants_serial_id_seq";

create table "public"."pet_parents" (
    "id" integer not null default nextval('pet_parents_id_seq'::regclass),
    "tenant_id" text not null default tenant_id(),
    "pet_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "tenant_profile_id" text not null
);


create table "public"."pets" (
    "id" text not null generated always as (id_encode((serial_id)::bigint, 'tenant_profiles'::text, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'::text)) stored,
    "serial_id" integer not null default nextval('pets_serial_id_seq'::regclass),
    "tenant_id" text not null default tenant_id(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "avatar_url" text,
    "added_by" text
);


create table "public"."tenant_profiles" (
    "id" text not null generated always as (id_encode((serial_id)::bigint, 'tenant_profiles'::text, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'::text)) stored,
    "serial_id" integer not null default nextval('tenant_profiles_serial_id_seq'::regclass),
    "tenant_id" text not null default tenant_id(),
    "first_name" text not null,
    "last_name" text,
    "role" tenant_role not null default 'parent'::tenant_role,
    "avatar_url" text,
    "name" text not null generated always as (
CASE
    WHEN (last_name IS NULL) THEN first_name
    ELSE ((first_name || ' '::text) || last_name)
END) stored,
    "initials" text not null generated always as (
CASE
    WHEN (last_name IS NULL) THEN upper("left"(first_name, 1))
    ELSE upper(("left"(first_name, 1) || "left"(last_name, 1)))
END) stored,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid
);


alter table "public"."tenant_profiles" enable row level security;

create table "public"."tenants" (
    "id" text not null generated always as (id_encode((serial_id)::bigint, 'tenants'::text, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'::text)) stored,
    "serial_id" integer not null default nextval('tenants_serial_id_seq'::regclass),
    "name" text not null,
    "added_by" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."tenants" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "email" character varying(255),
    "phone" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."users" enable row level security;

alter sequence "public"."pet_parents_id_seq" owned by "public"."pet_parents"."id";

alter sequence "public"."pets_serial_id_seq" owned by "public"."pets"."serial_id";

alter sequence "public"."tenant_profiles_serial_id_seq" owned by "public"."tenant_profiles"."serial_id";

alter sequence "public"."tenants_serial_id_seq" owned by "public"."tenants"."serial_id";

CREATE INDEX idx_tenant_profiles_name ON public.tenant_profiles USING btree (name);

CREATE UNIQUE INDEX pet_parents_pkey ON public.pet_parents USING btree (id);

CREATE UNIQUE INDEX pets_pkey ON public.pets USING btree (id);

CREATE UNIQUE INDEX tenant_profiles_pkey ON public.tenant_profiles USING btree (id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."pet_parents" add constraint "pet_parents_pkey" PRIMARY KEY using index "pet_parents_pkey";

alter table "public"."pets" add constraint "pets_pkey" PRIMARY KEY using index "pets_pkey";

alter table "public"."tenant_profiles" add constraint "tenant_profiles_pkey" PRIMARY KEY using index "tenant_profiles_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."pet_parents" add constraint "pet_parents_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_pet_id_fkey";

alter table "public"."pet_parents" add constraint "pet_parents_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_tenant_id_fkey";

alter table "public"."pet_parents" add constraint "pet_parents_tenant_profile_id_fkey" FOREIGN KEY (tenant_profile_id) REFERENCES tenant_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_tenant_profile_id_fkey";

alter table "public"."pets" add constraint "pets_added_by_fkey" FOREIGN KEY (added_by) REFERENCES tenant_profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."pets" validate constraint "pets_added_by_fkey";

alter table "public"."pets" add constraint "pets_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets" validate constraint "pets_tenant_id_fkey";

alter table "public"."tenant_profiles" add constraint "tenant_profiles_temp_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."tenant_profiles" validate constraint "tenant_profiles_temp_user_id_fkey";

alter table "public"."tenant_profiles" add constraint "tenant_profiles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tenant_profiles" validate constraint "tenant_profiles_tenant_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_phone_key" UNIQUE using index "users_phone_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_tenant_profile(p_first_name text, p_last_name text DEFAULT NULL::text, p_role tenant_role DEFAULT 'parent'::tenant_role, p_email character varying DEFAULT NULL::character varying, p_phone text DEFAULT NULL::text, p_avatar_url text DEFAULT NULL::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id text;
    v_profile_id text;
    v_existing_user_id uuid;
    v_existing_email varchar(255);
    v_existing_phone text;
    v_auth_user_exists boolean;
begin
    v_tenant_id := tenant_id();

    if (v_tenant_id is null) then
        raise exception 'Missing tenant id';
    end if;

    -- Check if the caller has admin rights for the tenant
    if not is_tenant_admin(v_tenant_id) then
        raise exception 'Insufficient permissions. Must be tenant admin or owner.';
    end if;

    -- Check for existing user by email
    if p_email is not null then
        select id, email, phone
        into v_existing_user_id, v_existing_email, v_existing_phone
        from users
        where email = p_email;

        if found and p_phone is not null and v_existing_phone is not null and p_phone != v_existing_phone then
            raise exception 'Email matches existing user but phone numbers do not match. Email: %, Provided Phone: %, Existing Phone: %',
                p_email, p_phone, v_existing_phone;
        end if;
    end if;

    -- If no user found by email, check by phone
    if v_existing_user_id is null and p_phone is not null then
        select id, email, phone
        into v_existing_user_id, v_existing_email, v_existing_phone
        from users
        where phone = p_phone;

        if found and p_email is not null and v_existing_email is not null and p_email != v_existing_email then
            raise exception 'Phone matches existing user but email addresses do not match. Phone: %, Provided Email: %, Existing Email: %',
                p_phone, p_email, v_existing_email;
        end if;
    end if;

    -- If no existing user found but we have contact details, check auth.users
    if v_existing_user_id is null and (p_email is not null or p_phone is not null) then
        -- Check if auth user exists
        select exists(
            select 1
            from auth.users
            where (p_email is not null and email = p_email)
               or (p_phone is not null and phone = p_phone)
        ) into v_auth_user_exists;

        if not v_auth_user_exists then
            raise exception 'AUTH_REQUIRED: No auth user found for contact details. Please create auth user first.';
        end if;

        -- At this point, we know the auth user exists but public.users entry doesn't
        -- This will be handled by the handle_new_user trigger
    end if;

    -- Create tenant profile
    insert into tenant_profiles (
        user_id,
        first_name,
        last_name,
        role,
        avatar_url
    )
    values (
        v_existing_user_id,
        p_first_name,
        p_last_name,
        p_role,
        p_avatar_url
    )
    returning id into v_profile_id;

    -- Return the created profile with user details
    return v_profile_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pet_for_typesense(p_pet_id text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id text;
    v_result json;
begin
    -- Get the tenant_id for the pet
    select tenant_id into v_tenant_id
    from pets
    where id = p_pet_id;

    -- Check if pet exists
    if v_tenant_id is null then
        raise exception 'Pet not found';
    end if;

    -- Check if the caller has access to this tenant
    if not exists (
        select 1
        from tenant_profiles
        where tenant_id = v_tenant_id
        and user_id = auth.uid()
    ) then
        raise exception 'Access denied';
    end if;

    -- Get pet data
    WITH pet_data AS (
      SELECT
        p.id,
        p.avatar_url,
        EXTRACT(EPOCH FROM p.created_at)::integer as created_at,
        p.name,
        p.tenant_id,
        -- Aggregate parent information into an array of objects
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'avatar_url', tp.avatar_url,
              'id', tp.id,
              'name', tp.name
            )
            ORDER BY tp.name
          ) FILTER (WHERE tp.id IS NOT NULL),
          '[]'::jsonb
        ) as parents
      FROM pets p
      -- Join with pet_parents to get parent relationships
      LEFT JOIN pet_parents pp ON p.id = pp.pet_id AND p.tenant_id = pp.tenant_id
      -- Join with tenant_profiles to get parent details
      LEFT JOIN tenant_profiles tp ON pp.tenant_profile_id = tp.id AND pp.tenant_id = tp.tenant_id
      WHERE p.id = p_pet_id
      GROUP BY p.id, p.avatar_url, p.created_at, p.name, p.tenant_id
    )
    SELECT row_to_json(pet_data)::json
    INTO v_result
    FROM pet_data;

    -- Check if we got any results
    if v_result is null then
        raise exception 'Failed to generate pet data';
    end if;

    return v_result;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pets_for_typesense()
 RETURNS SETOF json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return query
    WITH pet_data AS (
      SELECT
        p.id,
        p.avatar_url,
        EXTRACT(EPOCH FROM p.created_at)::integer as created_at,
        p.name,
        p.tenant_id,
        -- Aggregate parent information into an array of objects
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'avatar_url', tp.avatar_url,
              'id', tp.id,
              'name', tp.name
            )
            ORDER BY tp.name
          ) FILTER (WHERE tp.id IS NOT NULL),
          '[]'::jsonb
        ) as parents
      FROM pets p
      -- Join with pet_parents to get parent relationships
      LEFT JOIN pet_parents pp ON p.id = pp.pet_id AND p.tenant_id = pp.tenant_id
      -- Join with tenant_profiles to get parent details
      LEFT JOIN tenant_profiles tp ON pp.tenant_profile_id = tp.id AND pp.tenant_id = tp.tenant_id
      GROUP BY p.id, p.avatar_url, p.created_at, p.name, p.tenant_id
    )
    SELECT row_to_json(pet_data)::json
    FROM pet_data;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_tenant_profile_for_typesense(p_tenant_profile_id text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id text;
    v_result json;
begin
    -- Get the tenant_id for the profile
    select tenant_id into v_tenant_id
    from tenant_profiles
    where id = p_tenant_profile_id;

    -- Check if profile exists
    if v_tenant_id is null then
        raise exception 'Tenant profile not found';
    end if;

    -- Check if the caller has access to this tenant
    if not exists (
        select 1
        from tenant_profiles
        where tenant_id = v_tenant_id
        and user_id = auth.uid()
    ) then
        raise exception 'Access denied';
    end if;

    -- Get profile data
    WITH profile_data AS (
        SELECT
            tp.id,
            tp.avatar_url,
            EXTRACT(EPOCH FROM tp.created_at)::integer as created_at,
            u.email,
            tp.first_name,
            tp.initials,
            tp.last_name,
            tp.name,
            ARRAY_REMOVE(ARRAY[u.phone], NULL) as phone,
            tp.role::text,
            tp.tenant_id,
            tp.user_id::text,
            -- Aggregate pet information into an array of objects
            COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'avatar_url', p.avatar_url,
                        'id', p.id,
                        'name', p.name
                    )
                    ORDER BY p.name
                ) FILTER (WHERE p.id IS NOT NULL),
                '[]'::jsonb
            ) as pets
        FROM tenant_profiles tp
        -- Join with users to get email and phone
        LEFT JOIN users u ON tp.user_id = u.id
        -- Join with pet_parents to get pet relationships
        LEFT JOIN pet_parents pp ON tp.id = pp.tenant_profile_id AND tp.tenant_id = pp.tenant_id
        -- Join with pets to get pet details
        LEFT JOIN pets p ON pp.pet_id = p.id AND pp.tenant_id = p.tenant_id
        WHERE tp.id = p_tenant_profile_id
        GROUP BY
            tp.id,
            tp.avatar_url,
            tp.created_at,
            u.email,
            tp.first_name,
            tp.initials,
            tp.last_name,
            tp.name,
            u.phone,
            tp.role,
            tp.tenant_id,
            tp.user_id
    )
    SELECT row_to_json(profile_data)::json
    INTO v_result
    FROM profile_data;

    -- Check if we got any results
    if v_result is null then
        raise exception 'Failed to generate profile data';
    end if;

    return v_result;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_tenant_profiles_for_typesense()
 RETURNS SETOF json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return query
    WITH profile_data AS (
        SELECT
            tp.id,
            tp.avatar_url,
            EXTRACT(EPOCH FROM tp.created_at)::integer as created_at,
            u.email,
            tp.first_name,
            tp.initials,
            tp.last_name,
            tp.name,
            ARRAY_REMOVE(ARRAY[u.phone], NULL) as phone,
            tp.role::text,
            tp.tenant_id,
            tp.user_id::text,
            -- Aggregate pet information into an array of objects
            COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'avatar_url', p.avatar_url,
                        'id', p.id,
                        'name', p.name
                    )
                    ORDER BY p.name
                ) FILTER (WHERE p.id IS NOT NULL),
                '[]'::jsonb
            ) as pets
        FROM tenant_profiles tp
        -- Join with users to get email and phone
        LEFT JOIN users u ON tp.user_id = u.id
        -- Join with pet_parents to get pet relationships
        LEFT JOIN pet_parents pp ON tp.id = pp.tenant_profile_id AND tp.tenant_id = pp.tenant_id
        -- Join with pets to get pet details
        LEFT JOIN pets p ON pp.pet_id = p.id AND pp.tenant_id = p.tenant_id
        GROUP BY
            tp.id,
            tp.avatar_url,
            tp.created_at,
            u.email,
            tp.first_name,
            tp.initials,
            tp.last_name,
            tp.name,
            u.phone,
            tp.role,
            tp.tenant_id,
            tp.user_id
    )
    SELECT row_to_json(profile_data)::json
    FROM profile_data;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
    insert into public.users (id, email, phone)
    values (new.id, new.email, new.phone)
    on conflict (id) do update
    set email = excluded.email,
        phone = excluded.phone;
    return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_tenant_admin(tenant_id text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
    user_role tenant_role;
begin
    -- Get the user's role for the specified tenant
    select role into user_role
    from tenant_profiles
    where tenant_profiles.tenant_id = $1
    and user_id = auth.uid()
    limit 1;

    -- Return true if user is an owner or admin
    return user_role in ('owner', 'admin');
end;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_id()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    tenant_id text;
BEGIN
    raise info 'Test: %', auth.jwt();

    tenant_id := auth.jwt() -> 'app_metadata' ->> 'tenant_id';

    RETURN tenant_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_profile_id()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_tenant_profile_id text;
BEGIN
    v_tenant_profile_id := auth.jwt() -> 'app_metadata' ->> 'tenant_profile_id';

    RETURN v_tenant_profile_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_role()
 RETURNS tenant_role
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_tenant_role tenant_role;
BEGIN
    raise info 'Test: %', auth.jwt();

    v_tenant_role := (auth.jwt() -> 'app_metadata' ->> 'tenant_role')::tenant_role;

    RETURN v_tenant_role;
END;
$function$
;

grant delete on table "public"."pet_parents" to "anon";

grant insert on table "public"."pet_parents" to "anon";

grant references on table "public"."pet_parents" to "anon";

grant select on table "public"."pet_parents" to "anon";

grant trigger on table "public"."pet_parents" to "anon";

grant truncate on table "public"."pet_parents" to "anon";

grant update on table "public"."pet_parents" to "anon";

grant delete on table "public"."pet_parents" to "authenticated";

grant insert on table "public"."pet_parents" to "authenticated";

grant references on table "public"."pet_parents" to "authenticated";

grant select on table "public"."pet_parents" to "authenticated";

grant trigger on table "public"."pet_parents" to "authenticated";

grant truncate on table "public"."pet_parents" to "authenticated";

grant update on table "public"."pet_parents" to "authenticated";

grant delete on table "public"."pet_parents" to "service_role";

grant insert on table "public"."pet_parents" to "service_role";

grant references on table "public"."pet_parents" to "service_role";

grant select on table "public"."pet_parents" to "service_role";

grant trigger on table "public"."pet_parents" to "service_role";

grant truncate on table "public"."pet_parents" to "service_role";

grant update on table "public"."pet_parents" to "service_role";

grant delete on table "public"."pets" to "anon";

grant insert on table "public"."pets" to "anon";

grant references on table "public"."pets" to "anon";

grant select on table "public"."pets" to "anon";

grant trigger on table "public"."pets" to "anon";

grant truncate on table "public"."pets" to "anon";

grant update on table "public"."pets" to "anon";

grant delete on table "public"."pets" to "authenticated";

grant insert on table "public"."pets" to "authenticated";

grant references on table "public"."pets" to "authenticated";

grant select on table "public"."pets" to "authenticated";

grant trigger on table "public"."pets" to "authenticated";

grant truncate on table "public"."pets" to "authenticated";

grant update on table "public"."pets" to "authenticated";

grant delete on table "public"."pets" to "service_role";

grant insert on table "public"."pets" to "service_role";

grant references on table "public"."pets" to "service_role";

grant select on table "public"."pets" to "service_role";

grant trigger on table "public"."pets" to "service_role";

grant truncate on table "public"."pets" to "service_role";

grant update on table "public"."pets" to "service_role";

grant delete on table "public"."tenant_profiles" to "anon";

grant insert on table "public"."tenant_profiles" to "anon";

grant references on table "public"."tenant_profiles" to "anon";

grant select on table "public"."tenant_profiles" to "anon";

grant trigger on table "public"."tenant_profiles" to "anon";

grant truncate on table "public"."tenant_profiles" to "anon";

grant update on table "public"."tenant_profiles" to "anon";

grant delete on table "public"."tenant_profiles" to "authenticated";

grant insert on table "public"."tenant_profiles" to "authenticated";

grant references on table "public"."tenant_profiles" to "authenticated";

grant select on table "public"."tenant_profiles" to "authenticated";

grant trigger on table "public"."tenant_profiles" to "authenticated";

grant truncate on table "public"."tenant_profiles" to "authenticated";

grant update on table "public"."tenant_profiles" to "authenticated";

grant delete on table "public"."tenant_profiles" to "service_role";

grant insert on table "public"."tenant_profiles" to "service_role";

grant references on table "public"."tenant_profiles" to "service_role";

grant select on table "public"."tenant_profiles" to "service_role";

grant trigger on table "public"."tenant_profiles" to "service_role";

grant truncate on table "public"."tenant_profiles" to "service_role";

grant update on table "public"."tenant_profiles" to "service_role";

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

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Tenant owners and admins can create profiles"
on "public"."tenant_profiles"
as permissive
for insert
to public
with check (is_tenant_admin(tenant_id));


create policy "Tenant owners and admins can delete profiles"
on "public"."tenant_profiles"
as permissive
for delete
to public
using (is_tenant_admin(tenant_id));


create policy "Tenant owners and admins can update profiles"
on "public"."tenant_profiles"
as permissive
for update
to public
using (is_tenant_admin(tenant_id))
with check (is_tenant_admin(tenant_id));


create policy "Tenant owners and admins can view all tenant profiles"
on "public"."tenant_profiles"
as permissive
for select
to public
using (is_tenant_admin(tenant_id));


create policy "Users can view their own tenant profiles"
on "public"."tenant_profiles"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Only owners can update tenant details"
on "public"."tenants"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM tenant_profiles tp
  WHERE ((tp.tenant_id = tenants.id) AND (tp.user_id = auth.uid()) AND (tp.role = 'owner'::tenant_role)))));


create policy "Users can see tenants they belong to"
on "public"."tenants"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM tenant_profiles tp
  WHERE ((tp.tenant_id = tenants.id) AND (tp.user_id = auth.uid())))));


create policy "Tenant admins can see their members' data"
on "public"."users"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM tenant_profiles tp
  WHERE ((tp.user_id = users.id) AND is_tenant_admin(tp.tenant_id)))));


create policy "Users can see their own data"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));



