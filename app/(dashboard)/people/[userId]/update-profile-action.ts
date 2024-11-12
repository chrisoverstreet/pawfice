'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import type { TablesUpdate } from '@/utils/supabase/types';
import indexPetAction from '@/utils/typesense/index-pet-action';
import indexTenantProfileAction from '@/utils/typesense/index-tenant-profile-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  tenantProfileId: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export type UpdateProfileActionArgs = z.infer<typeof schema>;

const updateProfileAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { firstName, lastName, tenantProfileId } }) => {
    if (!firstName && lastName === undefined) {
      return;
    }

    const supabase = await getServerClient();

    const updates: TablesUpdate<'tenant_profiles'> = {};

    if (firstName) {
      updates.first_name = firstName;
    }
    if (lastName !== undefined) {
      updates.last_name = lastName;
    }

    const { error } = await supabase
      .from('tenant_profiles')
      .update(updates)
      .eq('id', tenantProfileId)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    const petIds = await supabase
      .from('pet_parents')
      .select('pet_id')
      .eq('tenant_profile_id', tenantProfileId)
      .then(({ data }) => data?.map((pp) => pp.pet_id));

    await Promise.all([
      indexTenantProfileAction({ id: tenantProfileId }),
      ...(petIds?.map((id) => indexPetAction({ id })) ?? []),
    ]).catch(console.error);

    revalidatePath(`/people/${tenantProfileId}`);
  });

export default updateProfileAction;
