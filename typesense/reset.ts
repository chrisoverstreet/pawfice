import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { tenantProfileDocumentSchema } from '@/lib/typesense/document-schemas';
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
    name: 'tenant_profiles',
    enable_nested_fields: true,
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

  const tenantProfilesSearchKey = await typesense.keys().create({
    actions: ['documents:search'],
    collections: ['tenant_profiles'],
    // TODO
    // expires_at: expiresAt,
    description: 'Tenant profiles search key',
  });
  invariant(tenantProfilesSearchKey.value, 'Failed to create users search key');

  console.log(`tenantProfilesSearchKey: `, tenantProfilesSearchKey);

  const userInserts = await supabase
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

  if (userInserts.length) {
    await typesense
      .collections('tenant_profiles')
      .documents()
      .import(userInserts, { action: 'create', return_id: true })
      .then(console.log);
  }
}

reset();
