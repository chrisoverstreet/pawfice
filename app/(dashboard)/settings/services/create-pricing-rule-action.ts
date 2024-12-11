'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  serviceId: z.number(),
  serviceTierId: z.number().nullish(),
  name: z.string().min(1),
  description: z.string().nullish(),
  basePrice: z.number().min(0),
});

const createPricingRuleAction = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { serviceId, serviceTierId, name, description, basePrice },
    }) => {
      const supabase = await getServerClient();

      const { error } = await supabase.rpc('create_pricing_rule', {
        p_service_id: serviceId,
        p_service_tier_id: serviceTierId ?? undefined,
        p_name: name,
        p_description: description ?? undefined,
        p_base_price: basePrice,
      });

      if (error) {
        throw error;
      }

      revalidatePath('/dashboard/settings/services');
    },
  );

export default createPricingRuleAction;
