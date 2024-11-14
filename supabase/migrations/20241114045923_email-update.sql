alter table "public"."tenant_user_profiles" add column "email" text;

alter table "public"."tenant_user_profiles" add constraint "valid_email_format" CHECK (((email IS NULL) OR (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text))) not valid;

alter table "public"."tenant_user_profiles" validate constraint "valid_email_format";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.sync_auth_user_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    -- For INSERT or UPDATE on auth.users
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.email IS DISTINCT FROM OLD.email) THEN
        -- Update all tenant profiles linked to this auth user
        UPDATE public.tenant_user_profiles
        SET email = NEW.email
        WHERE auth_user_id = NEW.id;
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_customer_profile(p_profile_id uuid, p_first_name text DEFAULT NULL::text, p_last_name text DEFAULT NULL::text, p_email text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_tenant_id TEXT;
    v_tenant_role tenant_role;
    v_existing_auth_user_id UUID;
    v_profile tenant_user_profiles%ROWTYPE;
    v_updates_exist BOOLEAN;
BEGIN
    -- Check if caller has permission
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    IF v_tenant_id IS NULL OR v_tenant_role NOT IN ('owner', 'admin', 'staff') THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;

    -- Get the profile and verify it belongs to the tenant
    SELECT * INTO v_profile
    FROM tenant_user_profiles
    WHERE id = p_profile_id
    AND tenant_id = v_tenant_id;

    IF v_profile IS NULL THEN
        RAISE EXCEPTION 'Profile not found';
    END IF;

    -- Check if any updates are actually needed
    v_updates_exist := FALSE;
    v_updates_exist := v_updates_exist OR
                      (p_first_name IS NOT NULL AND p_first_name IS DISTINCT FROM v_profile.first_name) OR
                      (p_last_name IS NOT NULL AND p_last_name IS DISTINCT FROM v_profile.last_name) OR
                      (p_email IS NOT NULL AND p_email IS DISTINCT FROM v_profile.email);

    IF NOT v_updates_exist THEN
        RETURN FALSE; -- No updates needed
    END IF;

    -- If email is changing, check for existing auth user
    IF p_email IS NOT NULL AND p_email IS DISTINCT FROM v_profile.email THEN
        -- Check if an auth user with this email already exists
        SELECT id INTO v_existing_auth_user_id
        FROM auth.users
        WHERE email = p_email;

        -- If profile is already linked to a different auth user, prevent email update
        IF v_profile.auth_user_id IS NOT NULL AND
           v_existing_auth_user_id IS NOT NULL AND
           v_existing_auth_user_id != v_profile.auth_user_id THEN
            RAISE EXCEPTION 'Email already associated with another user';
        END IF;
    END IF;

    -- Update the profile with any provided non-null values
    UPDATE tenant_user_profiles
    SET
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        email = COALESCE(p_email, email),
        updated_at = now()
    WHERE id = p_profile_id
    AND tenant_id = v_tenant_id;

    -- Handle email-specific logic if email is being updated
    IF p_email IS NOT NULL AND p_email IS DISTINCT FROM v_profile.email THEN
        IF v_existing_auth_user_id IS NOT NULL THEN
            -- If auth user exists, link the profile to them
            UPDATE tenant_user_profiles
            SET auth_user_id = v_existing_auth_user_id,
                id = v_existing_auth_user_id
            WHERE id = p_profile_id
            AND tenant_id = v_tenant_id;
        ELSIF v_profile.auth_user_id IS NULL THEN
            -- If no auth user exists and profile isn't linked, create an invitation
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
                    'user_id', p_profile_id,
                    'first_name', COALESCE(p_first_name, v_profile.first_name),
                    'last_name', COALESCE(p_last_name, v_profile.last_name)
                )
            );
        END IF;
    END IF;

    RETURN TRUE;
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
        WHERE email = p_email;
    END IF;

    -- Create tenant user profile
    INSERT INTO tenant_user_profiles (
        id,
        auth_user_id,
        tenant_id,
        first_name,
        last_name,
        role,
        email
    ) VALUES (
        COALESCE(v_existing_auth_user_id, uuid_generate_v4()),
        v_existing_auth_user_id,
        v_tenant_id,
        p_first_name,
        p_last_name,
        'customer',
        p_email
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
            p.email::text,
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
            p.email::text,
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


