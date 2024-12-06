'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexUserAction from '@/utils/typesense/index-user-action';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
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
    .optional()
    .transform((p) =>
      p ? parsePhoneNumberWithError(p, 'US').number : undefined,
    ),
});

const addParentAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { firstName, lastName, email, phone } }) => {
    console.log('test');

    const supabase = await getServerClient();

    const { data: userShortId, error } = await supabase.rpc('add_parent', {
      p_email: email,
      p_first_name: firstName,
      p_last_name: lastName,
      p_phone: phone,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    await indexUserAction({ userShortId }).catch(console.error);

    return userShortId;
  });

export default addParentAction;
