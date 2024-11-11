import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { userDocumentSchema } from '@/lib/typesense/document-schemas';
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
    name: 'users',
    enable_nested_fields: true,
    fields: [
      { name: 'avatar_url', type: 'string', optional: true, index: false },
      { name: 'created_at', type: 'int32', index: false },
      { name: 'email', type: 'string', optional: true },
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string', optional: true },
      { name: 'phone', type: 'string[]', optional: true },
      { name: 'role', type: 'string', facet: true },
      { name: 'tenant_id', type: 'string' },
    ],
    token_separators: ['(', ')', '-', '+', '@', '.'],
  });

  const supabase = getAdminClient();

  const usersSearchKey = await typesense.keys().create({
    actions: ['documents:search'],
    collections: ['users'],
    // TODO
    // expires_at: expiresAt,
    description: 'Users search key',
  });
  invariant(usersSearchKey.value, 'Failed to create users search key');

  console.log('Users search key:', usersSearchKey.value);

  const userInserts = await supabase
    .from('tenant_users')
    .select('*, users(*)')
    .then(
      ({ data }) =>
        data?.map(
          (tu) =>
            ({
              avatar_url: undefined,
              created_at: formatDateForIndexing(tu.created_at),
              email: tu.users!.email,
              id: tu.users!.id,
              name: tu.users!.first_name!,
              phone: tu.users!.phone
                ? formatPhoneNumberForIndexing(tu.users!.phone)
                : undefined,
              role: tu.role,
              tenant_id: tu.tenant_id,
            }) satisfies z.infer<typeof userDocumentSchema>,
        ) ?? [],
    );

  console.log({ userInserts });

  if (userInserts.length) {
    await typesense
      .collections('users')
      .documents()
      .import(userInserts, { action: 'create', return_id: true })
      .then(console.log);
  }
}

reset();
