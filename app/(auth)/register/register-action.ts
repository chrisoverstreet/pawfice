'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const registerAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password, firstName, lastName } }) => {
    const supabase = await getServerClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError || !authData.user) {
      throw authError || new Error('Unexpected error');
    }

    const supabaseAdmin = getAdminClient();
    const { error: profileError } = await supabaseAdmin
      .from('platform_profiles')
      .insert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
      });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    redirect('/get-started');
  });
