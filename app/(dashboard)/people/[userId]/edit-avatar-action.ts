'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexUserAction from '@/utils/typesense/index-user-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  userShortId: z.string(),
  path: z.string(),
});

const editAvatarAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { userShortId, path } }) => {
    const supabase = await getServerClient();

    const { error } = await supabase
      .from('users')
      .update({
        avatar_url: supabase.storage.from('user_avatars').getPublicUrl(path)
          .data.publicUrl,
      })
      .eq('short_id', userShortId)
      .single();

    if (error) {
      throw error;
    }

    await Promise.all([indexUserAction({ userShortId })]).catch(console.error);

    revalidatePath(`/people/${userShortId}`);
  });

export default editAvatarAction;
