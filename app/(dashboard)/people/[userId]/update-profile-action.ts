'use server';

import { actionClient } from '@/lib/safe-action';
import { z } from 'zod';

const schema = z.object({
  userShortId: z.string(),
  email: z.string().email().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export type UpdateProfileActionArgs = z.infer<typeof schema>;

const updateProfileAction = actionClient.schema(schema).action(async () => {
  // TODO
});

export default updateProfileAction;
