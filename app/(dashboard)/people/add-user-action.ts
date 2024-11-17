'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexUserAction from '@/utils/typesense/index-user-action';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import { ServerError } from 'typesense/lib/Typesense/Errors';
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

const addUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, firstName, lastName, phone } }) => {
    const supabase = await getServerClient();

    const { data: userShortId, error } = await supabase
      .rpc('create_user', {
        p_email: email,
        p_first_name: firstName,
        p_last_name: lastName,
        p_phone: phone,
      })
      .single();

    if (error) {
      throw new ServerError(error.message);
    }

    await indexUserAction({ userShortId }).catch(console.error);

    return userShortId;
  });

export default addUserAction;
