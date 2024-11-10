'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

const addTenantAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name } }) => {
    const supabase = await getServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Must be signed in');
    }

    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name,
      })
      .select('id')
      .single();

    if (tenantError) {
      throw tenantError;
    }

    const supabaseAdmin = getAdminClient();

    const { data: tenantUserData, error: tenantUserError } = await supabaseAdmin
      .from('tenant_users')
      .insert({
        role: 'owner',
        tenant_id: tenantData.id,
        user_id: user.id,
      })
      .select('tenant_id, role')
      .single();

    if (tenantUserError) {
      // Clean up
      await supabase.from('tenants').delete().eq('id', tenantData.id);

      throw tenantUserError;
    }

    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: {
        tenant_id: tenantUserData.tenant_id,
        tenant_role: tenantUserData.role,
      },
    });

    await supabase.auth.refreshSession();
  });

export default addTenantAction;
