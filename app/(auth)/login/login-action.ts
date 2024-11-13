'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await getServerClient();

    const { data: authUser, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      throw signInError;
    }

    if (
      authUser.user.app_metadata.tenant_id &&
      authUser.user.app_metadata.role
    ) {
      const { error } = await supabase
        .from('tenant_memberships')
        .select('*')
        .match({
          user_id: authUser.user.id,
          tenant_id: authUser.user.app_metadata.tenant_id,
          role: authUser.user.app_metadata.role,
        })
        .single();
      if (!error) {
        redirect('/dashboard');
      }
    }

    const { data: tenantMembership } = await supabase
      .from('tenant_memberships')
      .select('*')
      .eq('user_id', authUser.user.id)
      .limit(1)
      .order('created_at', { ascending: false })
      .single();

    const supabaseAdmin = getAdminClient();

    await supabaseAdmin.auth.admin.updateUserById(authUser.user.id, {
      app_metadata: {
        tenant_id: tenantMembership ? tenantMembership.tenant_id : undefined,
        role: tenantMembership ? tenantMembership.role : undefined,
      },
    });

    await supabase.auth.refreshSession();

    redirect(tenantMembership ? '/dashboard' : '/get-started');
  });

export default loginAction;
