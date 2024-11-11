'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { tenantProfileDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import formatDateForIndexing from '@/utils/typesense/format-date-for-indexing';
import formatPhoneNumberForIndexing from '@/utils/typesense/format-phone-for-indexing';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

const indexTenantProfileAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const supabaseAdmin = await getAdminClient();

    const { data, error } = await supabaseAdmin
      .from('tenant_profiles')
      .select('*, users(*)')
      .eq('id', id)
      .single();

    const typesenseAdmin = getTypesenseAdminClient();

    if (error) {
      await typesenseAdmin
        .collections('tenant_profiles')
        .documents(id)
        .delete();
    } else {
      const document: z.infer<typeof tenantProfileDocumentSchema> = {
        avatar_url: data.avatar_url,
        created_at: formatDateForIndexing(data.created_at),
        email: data.users?.email,
        first_name: data.first_name,
        id: data.id,
        initials: data.initials,
        last_name: data.last_name,
        name: data.name,
        phone: data.users?.phone
          ? formatPhoneNumberForIndexing(data.users.phone)
          : undefined,
        role: data.role,
        tenant_id: data.tenant_id,
        userId: data.user_id,
      };

      await typesenseAdmin
        .collections('tenant_profiles')
        .documents()
        .upsert(document);
    }
  });

export default indexTenantProfileAction;
