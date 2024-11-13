create extension if not exists "pg_hashids" with schema "extensions";


create type "public"."platform_role" as enum ('owner');

create type "public"."tenant_role" as enum ('owner', 'admin', 'staff', 'customer');

create sequence "public"."tenant_user_invitations_id_seq";

create sequence "public"."tenants_serial_id_seq";

create table "public"."platform_profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "first_name" text,
    "last_name" text
);


create table "public"."tenant_user_invitations" (
    "id" integer not null default nextval('tenant_user_invitations_id_seq'::regclass),
    "tenant_id" text not null,
    "email" text,
    "invitation_code" text default encode(gen_random_bytes(12), 'hex'::text),
    "created_at" timestamp with time zone not null default now(),
    "expires_at" timestamp with time zone not null default (now() + '7 days'::interval),
    "created_by" uuid not null,
    "status" text not null default 'pending'::text,
    "metadata" jsonb default '{}'::jsonb
);


create table "public"."tenant_user_profiles" (
    "id" uuid not null default uuid_generate_v4(),
    "tenant_id" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "first_name" text,
    "last_name" text,
    "role" tenant_role not null default 'customer'::tenant_role,
    "auth_user_id" uuid,
    "name" text generated always as (
CASE
    WHEN ((first_name IS NULL) AND (last_name IS NULL)) THEN NULL::text
    WHEN (last_name IS NULL) THEN first_name
    WHEN (first_name IS NULL) THEN last_name
    ELSE ((first_name || ' '::text) || last_name)
END) stored,
    "initials" text generated always as (
CASE
    WHEN ((first_name IS NULL) AND (last_name IS NULL)) THEN NULL::text
    WHEN (last_name IS NULL) THEN upper("left"(first_name, 1))
    WHEN (first_name IS NULL) THEN upper("left"(last_name, 1))
    ELSE upper(("left"(first_name, 1) || "left"(last_name, 1)))
END) stored,
    "avatar_url" text
);


create table "public"."tenants" (
    "serial_id" integer not null default nextval('tenants_serial_id_seq'::regclass),
    "id" text not null generated always as (id_encode((serial_id)::bigint, 'tenants'::text, 6)) stored,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter sequence "public"."tenant_user_invitations_id_seq" owned by "public"."tenant_user_invitations"."id";

alter sequence "public"."tenants_serial_id_seq" owned by "public"."tenants"."serial_id";

CREATE INDEX idx_tenant_user_profiles_tenant_id ON public.tenant_user_profiles USING btree (tenant_id);

CREATE UNIQUE INDEX platform_profiles_pkey ON public.platform_profiles USING btree (id);

CREATE UNIQUE INDEX tenant_user_invitations_invitation_code_key ON public.tenant_user_invitations USING btree (invitation_code);

CREATE UNIQUE INDEX tenant_user_profiles_pkey ON public.tenant_user_profiles USING btree (id);

CREATE UNIQUE INDEX tenant_user_profiles_tenant_id_id_key ON public.tenant_user_profiles USING btree (tenant_id, id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

alter table "public"."platform_profiles" add constraint "platform_profiles_pkey" PRIMARY KEY using index "platform_profiles_pkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_pkey" PRIMARY KEY using index "tenant_user_profiles_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."platform_profiles" add constraint "platform_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."platform_profiles" validate constraint "platform_profiles_id_fkey";

alter table "public"."tenant_user_invitations" add constraint "tenant_user_invitations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."tenant_user_invitations" validate constraint "tenant_user_invitations_created_by_fkey";

alter table "public"."tenant_user_invitations" add constraint "tenant_user_invitations_invitation_code_key" UNIQUE using index "tenant_user_invitations_invitation_code_key";

alter table "public"."tenant_user_invitations" add constraint "tenant_user_invitations_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'expired'::text]))) not valid;

alter table "public"."tenant_user_invitations" validate constraint "tenant_user_invitations_status_check";

alter table "public"."tenant_user_invitations" add constraint "tenant_user_invitations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_user_invitations" validate constraint "tenant_user_invitations_tenant_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_auth_user_id_fkey" FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) not valid;

alter table "public"."tenant_user_profiles" validate constraint "tenant_user_profiles_auth_user_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."tenant_user_profiles" validate constraint "tenant_user_profiles_tenant_id_fkey";

alter table "public"."tenant_user_profiles" add constraint "tenant_user_profiles_tenant_id_id_key" UNIQUE using index "tenant_user_profiles_tenant_id_id_key";

alter table "public"."tenant_user_profiles" add constraint "valid_user_profile" CHECK ((((auth_user_id IS NOT NULL) AND (id = auth_user_id)) OR (auth_user_id IS NULL))) not valid;

alter table "public"."tenant_user_profiles" validate constraint "valid_user_profile";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.claim_tenant_invitation(p_invitation_code text)
 RETURNS TABLE(tenant_id uuid, metadata jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_invitation tenant_user_invitations%ROWTYPE;
BEGIN
    -- Get and validate invitation
    SELECT * INTO v_invitation
    FROM tenant_user_invitations
    WHERE invitation_code = p_invitation_code
      AND status = 'pending'
      AND expires_at > NOW();

    IF v_invitation IS NULL THEN
        RAISE EXCEPTION 'Invalid or expired invitation code';
    END IF;

    -- If invitation has email, validate it matches
    IF v_invitation.email IS NOT NULL AND v_invitation.email != auth.jwt()->>'email' THEN
        RAISE EXCEPTION 'Email mismatch';
    END IF;

    -- Create tenant user profile
    INSERT INTO tenant_user_profiles (
        id,
        tenant_id,
        first_name,
        last_name,
        role
    ) VALUES (
                 auth.uid(),
                 v_invitation.tenant_id,
                 COALESCE(
                         (auth.jwt()->>'app_metadata'->>'first_name')::TEXT,
                         (v_invitation.metadata->>'first_name')::TEXT,
                         'New Customer'
                 ),
                 COALESCE(
                         (auth.jwt()->>'app_metadata'->>'last_name')::TEXT,
                         (v_invitation.metadata->>'last_name')::TEXT,
                         'New Customer'
                 ),
                 'customer'
             );

    -- Mark invitation as accepted
    UPDATE tenant_user_invitations
    SET status = 'accepted'
    WHERE id = v_invitation.id;

    RETURN QUERY SELECT
                     v_invitation.tenant_id,
                     v_invitation.metadata;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_tenant_customer(p_first_name text, p_last_name text DEFAULT NULL::text, p_email text DEFAULT NULL::text, p_phone text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_user_id UUID;
    v_tenant_id TEXT;
    v_tenant_role tenant_role;
    v_existing_auth_user_id UUID;
BEGIN
    -- Check if caller has permission
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    IF v_tenant_id IS NULL OR v_tenant_role NOT IN ('owner', 'admin', 'staff') THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;

    -- If email is provided, check if auth user exists
    IF p_email IS NOT NULL THEN
        SELECT id INTO v_existing_auth_user_id
        FROM auth.users
        WHERE auth.users.email = email;
    END IF;

    -- Create tenant user profile
    INSERT INTO tenant_user_profiles (
        id,
        auth_user_id,
        tenant_id,
        first_name,
        last_name,
        role
    ) VALUES (
                 COALESCE(v_existing_auth_user_id, extensions.uuid_generate_v4()),
                 v_existing_auth_user_id,
                 v_tenant_id,
                 p_first_name,
                 p_last_name,
                 'customer'
             )
    RETURNING id INTO v_user_id;

    -- If email provided but no auth user exists, create invitation
    IF p_email IS NOT NULL AND v_existing_auth_user_id IS NULL THEN
        INSERT INTO tenant_user_invitations (
            tenant_id,
            email,
            created_by,
            metadata
        ) VALUES (
                     v_tenant_id,
                     p_email,
                     auth.uid(),
                     jsonb_build_object(
                             'user_id', v_user_id,
                             'first_name', p_first_name,
                             'last_name', p_last_name
                     )
                 );
    END IF;

    RETURN v_user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_tenant_user_profile_for_typesense(p_id uuid)
 RETURNS TABLE(avatar_url text, created_at integer, email text, first_name text, id text, initials text, last_name text, name text, phone text[], role text, tenant_id text, user_id text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
    -- Return formatted profile
    return query
        select
            p.avatar_url::text,
            extract(epoch from p.created_at)::integer,
            u.email::text,
            p.first_name::text,
            p.id::text,
            p.initials::text,
            p.last_name::text,
            p.name::text,
            -- Format phone numbers in multiple ways for better searchability
            case
                when u.phone is not null then
                    array[
                        -- Original E.164 format: +12345678901
                        u.phone::text,

                        -- Format: +1 (234) 567-8901
                        regexp_replace(
                                regexp_replace(
                                        regexp_replace(u.phone::text,
                                                       '^\\+1', '+1 ('),
                                        '(\\d{3})(\\d{3})(\\d{4})$',
                                        '\\1) \\2-\\3'
                                ),
                                '^\\+(.*)$', '+\\1'
                        ),

                        -- Raw number without plus: 12345678901
                        substr(u.phone::text, 2),

                        -- Without country code: 2345678901
                        substr(u.phone::text, 3),

                        -- Just the local part: 5678901
                        right(u.phone::text, 7)
                        ]
                else null
                end as phone,
            p.role::text,
            p.tenant_id::text,
            p.auth_user_id::text as user_id
        from public.tenant_user_profiles p
                 left join auth.users u on p.auth_user_id = u.id
        where p.id = p_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_tenant_user_profiles_for_typesense()
 RETURNS TABLE(avatar_url text, created_at integer, email text, first_name text, id text, initials text, last_name text, name text, phone text[], role text, tenant_id text, user_id text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
    -- Return formatted profiles for all tenants
    return query
        select
            p.avatar_url::text,
            extract(epoch from p.created_at)::integer,
            u.email::text,
            p.first_name::text,
            p.id::text,
            p.initials::text,
            p.last_name::text,
            p.name::text,
            -- Format phone numbers in multiple ways for better searchability
            case
                when u.phone is not null then
                    array[
                        -- Original E.164 format: +12345678901
                        u.phone::text,

                        -- Format: +1 (234) 567-8901
                        regexp_replace(
                                regexp_replace(
                                        regexp_replace(u.phone::text,
                                                       '^\\+1', '+1 ('),
                                        '(\\d{3})(\\d{3})(\\d{4})$',
                                        '\\1) \\2-\\3'
                                ),
                                '^\\+(.*)$', '+\\1'
                        ),

                        -- Raw number without plus: 12345678901
                        substr(u.phone::text, 2),

                        -- Without country code: 2345678901
                        substr(u.phone::text, 3),

                        -- Just the local part: 5678901
                        right(u.phone::text, 7)
                        ]
                else null
                end as phone,
            p.role::text,
            p.tenant_id::text,
            p.auth_user_id::text as user_id
        from public.tenant_user_profiles p
                 left join auth.users u on p.auth_user_id = u.id
        order by
            p.tenant_id,
            case p.role
                when 'owner' then 1
                when 'admin' then 2
                when 'staff' then 3
                when 'customer' then 4
                else 5
                end,
            p.name;
end;
$function$
;

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

CREATE OR REPLACE FUNCTION public.link_customer_to_auth_user(p_profile_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_tenant_id TEXT;
    v_auth_user_id UUID;
BEGIN
    v_tenant_id := public.tenant_id();

    -- Get current auth user
    v_auth_user_id := auth.uid();

    IF v_auth_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Update the profile to link it to the auth user
    UPDATE tenant_user_profiles
    SET auth_user_id = v_auth_user_id,
        id = v_auth_user_id
    WHERE id = p_profile_id
      AND tenant_id = v_tenant_id
      AND auth_user_id IS NULL;

    RETURN FOUND;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_id()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
declare v_tenant_id text;
BEGIN
    v_tenant_id := (auth.jwt() -> 'app_metadata')::jsonb ->> 'tenant_id';

    return v_tenant_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.tenant_role()
 RETURNS tenant_role
 LANGUAGE plpgsql
AS $function$
declare v_tenant_role tenant_role;
BEGIN
    v_tenant_role := ((auth.jwt() -> 'app_metadata')::jsonb ->> 'role')::tenant_role;

    return v_tenant_role;
END;
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

grant delete on table "public"."tenant_user_invitations" to "anon";

grant insert on table "public"."tenant_user_invitations" to "anon";

grant references on table "public"."tenant_user_invitations" to "anon";

grant select on table "public"."tenant_user_invitations" to "anon";

grant trigger on table "public"."tenant_user_invitations" to "anon";

grant truncate on table "public"."tenant_user_invitations" to "anon";

grant update on table "public"."tenant_user_invitations" to "anon";

grant delete on table "public"."tenant_user_invitations" to "authenticated";

grant insert on table "public"."tenant_user_invitations" to "authenticated";

grant references on table "public"."tenant_user_invitations" to "authenticated";

grant select on table "public"."tenant_user_invitations" to "authenticated";

grant trigger on table "public"."tenant_user_invitations" to "authenticated";

grant truncate on table "public"."tenant_user_invitations" to "authenticated";

grant update on table "public"."tenant_user_invitations" to "authenticated";

grant delete on table "public"."tenant_user_invitations" to "service_role";

grant insert on table "public"."tenant_user_invitations" to "service_role";

grant references on table "public"."tenant_user_invitations" to "service_role";

grant select on table "public"."tenant_user_invitations" to "service_role";

grant trigger on table "public"."tenant_user_invitations" to "service_role";

grant truncate on table "public"."tenant_user_invitations" to "service_role";

grant update on table "public"."tenant_user_invitations" to "service_role";

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


