'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexTenantProfileAction from '@/utils/typesense/index-tenant-profile-action';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    })
    .optional(),
});

const addUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { firstName, lastName, email, phone } }) => {
    const supabase = await getServerClient();

    const { data: customerId, error } = await supabase
      .rpc('create_tenant_customer', {
        p_email: email,
        p_first_name: firstName,
        p_last_name: lastName,
        p_phone: phone,
      })
      .single();

    if (error) {
      throw error;
    }

    await indexTenantProfileAction({ id: customerId }).catch(console.error);

    return customerId;
  });

export default addUserAction;
