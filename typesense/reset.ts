import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { userDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
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
    name: 'users',
    enable_nested_fields: true,
    fields: [
      { name: 'avatar_url', type: 'string', optional: true, index: false },
      { name: 'created_at', type: 'int32', index: false },
      { name: 'email', type: 'string', optional: true },
      { name: 'first_name', type: 'string', optional: true },
      { name: 'id', type: 'string' },
      { name: 'initials', type: 'string', index: false, optional: true },
      { name: 'last_name', type: 'string', optional: true },
      { name: 'name', type: 'string', optional: true },
      { name: 'phone', type: 'string[]', optional: true },
      { name: 'role', type: 'string', facet: true },
      { name: 'tenant_id', type: 'string' },
      { name: 'user_id', type: 'string', optional: true },
      { name: 'pets', type: 'object[]', optional: true },
      { name: 'pets.avatar_url', type: 'string', optional: true, index: false },
      { name: 'pets.id', type: 'string[]', optional: true },
      { name: 'pets.name', type: 'string[]', optional: true },
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
    collections: ['users'],
    // TODO
    // expires_at: expiresAt,
    description: 'Users search key',
  });
  invariant(tenantProfilesSearchKey.value, 'Failed to create users search key');

  // TODO
  console.log({
    petsSearchKey,
    tenantProfilesSearchKey,
  });

  // const petInserts = await supabase
  //   .rpc('format_pets_for_typesense')
  //   .then(({ data }) => z.array(petDocumentSchema).parse(data));
  //
  // if (petInserts.length) {
  //   await typesense
  //     .collections('pets')
  //     .documents()
  //     .import(petInserts, { action: 'create', return_doc: true });
  // }

  const tenantProfileInserts = await supabase
    .rpc('format_users_for_typesense')
    .then((res) => {
      console.dir(res, { depth: 5 });
      return res;
    })
    .then(({ data }) => z.array(userDocumentSchema).parse(data));

  if (tenantProfileInserts.length) {
    await typesense
      .collections('users')
      .documents()
      .import(tenantProfileInserts, { action: 'create', return_doc: true });
  }
}

reset();
