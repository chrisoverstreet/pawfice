'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexPetAction from '@/utils/typesense/index-pet-action';
import indexTenantProfileAction from '@/utils/typesense/index-tenant-profile-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  tenantProfileId: z.string(),
  path: z.string(),
});

const editAvatarAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { tenantProfileId, path } }) => {
    const supabase = await getServerClient();

    const { error } = await supabase
      .from('tenant_profiles')
      .update({
        avatar_url: supabase.storage.from('user_avatars').getPublicUrl(path)
          .data.publicUrl,
      })
      .eq('id', tenantProfileId)
      .single();

    if (error) {
      throw error;
    }

    const petIds = await supabase
      .from('pet_parents')
      .select('pet_id')
      .eq('tenant_profile_id', tenantProfileId)
      .then(({ data }) => data?.map((pp) => pp.pet_id) ?? []);

    await Promise.all([
      indexTenantProfileAction({ id: tenantProfileId }),
      ...petIds.map((id) => indexPetAction({ id })),
    ]).catch(console.error);

    revalidatePath(`/people/${tenantProfileId}`);
  });

export default editAvatarAction;
