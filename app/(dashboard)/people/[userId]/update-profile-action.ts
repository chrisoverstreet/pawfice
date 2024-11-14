'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexTenantProfileAction from '@/utils/typesense/index-tenant-profile-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  tenantProfileId: z.string(),
  email: z.string().email().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export type UpdateProfileActionArgs = z.infer<typeof schema>;

const updateProfileAction = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { email, firstName, lastName, tenantProfileId },
    }) => {
      const supabase = await getServerClient();

      await supabase
        .rpc('update_customer_profile', {
          p_profile_id: tenantProfileId,
          p_email: email ?? undefined,
          p_first_name: firstName ?? undefined,
          p_last_name: lastName ?? undefined,
        })
        .single()
        .throwOnError();

      // const petIds = await supabase
      //   .from('pet_parents')
      //   .select('pet_id')
      //   .eq('tenant_profile_id', tenantProfileId)
      //   .then(({ data }) => data?.map((pp) => pp.pet_id));

      revalidatePath(`/people/${tenantProfileId}`);

      await Promise.all([
        indexTenantProfileAction({ id: tenantProfileId }),
        // ...(petIds?.map((id) => indexPetAction({ id })) ?? []),
      ]).catch(console.error);
    },
  );

export default updateProfileAction;
