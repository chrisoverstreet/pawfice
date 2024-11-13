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

    // Get platform profile info
    const { data: platformProfile, error: platformProfileError } =
      await supabase
        .from('platform_profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();
    if (platformProfileError) {
      throw platformProfileError;
    }

    // Create tenant user profile
    const { data: tenantUserProfile, error: tenantUserProfileError } =
      await supabase
        .from('tenant_user_profiles')
        .insert({
          tenant_id: tenant.id,
          id: user.id,
          auth_user_id: user.id,
          first_name: platformProfile.first_name,
          last_name: platformProfile.last_name,
          role: 'owner',
        })
        .select('tenant_id, role')
        .single();
    if (tenantUserProfileError) {
      throw tenantUserProfileError;
    }

    const supabaseAdmin = getAdminClient();
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: {
        tenant_id: tenantUserProfile.tenant_id,
        role: tenantUserProfile.role,
      },
    });

    await supabase.auth.refreshSession();

    return tenant;
  });

export default addTenantAction;
