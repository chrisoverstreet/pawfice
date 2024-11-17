'use server';

import { actionClient } from '@/lib/safe-action';
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

const addUserAction = actionClient.schema(schema).action(async () => {
  // TODO
});

export default addUserAction;
