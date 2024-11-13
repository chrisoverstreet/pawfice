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

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Check platform access
    const { data: hasPlatformAccess } = await supabase.rpc(
      'has_platform_access',
    );
    if (!hasPlatformAccess) {
      throw new Error('No platform access');
    }

    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({ name })
      .select()
      .single();
    if (tenantError) {
      throw tenantError;
    }

    // Create tenant membership
    const { data: tenantMembership, error: membershipError } = await supabase
      .from('tenant_memberships')
      .insert({
        tenant_id: tenant.id,
        user_id: user.id,
        role: 'owner',
      })
      .select('tenant_id, role')
      .single();
    if (membershipError) {
      throw membershipError;
    }

    const supabaseAdmin = getAdminClient();
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: {
        tenant_id: tenantMembership.tenant_id,
        role: tenantMembership.role,
      },
    });

    await supabase.auth.refreshSession();

    return tenant;
  });

export default addTenantAction;
