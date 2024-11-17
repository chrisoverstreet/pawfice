'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexUserAction from '@/utils/typesense/index-user-action';
import { ServerError } from 'typesense/lib/Typesense/Errors';
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
      throw new ServerError('Must be signed in');
    }

    const { data: tenant, error: insertTenantError } = await supabase
      .from('tenants')
      .insert({
        name,
      })
      .select('id, short_id')
      .single();

    if (insertTenantError) {
      throw new ServerError(insertTenantError.message);
    }

    const { data: tenantUserData, error: insertTenantUserError } =
      await getAdminClient()
        .from('users')
        .insert({
          auth_id: user.id,
          avatar_url:
            user.user_metadata.avatar_url ||
            user.user_metadata.avatar ||
            user.user_metadata.picture,
          email: user.email,
          email_verified: !!user.email_confirmed_at,
          first_name: user.user_metadata.first_name,
          last_name: user.user_metadata.last_name,
          phone: user.phone,
          phone_verified: !!user.phone_confirmed_at,
          role: 'owner',
          tenant_id: tenant.id,
        })
        .select('short_id')
        .single();

    if (insertTenantUserError) {
      await supabase.from('tenants').delete().eq('id', tenant.id);
      throw new ServerError(insertTenantUserError.message);
    }

    await indexUserAction({ userShortId: tenantUserData.short_id }).catch(
      console.error,
    );

    await supabase.auth.updateUser({
      data: { tenant_short_id: tenant.short_id },
    });

    await supabase.auth.refreshSession();

    return tenant;
  });

export default addTenantAction;
