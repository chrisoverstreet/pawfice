'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { tenantUserProfileDocumentSchema } from '@/lib/typesense/document-schemas';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

const indexTenantProfileAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const supabase = await getServerClient();

    const { data, error } = await supabase
      .rpc('get_tenant_user_profile_for_typesense', { p_id: id })
      .single();

    const typesenseAdmin = getTypesenseAdminClient();

    if (error) {
      await typesenseAdmin
        .collections('tenant_profiles')
        .documents(id)
        .delete();
    } else {
      await typesenseAdmin
        .collections('tenant_profiles')
        .documents()
        .upsert(tenantUserProfileDocumentSchema.parse(data));
    }
  });

export default indexTenantProfileAction;
