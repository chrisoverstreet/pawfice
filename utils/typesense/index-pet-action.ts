'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { petDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

const indexPetAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const supabase = await getServerClient();

    const { data, error } = await supabase
      .rpc('get_pet_for_typesense', { p_pet_id: id })
      .single();

    const typesenseAdmin = getTypesenseAdminClient();

    if (error) {
      await typesenseAdmin.collections('pets').documents(id).delete();
    } else {
      await typesenseAdmin
        .collections('pets')
        .documents()
        .upsert(petDocumentSchema.parse(data));
    }
  });

export default indexPetAction;
