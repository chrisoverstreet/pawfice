'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await getServerClient();

    const { data: signInData, error: singInError } =
      await supabase.auth.signInWithPassword({ email, password });
    if (singInError) {
      throw singInError;
    }

    if (signInData.user?.app_metadata.tenant_id) {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: tenantUsersData } = await supabase
        .from('tenant_users')
        .select('tenant_id, role')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .single();

      if (tenantUsersData?.tenant_id) {
        const supabaseAdmin = getAdminClient();
        await supabaseAdmin.auth.admin.updateUserById(session.user.id, {
          app_metadata: {
            tenant_id: tenantUsersData.tenant_id,
            tenant_role: tenantUsersData.role,
          },
        });

        await supabase.auth.refreshSession();
      }
    }
  });

export default loginAction;
