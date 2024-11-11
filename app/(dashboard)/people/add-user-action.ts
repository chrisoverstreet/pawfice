'use server';

import { actionClient } from '@/lib/safe-action';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
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

    let data;
    let error;

    ({ data, error } = await supabase
      .rpc('create_tenant_profile', {
        p_first_name: firstName,
        p_last_name: lastName,
        p_email: email,
        p_phone: phone,
      })
      .single());

    if (
      error?.message ===
        'AUTH_REQUIRED: No auth user found for contact details. Please create auth user first.' &&
      (email || phone)
    ) {
      const supabaseAdmin = getAdminClient();
      const { error: addAuthUserError } =
        await supabaseAdmin.auth.admin.createUser({ email, phone });
      if (addAuthUserError) {
        throw addAuthUserError;
      }

      // Try again
      ({ data, error } = await supabase
        .rpc('create_tenant_profile', {
          p_first_name: firstName,
          p_last_name: lastName,
          p_email: email,
          p_phone: phone,
        })
        .single());
    }

    if (error || !data) {
      throw error || new Error('Unexpected error');
    }

    await indexTenantProfileAction({ id: data }).catch(console.error);

    return data;
  });

export default addUserAction;
