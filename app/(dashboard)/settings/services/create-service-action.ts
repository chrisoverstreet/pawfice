'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  type: z.enum(['daycare', 'overnight_boarding', 'grooming']),
});

const createServiceAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, type } }) => {
    const supabase = await getServerClient();

    const { error } = await supabase.rpc('create_service', {
      p_name: name,
      p_type: type,
    });

    if (error) {
      throw error;
    }

    revalidatePath('/dashboard/settings/services');
  });

export default createServiceAction;
