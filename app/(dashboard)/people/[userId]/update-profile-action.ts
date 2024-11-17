'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import type { Database } from '@/utils/supabase/types';
import indexUserAction from '@/utils/typesense/index-user-action';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import { revalidatePath } from 'next/cache';
import { ServerError } from 'typesense/lib/Typesense/Errors';
import { z } from 'zod';

const schema = z.object({
  userShortId: z.string(),
  email: z.string().email().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  phone: z
    .string()
    .refine((p) => isValidPhoneNumber(p))
    .or(z.literal(''))
    .nullish()
    .catch(null)
    .transform((p) =>
      typeof p === 'string'
        ? parsePhoneNumberWithError(p, 'US').number
        : undefined,
    ),
});

export type UpdateProfileActionArgs = z.input<typeof schema>;

const updateProfileAction = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { userShortId, email, lastName, firstName, phone },
    }) => {
      if (
        !email &&
        lastName === undefined &&
        firstName === undefined &&
        !phone
      ) {
        return;
      }

      const supabase = await getServerClient();

      const updates: Database['public']['Tables']['users']['Update'] = {};

      if (email) {
        updates.email = email;
      }
      if (typeof lastName !== 'undefined') {
        updates.last_name = lastName;
      }
      if (typeof firstName !== 'undefined') {
        updates.first_name = firstName;
      }
      if (phone) {
        updates.phone = phone;
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('short_id', userShortId)
        .single();

      if (error) {
        throw new ServerError(error.message);
      }

      await indexUserAction({ userShortId }).catch(console.error);

      revalidatePath(`/users/${userShortId}`);
    },
  );

export default updateProfileAction;
