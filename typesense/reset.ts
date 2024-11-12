import { getAdminClient } from '@/lib/supabase/get-admin-client';
import {
  petDocumentSchema,
  tenantProfileDocumentSchema,
} from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import formatDateForIndexing from '@/utils/typesense/format-date-for-indexing';
import formatPhoneNumberForIndexing from '@/utils/typesense/format-phone-for-indexing';
import invariant from 'invariant';
import { z } from 'zod';

async function reset() {
  const typesense = getTypesenseAdminClient();

  await typesense
    .keys()
    .retrieve()
    .then((res) =>
      Promise.all(res.keys.map((key) => typesense.keys(key.id).delete())),
    );

  const collections = await typesense.collections().retrieve();

  for (const collection of collections) {
    await typesense.collections(collection.name).delete();
  }

  await typesense.collections().create({
    name: 'pets',
    enable_nested_fields: true,
    fields: [
      { name: 'avatar_url', type: 'string', optional: true, index: false },
      { name: 'created_at', type: 'int32', index: false },
      { name: 'name', type: 'string' },
      { name: 'tenant_id', type: 'string' },
      { name: 'parents', type: 'object[]' },
      {
        name: 'parents.avatar_url',
        type: 'string',
        optional: true,
        index: false,
      },
      { name: 'parents.id', type: 'string[]' },
      { name: 'parents.name', type: 'string[]' },
    ],
  });

  await typesense.collections().create({
    name: 'tenant_profiles',
    fields: [
      { name: 'avatar_url', type: 'string', optional: true, index: false },
      { name: 'created_at', type: 'int32', index: false },
      { name: 'email', type: 'string', optional: true },
      { name: 'first_name', type: 'string' },
      { name: 'id', type: 'string' },
      { name: 'initials', type: 'string', index: false },
      { name: 'last_name', type: 'string', optional: true },
      { name: 'name', type: 'string', optional: true },
      { name: 'phone', type: 'string[]', optional: true },
      { name: 'role', type: 'string', facet: true },
      { name: 'tenant_id', type: 'string' },
      { name: 'user_id', type: 'string', optional: true },
    ],
    token_separators: ['(', ')', '-', '+', '@', '.'],
  });

  const supabase = getAdminClient();

  const petsSearchKey = await typesense.keys().create({
    actions: ['documents:search'],
    collections: ['pets'],
    description: 'Pets search key',
  });
  invariant(petsSearchKey.value, 'Failed ot create pets search key');

  const tenantProfilesSearchKey = await typesense.keys().create({
    actions: ['documents:search'],
    collections: ['tenant_profiles'],
    // TODO
    // expires_at: expiresAt,
    description: 'Tenant profiles search key',
  });
  invariant(
    tenantProfilesSearchKey.value,
    'Failed to create tenant profiles search key',
  );

  // TODO
  console.log({
    petsSearchKey,
    tenantProfilesSearchKey,
  });

  const tenantProfileInserts = await supabase
    .from('tenant_profiles')
    .select('*, users(*)')
    .then(
      ({ data }) =>
        data?.map(
          (tu) =>
            ({
              avatar_url: tu.avatar_url,
              created_at: formatDateForIndexing(tu.created_at),
              email: tu.users?.email,
              first_name: tu.first_name,
              id: tu.id,
              initials: tu.initials,
              last_name: tu.last_name,
              name: tu.name,
              phone: tu.users?.phone
                ? formatPhoneNumberForIndexing(tu.users.phone)
                : undefined,
              role: tu.role,
              tenant_id: tu.tenant_id,
              userId: tu.user_id,
            }) satisfies z.infer<typeof tenantProfileDocumentSchema>,
        ) ?? [],
    );

  if (tenantProfileInserts.length) {
    await typesense
      .collections('tenant_profiles')
      .documents()
      .import(tenantProfileInserts, { action: 'create', return_doc: true });
  }

  const petInserts = await supabase
    .rpc('get_pets_for_typesense')
    .then(({ data }) => z.array(petDocumentSchema).parse(data));

  if (petInserts.length) {
    await typesense
      .collections('pets')
      .documents()
      .import(petInserts, { action: 'create', return_doc: true });
  }
}

reset();
