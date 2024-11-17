'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { userDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import { z } from 'zod';

const schema = z.object({
  userShortId: z.string(),
});

const indexUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { userShortId } }) => {
    const supabase = await getServerClient();

    const { data, error } = await supabase
      .rpc('format_user_for_typesense', { user_short_id: userShortId })
      .single();

    const typesenseAdmin = getTypesenseAdminClient();

    if (error) {
      await typesenseAdmin.collections('users').documents(userShortId).delete();
    } else {
      await typesenseAdmin
        .collections('users')
        .documents()
        .upsert(userDocumentSchema.parse(data));
    }
  });

export default indexUserAction;
