'use server';

import { actionClient } from '@/lib/safe-action';
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

    redirect('/get-started');
  });
