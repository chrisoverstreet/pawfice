create extension if not exists "pg_hashids" with schema "extensions";


create type "public"."tenant_role" as enum ('owner', 'admin', 'parent');

create sequence "public"."pet_parents_id_seq";

create sequence "public"."pets_id_seq";

create sequence "public"."tenants_id_seq";

create sequence "public"."users_id_seq";

create table "public"."pet_parents" (
    "id" integer not null default nextval('pet_parents_id_seq'::regclass),
    "tenant_id" bigint default tenant_id(),
    "pet_id" bigint,
    "user_id" bigint,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."pets" (
    "id" integer not null default nextval('pets_id_seq'::regclass),
    "short_id" text not null generated always as (encode_id('pets'::text, (id)::bigint)) stored,
    "tenant_id" bigint default tenant_id(),
    "name" text not null,
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."tenants" (
    "id" integer not null default nextval('tenants_id_seq'::regclass),
    "short_id" text not null generated always as (encode_id('tenants'::text, (id)::bigint)) stored,
    "name" text,
    "created_by" uuid default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."users" (
    "id" integer not null default nextval('users_id_seq'::regclass),
    "short_id" text not null generated always as (encode_id('users'::text, (id)::bigint)) stored,
    "tenant_id" bigint,
    "auth_id" uuid,
    "first_name" text,
    "last_name" text,
    "email" text,
    "email_verified" boolean not null default false,
    "phone" text,
    "phone_verified" boolean not null default false,
    "avatar_url" text,
    "role" tenant_role not null default 'parent'::tenant_role,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "name" text generated always as (
CASE
    WHEN ((first_name IS NOT NULL) AND (last_name IS NOT NULL)) THEN ((first_name || ' '::text) || last_name)
    WHEN (first_name IS NOT NULL) THEN first_name
    WHEN (last_name IS NOT NULL) THEN last_name
    ELSE NULL::text
END) stored,
    "initials" text generated always as (
CASE
    WHEN ((first_name IS NOT NULL) AND (last_name IS NOT NULL)) THEN upper(("left"(first_name, 1) || "left"(last_name, 1)))
    WHEN (first_name IS NOT NULL) THEN upper("left"(first_name, 1))
    WHEN (last_name IS NOT NULL) THEN upper("left"(last_name, 1))
    ELSE NULL::text
END) stored
);


alter sequence "public"."pet_parents_id_seq" owned by "public"."pet_parents"."id";

alter sequence "public"."pets_id_seq" owned by "public"."pets"."id";

alter sequence "public"."tenants_id_seq" owned by "public"."tenants"."id";

alter sequence "public"."users_id_seq" owned by "public"."users"."id";

CREATE UNIQUE INDEX pets_pkey ON public.pets USING btree (id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."pets" add constraint "pets_pkey" PRIMARY KEY using index "pets_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."pet_parents" add constraint "pet_parents_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_pet_id_fkey";

alter table "public"."pet_parents" add constraint "pet_parents_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_tenant_id_fkey";

alter table "public"."pet_parents" add constraint "pet_parents_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."pet_parents" validate constraint "pet_parents_user_id_fkey";

alter table "public"."pets" add constraint "pets_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."pets" validate constraint "pets_tenant_id_fkey";

alter table "public"."tenants" add constraint "tenants_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."tenants" validate constraint "tenants_created_by_fkey";

alter table "public"."users" add constraint "users_auth_id_fkey" FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_auth_id_fkey";

alter table "public"."users" add constraint "users_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_tenant_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_tenant(p_name text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_auth_id   uuid;
    v_auth_user auth.users;
    v_tenant_id bigint;
begin
    v_auth_id = auth.uid();

    if v_auth_id is null then
        raise exception 'Must be signed in';
    end if;

    select * from v_auth_user where id = v_auth_id into v_auth_user;

    if v_auth_user is null then
        raise exception 'Invalid user account';
    end if;

    insert into tenants (name) values (p_name) returning id into v_tenant_id;

    insert into users (tenant_id, auth_id, first_name, last_name, email, email_verified, phone, phone_verified,
                       avatar_url, role)
    values (v_tenant_id, v_auth_id, v_auth_user.raw_user_meta_data ->> 'first_name',
            v_auth_user.raw_user_meta_data -> 'last_name',
            v_auth_user.email, v_auth_user.email_confirmed_at is not null, v_auth_user.phone,
            v_auth_user.phone_confirmed_at is not null,
            coalesce(v_auth_user.raw_user_meta_data ->> 'avatar_url', v_auth_user.raw_user_meta_data ->> 'avatar',
                     v_auth_user.raw_user_meta_data ->> 'picture'), 'owner');

    return v_tenant_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_user(p_first_name text, p_last_name text DEFAULT NULL::text, p_email text DEFAULT NULL::text, p_phone text DEFAULT NULL::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_tenant_id             bigint;
    v_tenant_role           TEXT;
    v_existing_auth_user_id UUID;
    v_user_short_id         text;
BEGIN
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    IF v_tenant_id is null or v_tenant_role NOT IN ('owner', 'admin') THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;

    -- If email is provided, check if auth user exists
    IF p_email IS NOT NULL THEN
        SELECT id
        INTO v_existing_auth_user_id
        FROM auth.users
        WHERE auth.users.email = p_email;
    END IF;

    -- Create tenant user profile
    INSERT INTO public.users (auth_id,
                              tenant_id,
                              first_name,
                              last_name,
                              phone,
                              role)
    VALUES (v_existing_auth_user_id,
            v_tenant_id,
            p_first_name,
            p_last_name,
            p_phone,
            'parent')
    RETURNING short_id INTO v_user_short_id;

    RETURN v_user_short_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
declare
    v_tenant_short_id text;
    v_tenant_id       bigint;
    v_claims          jsonb;
    v_tenant_role     public.tenant_role;
begin
    v_tenant_short_id = event -> 'claims' -> 'user_metadata' ->> 'tenant_short_id';

    v_claims := event -> 'claims';

    if v_tenant_short_id is null then
        select t.short_id
        into v_tenant_short_id
        from public.users u
                 inner join public.tenants t on t.id = u.tenant_id
        where u.auth_id = (event ->> 'user_id')::uuid
        order by t.created_at desc
        limit 1;
    end if;

    if v_tenant_short_id is null then
        v_claims = jsonb_set(v_claims, '{tenant_id}', 'null');
        v_claims = jsonb_set(v_claims, '{tenant_short_id}', 'null');
        v_claims = jsonb_set(v_claims, '{tenant_role}', 'null');
    else
        v_tenant_id := public.decode_short_id('tenants', v_tenant_short_id);
        v_claims = jsonb_set(v_claims, '{tenant_id}', to_jsonb(v_tenant_id));
        v_claims = jsonb_set(v_claims, '{tenant_short_id}', to_jsonb(v_tenant_short_id));

        select role into v_tenant_role from public.users where auth_id = (event ->> 'user_id')::uuid;

        if v_tenant_role is null then
            v_claims = jsonb_set(v_claims, '{tenant_role}', 'null');
        else
            v_claims = jsonb_set(v_claims, '{tenant_role}', to_jsonb(v_tenant_role));
        end if;
    end if;

    event := jsonb_set(event, '{claims}', v_claims);

    return event;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.decode_short_id(p_table_name text, p_short_id text)
 RETURNS bigint
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
    begin
        return unnest(extensions.id_decode(p_short_id, p_table_name, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))::bigint;
    end;
$function$
;

CREATE OR REPLACE FUNCTION public.encode_id(p_table_name text, p_id bigint)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
    begin
        return extensions.id_encode(p_id, p_table_name, 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    end;
$function$
;

CREATE OR REPLACE FUNCTION public.format_pet_for_typesense(pet_short_id text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  result json;
begin
  with pet_parents_agg as (
    select
      pp.pet_id,
      jsonb_agg(
        jsonb_build_object(
          'avatar_url', u.avatar_url,
          'id', u.short_id,
          'name', u.name
        )
      ) as parents
    from pet_parents pp
    join users u on u.id = pp.user_id
    where pp.pet_id = (select id from pets where short_id = pet_short_id)
    group by pp.pet_id
  )
  select
    json_build_object(
      'avatar_url', p.avatar_url,
      'created_at', extract(epoch from p.created_at)::int,
      'id', p.short_id,
      'name', p.name,
      'tenant_id', encode_id('tenants', p.tenant_id),
      'parents', coalesce(pa.parents, '[]'::jsonb)
    ) into result
  from public.pets p
  left join pet_parents_agg pa on pa.pet_id = p.id
  where p.short_id = pet_short_id;

  return result;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.format_pets_for_typesense()
 RETURNS SETOF json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  return query
  with pet_parents_agg as (
    select
      pp.pet_id,
      jsonb_agg(
        jsonb_build_object(
          'avatar_url', u.avatar_url,
          'id', u.short_id,
          'name', u.name
        )
      ) as parents
    from pet_parents pp
    join users u on u.id = pp.user_id
    group by pp.pet_id
  )
  select
    json_build_object(
      'avatar_url', p.avatar_url,
      'created_at', extract(epoch from p.created_at)::int,
      'id', p.short_id,
      'name', p.name,
      'tenant_id', encode_id('tenants', p.tenant_id),
      'parents', coalesce(pa.parents, '[]'::jsonb)
    )
  from public.pets p
  left join pet_parents_agg pa on pa.pet_id = p.id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.format_user_for_typesense(user_short_id text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  result json;
begin
  with user_pets as (
    select 
      pp.user_id,
      jsonb_agg(
        jsonb_build_object(
          'avatar_url', p.avatar_url,
          'id', p.short_id,
          'name', p.name
        )
      ) as pets
    from pet_parents pp
    join pets p on p.id = pp.pet_id
    where pp.user_id = (select id from users where short_id = user_short_id)
    group by pp.user_id
  )
  select 
    json_build_object(
      'avatar_url', u.avatar_url,
      'created_at', extract(epoch from u.created_at)::int,
      'email', u.email,
      'first_name', u.first_name,
      'id', u.short_id,
      'initials', u.initials,
      'last_name', u.last_name,
      'name', u.name,
      'phone', case 
        when u.phone is null then null
        else (
          with phone_formats as (
            select 
              u.phone as original,
              nullif(regexp_replace(u.phone, '[^0-9]', '', 'g'), '') as all_numbers,
              nullif(substring(regexp_replace(u.phone, '[^0-9]', '', 'g'), 2), '') as without_country_code,
              nullif(substring(regexp_replace(u.phone, '[^0-9]', '', 'g'), 5), '') as last_seven
          )
          select array_remove(array[
            original,
            all_numbers,
            without_country_code,
            last_seven
          ], null)
          from phone_formats
        )
      end,
      'role', u.role::text,
      'tenant_id', encode_id('tenants', u.tenant_id),
      'user_id', (select id::text from auth.users where auth.users.id = u.auth_id),
      'pets', coalesce(up.pets, '[]'::jsonb)
    ) into result
  from public.users u
  left join user_pets up on up.user_id = u.id
  where u.short_id = user_short_id;
  
  return result;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.format_users_for_typesense()
 RETURNS SETOF json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  return query
  with user_pets as (
    select 
      pp.user_id,
      jsonb_agg(
        jsonb_build_object(
          'avatar_url', p.avatar_url,
          'id', p.short_id,
          'name', p.name
        )
      ) as pets
    from pet_parents pp
    join pets p on p.id = pp.pet_id
    group by pp.user_id
  )
  select 
    json_build_object(
      'avatar_url', u.avatar_url,
      'created_at', extract(epoch from u.created_at)::int,
      'email', u.email,
      'first_name', u.first_name,
      'id', u.short_id,
      'initials', u.initials,
      'last_name', u.last_name,
      'name', u.name,
      'phone', case 
        when u.phone is null then null
        else (
          with phone_formats as (
            select 
              u.phone as original,
              nullif(regexp_replace(u.phone, '[^0-9]', '', 'g'), '') as all_numbers,
              nullif(substring(regexp_replace(u.phone, '[^0-9]', '', 'g'), 2), '') as without_country_code,
              nullif(substring(regexp_replace(u.phone, '[^0-9]', '', 'g'), 5), '') as last_seven
          )
          select array_remove(array[
            original,
            all_numbers,
            without_country_code,
            last_seven
          ], null)
          from phone_formats
        )
      end,
      'role', u.role::text,
      'tenant_id', encode_id('tenants', u.tenant_id),
      'user_id', (select id::text from auth.users where auth.users.id = u.auth_id),
      'pets', coalesce(up.pets, '[]'::jsonb)
    )
  from public.users u
  left join user_pets up on up.user_id = u.id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.link_customer_to_auth_user(p_user_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_tenant_id bigint;
    v_auth_user_id UUID;
BEGIN
    v_tenant_id := public.tenant_id();

    IF v_tenant_id IS NULL then
        RAISE EXCEPTION 'Missing tenant id';
    end if;

    v_auth_user_id := auth.uid();

    IF v_auth_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    UPDATE public.users u
    SET auth_id = v_auth_user_id
    WHERE u.id = p_user_id
      AND u.tenant_id = v_tenant_id
      AND u.auth_id IS NULL;

    RETURN FOUND;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_id()
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
BEGIN
    return (auth.jwt() ->> 'tenant_id')::bigint;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_role()
 RETURNS tenant_role
 LANGUAGE plpgsql
AS $function$
BEGIN
    return (auth.jwt() ->> 'tenant_role')::tenant_role;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
declare
    event jsonb;
    v_tenant_short_id text;
    v_tenant_id       bigint;
    v_user            auth.users;
    v_claims          jsonb;
    v_role            public.tenant_role;
begin
    event := '{
  "user_id": "8ccaa7af-909f-44e7-84cb-67cdccb56be6",
  "claims": {
    "aud": "authenticated",
    "exp": 1715690221,
    "iat": 1715686621,
    "sub": "8ccaa7af-909f-44e7-84cb-67cdccb56be6",
    "email": "",
    "phone": "",
    "app_metadata": {},
    "user_metadata": {
      "sub": "82e59a18-1085-401e-ba58-61e17c697a40",
      "email": "christopheroverstreet@gmail.com",
      "last_name": "Overstreet",
      "first_name": "Christopher",
      "email_verified": false,
      "phone_verified": false,
      "tenant_short_id": "DQMPGN"
    },
    "role": "authenticated",
    "aal": "aal1",
    "amr": [
      {
        "method": "anonymous",
        "timestamp": 1715686621
      }
    ],
    "session_id": "4b938a09-5372-4177-a314-cfa292099ea2",
    "is_anonymous": true
  },
  "authentication_method": "anonymous"
}'::jsonb;

     v_claims := event -> 'claims';

    if jsonb_typeof(v_claims->'app_metadata') is null then
      -- If 'app_metadata' does not exist, create an empty object
      v_claims := jsonb_set(v_claims, '{app_metadata}', '{}');
    end if;

         if jsonb_typeof(v_claims->'user_metadata') is null then
             v_claims := jsonb_set(v_claims, '{user_metadata}', '{}');
         end if;


     v_tenant_short_id := v_claims->'user_metadata'->>'tenant_short_id';

    if v_tenant_short_id is not null then
        select * from public.users where (auth_id = (v_claims ->> 'sub')::uuid) into v_user;

        v_tenant_id := public.decode_short_id('tenants', v_tenant_short_id);

        select role from public.users u where u.auth_id = v_user.id and u.tenant_id = v_tenant_id into v_role;

        v_claims := jsonb_set(v_claims, '{app_metadata, tenant_short_id}', to_jsonb(v_tenant_short_id));
        if v_role is not null then
        v_claims := jsonb_set(v_claims, '{app_metadata, role}',  to_jsonb(v_role));
        else
                    v_claims := jsonb_set(v_claims, '{app_metadata, role}',  'null');

            end if;
    else
        v_claims := jsonb_set(v_claims, '{app_metadata, tenant_short_id}', 'null');
        v_claims := jsonb_set(v_claims, '{app_metadata, role}', 'null');
    end if;


    event := jsonb_set(event, '{claims}', v_claims);

    return event;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.test_phone_formatting(phone_number text)
 RETURNS TABLE(original text, all_numbers text, without_country_code text, last_seven text)
 LANGUAGE sql
AS $function$
  select
    phone_number as original,
    regexp_replace(phone_number, '[^0-9]', '', 'g') as all_numbers,
    substring(regexp_replace(phone_number, '[^0-9]', '', 'g'), 2) as without_country_code,
    substring(regexp_replace(phone_number, '[^0-9]', '', 'g'), 5) as last_seven;
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

grant delete on table "public"."tenants" to "PUBLIC";

grant insert on table "public"."tenants" to "PUBLIC";

grant references on table "public"."tenants" to "PUBLIC";

grant select on table "public"."tenants" to "PUBLIC";

grant trigger on table "public"."tenants" to "PUBLIC";

grant truncate on table "public"."tenants" to "PUBLIC";

grant update on table "public"."tenants" to "PUBLIC";

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

grant delete on table "public"."tenants" to "supabase_auth_admin";

grant insert on table "public"."tenants" to "supabase_auth_admin";

grant references on table "public"."tenants" to "supabase_auth_admin";

grant select on table "public"."tenants" to "supabase_auth_admin";

grant trigger on table "public"."tenants" to "supabase_auth_admin";

grant truncate on table "public"."tenants" to "supabase_auth_admin";

grant update on table "public"."tenants" to "supabase_auth_admin";

grant delete on table "public"."users" to "PUBLIC";

grant insert on table "public"."users" to "PUBLIC";

grant references on table "public"."users" to "PUBLIC";

grant select on table "public"."users" to "PUBLIC";

grant trigger on table "public"."users" to "PUBLIC";

grant truncate on table "public"."users" to "PUBLIC";

grant update on table "public"."users" to "PUBLIC";

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

grant delete on table "public"."users" to "supabase_auth_admin";

grant insert on table "public"."users" to "supabase_auth_admin";

grant references on table "public"."users" to "supabase_auth_admin";

grant select on table "public"."users" to "supabase_auth_admin";

grant trigger on table "public"."users" to "supabase_auth_admin";

grant truncate on table "public"."users" to "supabase_auth_admin";

grant update on table "public"."users" to "supabase_auth_admin";


