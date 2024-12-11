create schema if not exists "utils";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION utils.validate_days_of_week(days integer[])
    RETURNS boolean
    LANGUAGE plpgsql
    IMMUTABLE
AS $function$
BEGIN
    -- Check if array is null or empty
    IF days IS NULL OR array_length(days, 1) IS NULL THEN
        RETURN false;
    END IF;

    -- Check if all values are between 1 and 7
    RETURN NOT EXISTS (
        SELECT unnest(days) AS day
        WHERE day < 1 OR day > 7
    );
END;
$function$
;


create type "public"."address_type" as enum ('home', 'work', 'other');

create type "public"."emergency_contact_relationship" as enum ('spouse', 'parent', 'sibling', 'friend', 'other');

create type "public"."price_adjustment_type" as enum ('fixed', 'percentage');

create type "public"."recurrence_type" as enum ('weekly', 'twice a month', 'monthly');

create type "public"."reservation_status" as enum ('pending', 'confirmed', 'completed', 'cancelled');

create type "public"."service_type" as enum ('daycare', 'overnight_boarding', 'grooming');

create sequence "public"."addresses_id_seq";

create sequence "public"."emergency_contact_id_seq";

create table "public"."addons" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "service_id" bigint not null,
    "name" text not null,
    "description" text,
    "price" numeric(10,2) not null,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."addresses" (
    "id" integer not null default nextval('addresses_id_seq'::regclass),
    "tenant_id" bigint default tenant_id(),
    "user_id" bigint,
    "street_line1" text not null,
    "street_line2" text,
    "city" text not null,
    "state" text not null,
    "postal_code" text not null,
    "country" text not null default 'US'::text,
    "place_id" text,
    "latitude" numeric(10,8),
    "longitude" numeric(11,8),
    "formatted_address" text,
    "address_type" address_type default 'home'::address_type,
    "is_verified" boolean default false,
    "verified_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."breed_categories" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "name" text not null,
    "description" text,
    "display_order" integer not null default 0,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."breed_category_breeds" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "breed_category_id" bigint not null,
    "breed_name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."customer_packages" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "package_id" bigint not null,
    "user_id" bigint not null,
    "credits_remaining" integer not null,
    "purchase_date" timestamp with time zone not null default now(),
    "expiry_date" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."duration_discounts" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "pricing_rule_id" bigint not null,
    "min_nights" integer not null,
    "max_nights" integer,
    "adjustment_type" price_adjustment_type not null,
    "adjustment_value" numeric(10,2) not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."emergency_contacts" (
    "id" integer not null default nextval('emergency_contact_id_seq'::regclass),
    "tenant_id" bigint default tenant_id(),
    "user_id" bigint,
    "name" text not null,
    "relationship" emergency_contact_relationship not null,
    "phone" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."packages" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "service_id" bigint not null,
    "name" text not null,
    "description" text,
    "credits" integer not null,
    "price" numeric(10,2) not null,
    "validity_days" integer not null,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."price_adjustments" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "pricing_rule_id" bigint not null,
    "size_category_id" bigint,
    "breed_category_id" bigint,
    "adjustment_type" text not null,
    "adjustment_value" numeric(10,2) not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."pricing_rules" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "service_id" bigint not null,
    "service_tier_id" bigint,
    "name" text not null,
    "description" text,
    "base_price" numeric(10,2) not null,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."recurrence_patterns" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "reservation_id" bigint not null,
    "type" recurrence_type not null,
    "days_of_week" integer[],
    "days_of_month" integer[],
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."reservation_addons" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "reservation_id" bigint not null,
    "addon_id" bigint not null,
    "quantity" integer not null default 1,
    "price_at_time" numeric(10,2) not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."reservation_groups" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "owner_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."reservations" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "pet_id" bigint not null,
    "status" reservation_status not null default 'pending'::reservation_status,
    "check_in" date not null,
    "check_out" date not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "service_id" bigint not null
);


create table "public"."service_tiers" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "name" text not null,
    "description" text,
    "display_order" integer not null default 0,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."services" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "name" text not null,
    "type" service_type not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."size_categories" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "name" text not null,
    "description" text,
    "min_weight" numeric(5,2),
    "max_weight" numeric(5,2),
    "display_order" integer not null default 0,
    "is_active" boolean default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."time_based_pricing" (
    "id" bigint generated always as identity not null,
    "tenant_id" bigint not null,
    "pricing_rule_id" bigint not null,
    "name" text not null,
    "start_date" date,
    "end_date" date,
    "days_of_week" integer[],
    "adjustment_type" price_adjustment_type not null,
    "adjustment_value" numeric(10,2) not null,
    "priority" integer default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."pets" add column "weight" numeric(5,2);

alter sequence "public"."addresses_id_seq" owned by "public"."addresses"."id";

alter sequence "public"."emergency_contact_id_seq" owned by "public"."emergency_contacts"."id";

CREATE UNIQUE INDEX addons_pkey ON public.addons USING btree (id);

CREATE UNIQUE INDEX addresses_pkey ON public.addresses USING btree (id);

CREATE INDEX addresses_postal_code_idx ON public.addresses USING btree (postal_code);

CREATE INDEX addresses_tenant_id_idx ON public.addresses USING btree (tenant_id);

CREATE INDEX addresses_user_id_idx ON public.addresses USING btree (user_id);

CREATE UNIQUE INDEX addresses_user_id_key ON public.addresses USING btree (user_id);

CREATE UNIQUE INDEX breed_categories_pkey ON public.breed_categories USING btree (id);

CREATE UNIQUE INDEX breed_categories_tenant_id_name_key ON public.breed_categories USING btree (tenant_id, name);

CREATE UNIQUE INDEX breed_category_breeds_pkey ON public.breed_category_breeds USING btree (id);

CREATE UNIQUE INDEX breed_category_breeds_tenant_id_breed_category_id_breed_nam_key ON public.breed_category_breeds USING btree (tenant_id, breed_category_id, breed_name);

CREATE UNIQUE INDEX customer_packages_pkey ON public.customer_packages USING btree (id);

CREATE UNIQUE INDEX duration_discounts_pkey ON public.duration_discounts USING btree (id);

CREATE UNIQUE INDEX emergency_contact_pkey ON public.emergency_contacts USING btree (id);

CREATE INDEX emergency_contact_tenant_id_idx ON public.emergency_contacts USING btree (tenant_id);

CREATE INDEX emergency_contact_user_id_idx ON public.emergency_contacts USING btree (user_id);

CREATE UNIQUE INDEX emergency_contact_user_id_key ON public.emergency_contacts USING btree (user_id);

CREATE INDEX idx_time_based_pricing_days ON public.time_based_pricing USING gin (days_of_week);

CREATE UNIQUE INDEX packages_pkey ON public.packages USING btree (id);

CREATE UNIQUE INDEX price_adjustments_pkey ON public.price_adjustments USING btree (id);

CREATE UNIQUE INDEX price_adjustments_pricing_rule_id_size_category_id_breed_ca_key ON public.price_adjustments USING btree (pricing_rule_id, size_category_id, breed_category_id);

CREATE UNIQUE INDEX pricing_rules_pkey ON public.pricing_rules USING btree (id);

CREATE UNIQUE INDEX recurrence_patterns_pkey ON public.recurrence_patterns USING btree (id);

CREATE UNIQUE INDEX reservation_addons_pkey ON public.reservation_addons USING btree (id);

CREATE UNIQUE INDEX reservation_groups_pkey ON public.reservation_groups USING btree (id);

CREATE UNIQUE INDEX reservations_pkey ON public.reservations USING btree (id);

CREATE UNIQUE INDEX service_tiers_pkey ON public.service_tiers USING btree (id);

CREATE UNIQUE INDEX service_tiers_tenant_id_name_key ON public.service_tiers USING btree (tenant_id, name);

CREATE UNIQUE INDEX services_pkey ON public.services USING btree (id);

CREATE UNIQUE INDEX size_categories_pkey ON public.size_categories USING btree (id);

CREATE UNIQUE INDEX size_categories_tenant_id_name_key ON public.size_categories USING btree (tenant_id, name);

CREATE UNIQUE INDEX time_based_pricing_pkey ON public.time_based_pricing USING btree (id);

alter table "public"."addons" add constraint "addons_pkey" PRIMARY KEY using index "addons_pkey";

alter table "public"."addresses" add constraint "addresses_pkey" PRIMARY KEY using index "addresses_pkey";

alter table "public"."breed_categories" add constraint "breed_categories_pkey" PRIMARY KEY using index "breed_categories_pkey";

alter table "public"."breed_category_breeds" add constraint "breed_category_breeds_pkey" PRIMARY KEY using index "breed_category_breeds_pkey";

alter table "public"."customer_packages" add constraint "customer_packages_pkey" PRIMARY KEY using index "customer_packages_pkey";

alter table "public"."duration_discounts" add constraint "duration_discounts_pkey" PRIMARY KEY using index "duration_discounts_pkey";

alter table "public"."emergency_contacts" add constraint "emergency_contact_pkey" PRIMARY KEY using index "emergency_contact_pkey";

alter table "public"."packages" add constraint "packages_pkey" PRIMARY KEY using index "packages_pkey";

alter table "public"."price_adjustments" add constraint "price_adjustments_pkey" PRIMARY KEY using index "price_adjustments_pkey";

alter table "public"."pricing_rules" add constraint "pricing_rules_pkey" PRIMARY KEY using index "pricing_rules_pkey";

alter table "public"."recurrence_patterns" add constraint "recurrence_patterns_pkey" PRIMARY KEY using index "recurrence_patterns_pkey";

alter table "public"."reservation_addons" add constraint "reservation_addons_pkey" PRIMARY KEY using index "reservation_addons_pkey";

alter table "public"."reservation_groups" add constraint "reservation_groups_pkey" PRIMARY KEY using index "reservation_groups_pkey";

alter table "public"."reservations" add constraint "reservations_pkey" PRIMARY KEY using index "reservations_pkey";

alter table "public"."service_tiers" add constraint "service_tiers_pkey" PRIMARY KEY using index "service_tiers_pkey";

alter table "public"."services" add constraint "services_pkey" PRIMARY KEY using index "services_pkey";

alter table "public"."size_categories" add constraint "size_categories_pkey" PRIMARY KEY using index "size_categories_pkey";

alter table "public"."time_based_pricing" add constraint "time_based_pricing_pkey" PRIMARY KEY using index "time_based_pricing_pkey";

alter table "public"."addons" add constraint "addons_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE not valid;

alter table "public"."addons" validate constraint "addons_service_id_fkey";

alter table "public"."addons" add constraint "addons_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."addons" validate constraint "addons_tenant_id_fkey";

alter table "public"."addresses" add constraint "addresses_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."addresses" validate constraint "addresses_tenant_id_fkey";

alter table "public"."addresses" add constraint "addresses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."addresses" validate constraint "addresses_user_id_fkey";

alter table "public"."addresses" add constraint "addresses_user_id_key" UNIQUE using index "addresses_user_id_key";

alter table "public"."breed_categories" add constraint "breed_categories_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."breed_categories" validate constraint "breed_categories_tenant_id_fkey";

alter table "public"."breed_categories" add constraint "breed_categories_tenant_id_name_key" UNIQUE using index "breed_categories_tenant_id_name_key";

alter table "public"."breed_category_breeds" add constraint "breed_category_breeds_breed_category_id_fkey" FOREIGN KEY (breed_category_id) REFERENCES breed_categories(id) ON DELETE CASCADE not valid;

alter table "public"."breed_category_breeds" validate constraint "breed_category_breeds_breed_category_id_fkey";

alter table "public"."breed_category_breeds" add constraint "breed_category_breeds_tenant_id_breed_category_id_breed_nam_key" UNIQUE using index "breed_category_breeds_tenant_id_breed_category_id_breed_nam_key";

alter table "public"."breed_category_breeds" add constraint "breed_category_breeds_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."breed_category_breeds" validate constraint "breed_category_breeds_tenant_id_fkey";

alter table "public"."customer_packages" add constraint "customer_packages_package_id_fkey" FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE not valid;

alter table "public"."customer_packages" validate constraint "customer_packages_package_id_fkey";

alter table "public"."customer_packages" add constraint "customer_packages_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."customer_packages" validate constraint "customer_packages_tenant_id_fkey";

alter table "public"."customer_packages" add constraint "customer_packages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."customer_packages" validate constraint "customer_packages_user_id_fkey";

alter table "public"."duration_discounts" add constraint "duration_discounts_pricing_rule_id_fkey" FOREIGN KEY (pricing_rule_id) REFERENCES pricing_rules(id) ON DELETE CASCADE not valid;

alter table "public"."duration_discounts" validate constraint "duration_discounts_pricing_rule_id_fkey";

alter table "public"."duration_discounts" add constraint "duration_discounts_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."duration_discounts" validate constraint "duration_discounts_tenant_id_fkey";

alter table "public"."emergency_contacts" add constraint "emergency_contact_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."emergency_contacts" validate constraint "emergency_contact_tenant_id_fkey";

alter table "public"."emergency_contacts" add constraint "emergency_contact_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."emergency_contacts" validate constraint "emergency_contact_user_id_fkey";

alter table "public"."emergency_contacts" add constraint "emergency_contact_user_id_key" UNIQUE using index "emergency_contact_user_id_key";

alter table "public"."packages" add constraint "packages_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE not valid;

alter table "public"."packages" validate constraint "packages_service_id_fkey";

alter table "public"."packages" add constraint "packages_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."packages" validate constraint "packages_tenant_id_fkey";

alter table "public"."price_adjustments" add constraint "price_adjustments_adjustment_type_check" CHECK ((adjustment_type = ANY (ARRAY['fixed'::text, 'percentage'::text]))) not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_adjustment_type_check";

alter table "public"."price_adjustments" add constraint "price_adjustments_breed_category_id_fkey" FOREIGN KEY (breed_category_id) REFERENCES breed_categories(id) ON DELETE RESTRICT not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_breed_category_id_fkey";

alter table "public"."price_adjustments" add constraint "price_adjustments_check" CHECK ((((size_category_id IS NOT NULL) AND (breed_category_id IS NULL)) OR ((size_category_id IS NULL) AND (breed_category_id IS NOT NULL)))) not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_check";

alter table "public"."price_adjustments" add constraint "price_adjustments_pricing_rule_id_fkey" FOREIGN KEY (pricing_rule_id) REFERENCES pricing_rules(id) ON DELETE CASCADE not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_pricing_rule_id_fkey";

alter table "public"."price_adjustments" add constraint "price_adjustments_pricing_rule_id_size_category_id_breed_ca_key" UNIQUE using index "price_adjustments_pricing_rule_id_size_category_id_breed_ca_key";

alter table "public"."price_adjustments" add constraint "price_adjustments_size_category_id_fkey" FOREIGN KEY (size_category_id) REFERENCES size_categories(id) ON DELETE RESTRICT not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_size_category_id_fkey";

alter table "public"."price_adjustments" add constraint "price_adjustments_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."price_adjustments" validate constraint "price_adjustments_tenant_id_fkey";

alter table "public"."pricing_rules" add constraint "pricing_rules_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE not valid;

alter table "public"."pricing_rules" validate constraint "pricing_rules_service_id_fkey";

alter table "public"."pricing_rules" add constraint "pricing_rules_service_tier_id_fkey" FOREIGN KEY (service_tier_id) REFERENCES service_tiers(id) ON DELETE RESTRICT not valid;

alter table "public"."pricing_rules" validate constraint "pricing_rules_service_tier_id_fkey";

alter table "public"."pricing_rules" add constraint "pricing_rules_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."pricing_rules" validate constraint "pricing_rules_tenant_id_fkey";

alter table "public"."recurrence_patterns" add constraint "recurrence_patterns_reservation_id_fkey" FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE not valid;

alter table "public"."recurrence_patterns" validate constraint "recurrence_patterns_reservation_id_fkey";

alter table "public"."recurrence_patterns" add constraint "recurrence_patterns_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."recurrence_patterns" validate constraint "recurrence_patterns_tenant_id_fkey";

alter table "public"."reservation_addons" add constraint "reservation_addons_addon_id_fkey" FOREIGN KEY (addon_id) REFERENCES addons(id) ON DELETE CASCADE not valid;

alter table "public"."reservation_addons" validate constraint "reservation_addons_addon_id_fkey";

alter table "public"."reservation_addons" add constraint "reservation_addons_reservation_id_fkey" FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE not valid;

alter table "public"."reservation_addons" validate constraint "reservation_addons_reservation_id_fkey";

alter table "public"."reservation_addons" add constraint "reservation_addons_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."reservation_addons" validate constraint "reservation_addons_tenant_id_fkey";

alter table "public"."reservation_groups" add constraint "reservation_groups_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."reservation_groups" validate constraint "reservation_groups_owner_id_fkey";

alter table "public"."reservation_groups" add constraint "reservation_groups_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."reservation_groups" validate constraint "reservation_groups_tenant_id_fkey";

alter table "public"."reservations" add constraint "reservations_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE not valid;

alter table "public"."reservations" validate constraint "reservations_pet_id_fkey";

alter table "public"."reservations" add constraint "reservations_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT not valid;

alter table "public"."reservations" validate constraint "reservations_service_id_fkey";

alter table "public"."reservations" add constraint "reservations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."reservations" validate constraint "reservations_tenant_id_fkey";

alter table "public"."service_tiers" add constraint "service_tiers_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."service_tiers" validate constraint "service_tiers_tenant_id_fkey";

alter table "public"."service_tiers" add constraint "service_tiers_tenant_id_name_key" UNIQUE using index "service_tiers_tenant_id_name_key";

alter table "public"."services" add constraint "services_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."services" validate constraint "services_tenant_id_fkey";

alter table "public"."size_categories" add constraint "size_categories_check" CHECK (((min_weight IS NULL) OR (max_weight IS NULL) OR (min_weight < max_weight))) not valid;

alter table "public"."size_categories" validate constraint "size_categories_check";

alter table "public"."size_categories" add constraint "size_categories_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."size_categories" validate constraint "size_categories_tenant_id_fkey";

alter table "public"."size_categories" add constraint "size_categories_tenant_id_name_key" UNIQUE using index "size_categories_tenant_id_name_key";

alter table "public"."time_based_pricing" add constraint "time_based_pricing_pricing_rule_id_fkey" FOREIGN KEY (pricing_rule_id) REFERENCES pricing_rules(id) ON DELETE CASCADE not valid;

alter table "public"."time_based_pricing" validate constraint "time_based_pricing_pricing_rule_id_fkey";

alter table "public"."time_based_pricing" add constraint "time_based_pricing_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE not valid;

alter table "public"."time_based_pricing" validate constraint "time_based_pricing_tenant_id_fkey";

alter table "public"."time_based_pricing" add constraint "valid_days_of_week" CHECK (utils.validate_days_of_week(days_of_week)) not valid;

alter table "public"."time_based_pricing" validate constraint "valid_days_of_week";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_duration_discount(p_pricing_rule_id bigint, p_min_nights integer, p_max_nights integer, p_adjustment_type price_adjustment_type, p_adjustment_value numeric)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_discount_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Verify pricing rule belongs to tenant
    if not exists (
        select 1 from public.pricing_rules
        where id = p_pricing_rule_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid pricing rule ID';
    end if;

    -- Insert duration discount
    insert into public.duration_discounts (
        tenant_id,
        pricing_rule_id,
        min_nights,
        max_nights,
        adjustment_type,
        adjustment_value
    )
    values (
        v_tenant_id,
        p_pricing_rule_id,
        p_min_nights,
        p_max_nights,
        p_adjustment_type,
        p_adjustment_value
    )
    returning id into v_discount_id;

    return v_discount_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.add_size_price_adjustment(p_pricing_rule_id bigint, p_size_category_id bigint, p_adjustment_type price_adjustment_type, p_adjustment_value numeric)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_adjustment_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Verify pricing rule belongs to tenant
    if not exists (
        select 1 from public.pricing_rules
        where id = p_pricing_rule_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid pricing rule ID';
    end if;

    -- Verify size category belongs to tenant
    if not exists (
        select 1 from public.size_categories
        where id = p_size_category_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid size category ID';
    end if;

    -- Insert price adjustment
    insert into public.price_adjustments (
        tenant_id,
        pricing_rule_id,
        size_category_id,
        adjustment_type,
        adjustment_value
    )
    values (
        v_tenant_id,
        p_pricing_rule_id,
        p_size_category_id,
        p_adjustment_type,
        p_adjustment_value
    )
    returning id into v_adjustment_id;

    return v_adjustment_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.add_time_based_pricing(p_pricing_rule_id bigint, p_name text, p_start_date date, p_end_date date, p_days_of_week integer[], p_adjustment_type price_adjustment_type, p_adjustment_value numeric, p_priority integer DEFAULT 0)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_time_pricing_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Verify pricing rule belongs to tenant
    if not exists (
        select 1 from public.pricing_rules
        where id = p_pricing_rule_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid pricing rule ID';
    end if;

    -- Insert time-based pricing
    insert into public.time_based_pricing (
        tenant_id,
        pricing_rule_id,
        name,
        start_date,
        end_date,
        days_of_week,
        adjustment_type,
        adjustment_value,
        priority
    )
    values (
        v_tenant_id,
        p_pricing_rule_id,
        p_name,
        p_start_date,
        p_end_date,
        p_days_of_week,
        p_adjustment_type,
        p_adjustment_value,
        p_priority
    )
    returning id into v_time_pricing_id;

    return v_time_pricing_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_pricing_rule(p_service_id bigint, p_name text, p_base_price numeric, p_description text DEFAULT NULL::text, p_service_tier_id bigint DEFAULT NULL::bigint, p_is_active boolean DEFAULT true)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_rule_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Verify service belongs to tenant
    if not exists (
        select 1 from public.services
        where id = p_service_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid service ID';
    end if;

    -- Verify service tier belongs to tenant
    if p_service_tier_id is not null and not exists (
        select 1 from public.service_tiers
        where id = p_service_tier_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid service tier ID';
    end if;

    -- Insert pricing rule
    insert into public.pricing_rules (
        tenant_id,
        service_id,
        service_tier_id,
        name,
        description,
        base_price,
        is_active
    )
    values (
        v_tenant_id,
        p_service_id,
        p_service_tier_id,
        p_name,
        p_description,
        p_base_price,
        p_is_active
    )
    returning id into v_rule_id;

    return v_rule_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service(p_name text, p_type service_type)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_service_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Insert service
    insert into public.services (tenant_id, name, type)
    values (v_tenant_id, p_name, p_type)
    returning id into v_service_id;

    return v_service_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service_package(p_service_id bigint, p_name text, p_description text, p_credits integer, p_price numeric, p_validity_days integer, p_is_active boolean DEFAULT true)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_package_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Verify service belongs to tenant
    if not exists (
        select 1 from public.services
        where id = p_service_id and tenant_id = v_tenant_id
    ) then
        raise exception 'Invalid service ID';
    end if;

    -- Insert package
    insert into public.packages (
        tenant_id,
        service_id,
        name,
        description,
        credits,
        price,
        validity_days,
        is_active
    )
    values (
        v_tenant_id,
        p_service_id,
        p_name,
        p_description,
        p_credits,
        p_price,
        p_validity_days,
        p_is_active
    )
    returning id into v_package_id;

    return v_package_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service_tier(p_name text, p_description text DEFAULT NULL::text, p_display_order integer DEFAULT 0, p_is_active boolean DEFAULT true)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
    v_tenant_id bigint;
    v_tenant_role tenant_role;
    v_tier_id bigint;
begin
    -- Get tenant context
    v_tenant_id := public.tenant_id();
    v_tenant_role := public.tenant_role();

    -- Check permissions
    if v_tenant_id is null or v_tenant_role not in ('owner', 'admin') then
        raise exception 'Insufficient permissions';
    end if;

    -- Insert service tier
    insert into public.service_tiers (
        tenant_id,
        name,
        description,
        display_order,
        is_active
    )
    values (
        v_tenant_id,
        p_name,
        p_description,
        p_display_order,
        p_is_active
    )
    returning id into v_tier_id;

    return v_tier_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."addons" to "anon";

grant insert on table "public"."addons" to "anon";

grant references on table "public"."addons" to "anon";

grant select on table "public"."addons" to "anon";

grant trigger on table "public"."addons" to "anon";

grant truncate on table "public"."addons" to "anon";

grant update on table "public"."addons" to "anon";

grant delete on table "public"."addons" to "authenticated";

grant insert on table "public"."addons" to "authenticated";

grant references on table "public"."addons" to "authenticated";

grant select on table "public"."addons" to "authenticated";

grant trigger on table "public"."addons" to "authenticated";

grant truncate on table "public"."addons" to "authenticated";

grant update on table "public"."addons" to "authenticated";

grant delete on table "public"."addons" to "service_role";

grant insert on table "public"."addons" to "service_role";

grant references on table "public"."addons" to "service_role";

grant select on table "public"."addons" to "service_role";

grant trigger on table "public"."addons" to "service_role";

grant truncate on table "public"."addons" to "service_role";

grant update on table "public"."addons" to "service_role";

grant delete on table "public"."addresses" to "anon";

grant insert on table "public"."addresses" to "anon";

grant references on table "public"."addresses" to "anon";

grant select on table "public"."addresses" to "anon";

grant trigger on table "public"."addresses" to "anon";

grant truncate on table "public"."addresses" to "anon";

grant update on table "public"."addresses" to "anon";

grant delete on table "public"."addresses" to "authenticated";

grant insert on table "public"."addresses" to "authenticated";

grant references on table "public"."addresses" to "authenticated";

grant select on table "public"."addresses" to "authenticated";

grant trigger on table "public"."addresses" to "authenticated";

grant truncate on table "public"."addresses" to "authenticated";

grant update on table "public"."addresses" to "authenticated";

grant delete on table "public"."addresses" to "service_role";

grant insert on table "public"."addresses" to "service_role";

grant references on table "public"."addresses" to "service_role";

grant select on table "public"."addresses" to "service_role";

grant trigger on table "public"."addresses" to "service_role";

grant truncate on table "public"."addresses" to "service_role";

grant update on table "public"."addresses" to "service_role";

grant delete on table "public"."breed_categories" to "anon";

grant insert on table "public"."breed_categories" to "anon";

grant references on table "public"."breed_categories" to "anon";

grant select on table "public"."breed_categories" to "anon";

grant trigger on table "public"."breed_categories" to "anon";

grant truncate on table "public"."breed_categories" to "anon";

grant update on table "public"."breed_categories" to "anon";

grant delete on table "public"."breed_categories" to "authenticated";

grant insert on table "public"."breed_categories" to "authenticated";

grant references on table "public"."breed_categories" to "authenticated";

grant select on table "public"."breed_categories" to "authenticated";

grant trigger on table "public"."breed_categories" to "authenticated";

grant truncate on table "public"."breed_categories" to "authenticated";

grant update on table "public"."breed_categories" to "authenticated";

grant delete on table "public"."breed_categories" to "service_role";

grant insert on table "public"."breed_categories" to "service_role";

grant references on table "public"."breed_categories" to "service_role";

grant select on table "public"."breed_categories" to "service_role";

grant trigger on table "public"."breed_categories" to "service_role";

grant truncate on table "public"."breed_categories" to "service_role";

grant update on table "public"."breed_categories" to "service_role";

grant delete on table "public"."breed_category_breeds" to "anon";

grant insert on table "public"."breed_category_breeds" to "anon";

grant references on table "public"."breed_category_breeds" to "anon";

grant select on table "public"."breed_category_breeds" to "anon";

grant trigger on table "public"."breed_category_breeds" to "anon";

grant truncate on table "public"."breed_category_breeds" to "anon";

grant update on table "public"."breed_category_breeds" to "anon";

grant delete on table "public"."breed_category_breeds" to "authenticated";

grant insert on table "public"."breed_category_breeds" to "authenticated";

grant references on table "public"."breed_category_breeds" to "authenticated";

grant select on table "public"."breed_category_breeds" to "authenticated";

grant trigger on table "public"."breed_category_breeds" to "authenticated";

grant truncate on table "public"."breed_category_breeds" to "authenticated";

grant update on table "public"."breed_category_breeds" to "authenticated";

grant delete on table "public"."breed_category_breeds" to "service_role";

grant insert on table "public"."breed_category_breeds" to "service_role";

grant references on table "public"."breed_category_breeds" to "service_role";

grant select on table "public"."breed_category_breeds" to "service_role";

grant trigger on table "public"."breed_category_breeds" to "service_role";

grant truncate on table "public"."breed_category_breeds" to "service_role";

grant update on table "public"."breed_category_breeds" to "service_role";

grant delete on table "public"."customer_packages" to "anon";

grant insert on table "public"."customer_packages" to "anon";

grant references on table "public"."customer_packages" to "anon";

grant select on table "public"."customer_packages" to "anon";

grant trigger on table "public"."customer_packages" to "anon";

grant truncate on table "public"."customer_packages" to "anon";

grant update on table "public"."customer_packages" to "anon";

grant delete on table "public"."customer_packages" to "authenticated";

grant insert on table "public"."customer_packages" to "authenticated";

grant references on table "public"."customer_packages" to "authenticated";

grant select on table "public"."customer_packages" to "authenticated";

grant trigger on table "public"."customer_packages" to "authenticated";

grant truncate on table "public"."customer_packages" to "authenticated";

grant update on table "public"."customer_packages" to "authenticated";

grant delete on table "public"."customer_packages" to "service_role";

grant insert on table "public"."customer_packages" to "service_role";

grant references on table "public"."customer_packages" to "service_role";

grant select on table "public"."customer_packages" to "service_role";

grant trigger on table "public"."customer_packages" to "service_role";

grant truncate on table "public"."customer_packages" to "service_role";

grant update on table "public"."customer_packages" to "service_role";

grant delete on table "public"."duration_discounts" to "anon";

grant insert on table "public"."duration_discounts" to "anon";

grant references on table "public"."duration_discounts" to "anon";

grant select on table "public"."duration_discounts" to "anon";

grant trigger on table "public"."duration_discounts" to "anon";

grant truncate on table "public"."duration_discounts" to "anon";

grant update on table "public"."duration_discounts" to "anon";

grant delete on table "public"."duration_discounts" to "authenticated";

grant insert on table "public"."duration_discounts" to "authenticated";

grant references on table "public"."duration_discounts" to "authenticated";

grant select on table "public"."duration_discounts" to "authenticated";

grant trigger on table "public"."duration_discounts" to "authenticated";

grant truncate on table "public"."duration_discounts" to "authenticated";

grant update on table "public"."duration_discounts" to "authenticated";

grant delete on table "public"."duration_discounts" to "service_role";

grant insert on table "public"."duration_discounts" to "service_role";

grant references on table "public"."duration_discounts" to "service_role";

grant select on table "public"."duration_discounts" to "service_role";

grant trigger on table "public"."duration_discounts" to "service_role";

grant truncate on table "public"."duration_discounts" to "service_role";

grant update on table "public"."duration_discounts" to "service_role";

grant delete on table "public"."emergency_contacts" to "anon";

grant insert on table "public"."emergency_contacts" to "anon";

grant references on table "public"."emergency_contacts" to "anon";

grant select on table "public"."emergency_contacts" to "anon";

grant trigger on table "public"."emergency_contacts" to "anon";

grant truncate on table "public"."emergency_contacts" to "anon";

grant update on table "public"."emergency_contacts" to "anon";

grant delete on table "public"."emergency_contacts" to "authenticated";

grant insert on table "public"."emergency_contacts" to "authenticated";

grant references on table "public"."emergency_contacts" to "authenticated";

grant select on table "public"."emergency_contacts" to "authenticated";

grant trigger on table "public"."emergency_contacts" to "authenticated";

grant truncate on table "public"."emergency_contacts" to "authenticated";

grant update on table "public"."emergency_contacts" to "authenticated";

grant delete on table "public"."emergency_contacts" to "service_role";

grant insert on table "public"."emergency_contacts" to "service_role";

grant references on table "public"."emergency_contacts" to "service_role";

grant select on table "public"."emergency_contacts" to "service_role";

grant trigger on table "public"."emergency_contacts" to "service_role";

grant truncate on table "public"."emergency_contacts" to "service_role";

grant update on table "public"."emergency_contacts" to "service_role";

grant delete on table "public"."packages" to "anon";

grant insert on table "public"."packages" to "anon";

grant references on table "public"."packages" to "anon";

grant select on table "public"."packages" to "anon";

grant trigger on table "public"."packages" to "anon";

grant truncate on table "public"."packages" to "anon";

grant update on table "public"."packages" to "anon";

grant delete on table "public"."packages" to "authenticated";

grant insert on table "public"."packages" to "authenticated";

grant references on table "public"."packages" to "authenticated";

grant select on table "public"."packages" to "authenticated";

grant trigger on table "public"."packages" to "authenticated";

grant truncate on table "public"."packages" to "authenticated";

grant update on table "public"."packages" to "authenticated";

grant delete on table "public"."packages" to "service_role";

grant insert on table "public"."packages" to "service_role";

grant references on table "public"."packages" to "service_role";

grant select on table "public"."packages" to "service_role";

grant trigger on table "public"."packages" to "service_role";

grant truncate on table "public"."packages" to "service_role";

grant update on table "public"."packages" to "service_role";

grant delete on table "public"."price_adjustments" to "anon";

grant insert on table "public"."price_adjustments" to "anon";

grant references on table "public"."price_adjustments" to "anon";

grant select on table "public"."price_adjustments" to "anon";

grant trigger on table "public"."price_adjustments" to "anon";

grant truncate on table "public"."price_adjustments" to "anon";

grant update on table "public"."price_adjustments" to "anon";

grant delete on table "public"."price_adjustments" to "authenticated";

grant insert on table "public"."price_adjustments" to "authenticated";

grant references on table "public"."price_adjustments" to "authenticated";

grant select on table "public"."price_adjustments" to "authenticated";

grant trigger on table "public"."price_adjustments" to "authenticated";

grant truncate on table "public"."price_adjustments" to "authenticated";

grant update on table "public"."price_adjustments" to "authenticated";

grant delete on table "public"."price_adjustments" to "service_role";

grant insert on table "public"."price_adjustments" to "service_role";

grant references on table "public"."price_adjustments" to "service_role";

grant select on table "public"."price_adjustments" to "service_role";

grant trigger on table "public"."price_adjustments" to "service_role";

grant truncate on table "public"."price_adjustments" to "service_role";

grant update on table "public"."price_adjustments" to "service_role";

grant delete on table "public"."pricing_rules" to "anon";

grant insert on table "public"."pricing_rules" to "anon";

grant references on table "public"."pricing_rules" to "anon";

grant select on table "public"."pricing_rules" to "anon";

grant trigger on table "public"."pricing_rules" to "anon";

grant truncate on table "public"."pricing_rules" to "anon";

grant update on table "public"."pricing_rules" to "anon";

grant delete on table "public"."pricing_rules" to "authenticated";

grant insert on table "public"."pricing_rules" to "authenticated";

grant references on table "public"."pricing_rules" to "authenticated";

grant select on table "public"."pricing_rules" to "authenticated";

grant trigger on table "public"."pricing_rules" to "authenticated";

grant truncate on table "public"."pricing_rules" to "authenticated";

grant update on table "public"."pricing_rules" to "authenticated";

grant delete on table "public"."pricing_rules" to "service_role";

grant insert on table "public"."pricing_rules" to "service_role";

grant references on table "public"."pricing_rules" to "service_role";

grant select on table "public"."pricing_rules" to "service_role";

grant trigger on table "public"."pricing_rules" to "service_role";

grant truncate on table "public"."pricing_rules" to "service_role";

grant update on table "public"."pricing_rules" to "service_role";

grant delete on table "public"."recurrence_patterns" to "anon";

grant insert on table "public"."recurrence_patterns" to "anon";

grant references on table "public"."recurrence_patterns" to "anon";

grant select on table "public"."recurrence_patterns" to "anon";

grant trigger on table "public"."recurrence_patterns" to "anon";

grant truncate on table "public"."recurrence_patterns" to "anon";

grant update on table "public"."recurrence_patterns" to "anon";

grant delete on table "public"."recurrence_patterns" to "authenticated";

grant insert on table "public"."recurrence_patterns" to "authenticated";

grant references on table "public"."recurrence_patterns" to "authenticated";

grant select on table "public"."recurrence_patterns" to "authenticated";

grant trigger on table "public"."recurrence_patterns" to "authenticated";

grant truncate on table "public"."recurrence_patterns" to "authenticated";

grant update on table "public"."recurrence_patterns" to "authenticated";

grant delete on table "public"."recurrence_patterns" to "service_role";

grant insert on table "public"."recurrence_patterns" to "service_role";

grant references on table "public"."recurrence_patterns" to "service_role";

grant select on table "public"."recurrence_patterns" to "service_role";

grant trigger on table "public"."recurrence_patterns" to "service_role";

grant truncate on table "public"."recurrence_patterns" to "service_role";

grant update on table "public"."recurrence_patterns" to "service_role";

grant delete on table "public"."reservation_addons" to "anon";

grant insert on table "public"."reservation_addons" to "anon";

grant references on table "public"."reservation_addons" to "anon";

grant select on table "public"."reservation_addons" to "anon";

grant trigger on table "public"."reservation_addons" to "anon";

grant truncate on table "public"."reservation_addons" to "anon";

grant update on table "public"."reservation_addons" to "anon";

grant delete on table "public"."reservation_addons" to "authenticated";

grant insert on table "public"."reservation_addons" to "authenticated";

grant references on table "public"."reservation_addons" to "authenticated";

grant select on table "public"."reservation_addons" to "authenticated";

grant trigger on table "public"."reservation_addons" to "authenticated";

grant truncate on table "public"."reservation_addons" to "authenticated";

grant update on table "public"."reservation_addons" to "authenticated";

grant delete on table "public"."reservation_addons" to "service_role";

grant insert on table "public"."reservation_addons" to "service_role";

grant references on table "public"."reservation_addons" to "service_role";

grant select on table "public"."reservation_addons" to "service_role";

grant trigger on table "public"."reservation_addons" to "service_role";

grant truncate on table "public"."reservation_addons" to "service_role";

grant update on table "public"."reservation_addons" to "service_role";

grant delete on table "public"."reservation_groups" to "anon";

grant insert on table "public"."reservation_groups" to "anon";

grant references on table "public"."reservation_groups" to "anon";

grant select on table "public"."reservation_groups" to "anon";

grant trigger on table "public"."reservation_groups" to "anon";

grant truncate on table "public"."reservation_groups" to "anon";

grant update on table "public"."reservation_groups" to "anon";

grant delete on table "public"."reservation_groups" to "authenticated";

grant insert on table "public"."reservation_groups" to "authenticated";

grant references on table "public"."reservation_groups" to "authenticated";

grant select on table "public"."reservation_groups" to "authenticated";

grant trigger on table "public"."reservation_groups" to "authenticated";

grant truncate on table "public"."reservation_groups" to "authenticated";

grant update on table "public"."reservation_groups" to "authenticated";

grant delete on table "public"."reservation_groups" to "service_role";

grant insert on table "public"."reservation_groups" to "service_role";

grant references on table "public"."reservation_groups" to "service_role";

grant select on table "public"."reservation_groups" to "service_role";

grant trigger on table "public"."reservation_groups" to "service_role";

grant truncate on table "public"."reservation_groups" to "service_role";

grant update on table "public"."reservation_groups" to "service_role";

grant delete on table "public"."reservations" to "anon";

grant insert on table "public"."reservations" to "anon";

grant references on table "public"."reservations" to "anon";

grant select on table "public"."reservations" to "anon";

grant trigger on table "public"."reservations" to "anon";

grant truncate on table "public"."reservations" to "anon";

grant update on table "public"."reservations" to "anon";

grant delete on table "public"."reservations" to "authenticated";

grant insert on table "public"."reservations" to "authenticated";

grant references on table "public"."reservations" to "authenticated";

grant select on table "public"."reservations" to "authenticated";

grant trigger on table "public"."reservations" to "authenticated";

grant truncate on table "public"."reservations" to "authenticated";

grant update on table "public"."reservations" to "authenticated";

grant delete on table "public"."reservations" to "service_role";

grant insert on table "public"."reservations" to "service_role";

grant references on table "public"."reservations" to "service_role";

grant select on table "public"."reservations" to "service_role";

grant trigger on table "public"."reservations" to "service_role";

grant truncate on table "public"."reservations" to "service_role";

grant update on table "public"."reservations" to "service_role";

grant delete on table "public"."service_tiers" to "anon";

grant insert on table "public"."service_tiers" to "anon";

grant references on table "public"."service_tiers" to "anon";

grant select on table "public"."service_tiers" to "anon";

grant trigger on table "public"."service_tiers" to "anon";

grant truncate on table "public"."service_tiers" to "anon";

grant update on table "public"."service_tiers" to "anon";

grant delete on table "public"."service_tiers" to "authenticated";

grant insert on table "public"."service_tiers" to "authenticated";

grant references on table "public"."service_tiers" to "authenticated";

grant select on table "public"."service_tiers" to "authenticated";

grant trigger on table "public"."service_tiers" to "authenticated";

grant truncate on table "public"."service_tiers" to "authenticated";

grant update on table "public"."service_tiers" to "authenticated";

grant delete on table "public"."service_tiers" to "service_role";

grant insert on table "public"."service_tiers" to "service_role";

grant references on table "public"."service_tiers" to "service_role";

grant select on table "public"."service_tiers" to "service_role";

grant trigger on table "public"."service_tiers" to "service_role";

grant truncate on table "public"."service_tiers" to "service_role";

grant update on table "public"."service_tiers" to "service_role";

grant delete on table "public"."services" to "anon";

grant insert on table "public"."services" to "anon";

grant references on table "public"."services" to "anon";

grant select on table "public"."services" to "anon";

grant trigger on table "public"."services" to "anon";

grant truncate on table "public"."services" to "anon";

grant update on table "public"."services" to "anon";

grant delete on table "public"."services" to "authenticated";

grant insert on table "public"."services" to "authenticated";

grant references on table "public"."services" to "authenticated";

grant select on table "public"."services" to "authenticated";

grant trigger on table "public"."services" to "authenticated";

grant truncate on table "public"."services" to "authenticated";

grant update on table "public"."services" to "authenticated";

grant delete on table "public"."services" to "service_role";

grant insert on table "public"."services" to "service_role";

grant references on table "public"."services" to "service_role";

grant select on table "public"."services" to "service_role";

grant trigger on table "public"."services" to "service_role";

grant truncate on table "public"."services" to "service_role";

grant update on table "public"."services" to "service_role";

grant delete on table "public"."size_categories" to "anon";

grant insert on table "public"."size_categories" to "anon";

grant references on table "public"."size_categories" to "anon";

grant select on table "public"."size_categories" to "anon";

grant trigger on table "public"."size_categories" to "anon";

grant truncate on table "public"."size_categories" to "anon";

grant update on table "public"."size_categories" to "anon";

grant delete on table "public"."size_categories" to "authenticated";

grant insert on table "public"."size_categories" to "authenticated";

grant references on table "public"."size_categories" to "authenticated";

grant select on table "public"."size_categories" to "authenticated";

grant trigger on table "public"."size_categories" to "authenticated";

grant truncate on table "public"."size_categories" to "authenticated";

grant update on table "public"."size_categories" to "authenticated";

grant delete on table "public"."size_categories" to "service_role";

grant insert on table "public"."size_categories" to "service_role";

grant references on table "public"."size_categories" to "service_role";

grant select on table "public"."size_categories" to "service_role";

grant trigger on table "public"."size_categories" to "service_role";

grant truncate on table "public"."size_categories" to "service_role";

grant update on table "public"."size_categories" to "service_role";

grant delete on table "public"."time_based_pricing" to "anon";

grant insert on table "public"."time_based_pricing" to "anon";

grant references on table "public"."time_based_pricing" to "anon";

grant select on table "public"."time_based_pricing" to "anon";

grant trigger on table "public"."time_based_pricing" to "anon";

grant truncate on table "public"."time_based_pricing" to "anon";

grant update on table "public"."time_based_pricing" to "anon";

grant delete on table "public"."time_based_pricing" to "authenticated";

grant insert on table "public"."time_based_pricing" to "authenticated";

grant references on table "public"."time_based_pricing" to "authenticated";

grant select on table "public"."time_based_pricing" to "authenticated";

grant trigger on table "public"."time_based_pricing" to "authenticated";

grant truncate on table "public"."time_based_pricing" to "authenticated";

grant update on table "public"."time_based_pricing" to "authenticated";

grant delete on table "public"."time_based_pricing" to "service_role";

grant insert on table "public"."time_based_pricing" to "service_role";

grant references on table "public"."time_based_pricing" to "service_role";

grant select on table "public"."time_based_pricing" to "service_role";

grant trigger on table "public"."time_based_pricing" to "service_role";

grant truncate on table "public"."time_based_pricing" to "service_role";

grant update on table "public"."time_based_pricing" to "service_role";

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.addons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.breed_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.breed_category_breeds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.customer_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.duration_discounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.emergency_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.pet_parents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.pets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.price_adjustments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.pricing_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.reservation_addons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.service_tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.size_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.time_based_pricing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


