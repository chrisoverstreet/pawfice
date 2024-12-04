'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { petDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  petShortId: z.string(),
});

const indexPetAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { petShortId } }) => {
    const supabase = await getServerClient();

    const { data, error } = await supabase
      .rpc('format_pet_for_typesense', {
        pet_short_id: petShortId,
      })
      .single();

    const typesenseAdmin = getTypesenseAdminClient();

    if (error) {
      await typesenseAdmin.collections('pets').documents(petShortId).delete();
    } else {
      await typesenseAdmin
        .collections('pets')
        .documents()
        .upsert(petDocumentSchema.parse(data));
    }

    revalidatePath('/search');
    revalidatePath('/parents/search');
    revalidatePath('/pets/search');
  });

export default indexPetAction;
