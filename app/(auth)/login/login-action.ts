'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { redirect } from 'next/navigation';
import { ServerError } from 'typesense/lib/Typesense/Errors';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await getServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new ServerError(error.message);
    }

    const tenantShortId = null;

    redirect(tenantShortId ? '/dashboard' : '/get-started');
  });

export default loginAction;
