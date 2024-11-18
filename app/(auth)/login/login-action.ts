'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import decodeAccessToken from '@/utils/supabase/decode-access-token';
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new ServerError(error.message);
    }

    const tenantId = (await decodeAccessToken(data.session.access_token))
      ?.tenant_id;

    redirect(tenantId ? '/dashboard' : '/get-started');
  });

export default loginAction;
