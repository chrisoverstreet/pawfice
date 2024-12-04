import type { Enums } from '@/utils/supabase/types';
import { z } from 'zod';

export const petDocumentSchema = z.object({
  avatar_url: z.string().nullish(),
  created_at: z.number().int(),
  id: z.string(),
  name: z.string(),
  tenant_id: z.string(),
  parents: z.array(
    z.object({
      avatar_url: z.string().nullish(),
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type PetDocument = z.infer<typeof petDocumentSchema>;

export const userDocumentSchema = z.object({
  avatar_url: z.string().nullish(),
  created_at: z.number().int(),
  email: z.string().email().nullish(),
  first_name: z.string().nullish(),
  id: z.string(),
  initials: z.string().nullish(),
  last_name: z.string().nullish(),
  name: z.string().nullish(),
  phone: z.array(z.string()).nullish(),
  role: z.enum(['owner', 'admin', 'parent']) satisfies z.ZodType<
    Enums<'tenant_role'>
  >,
  tenant_id: z.string(),
  userId: z.string().nullish(),
  pets: z
    .array(
      z.object({
        avatar_url: z.string().nullish(),
        id: z.string(),
        name: z.string(),
      }),
    )
    .nullish(),
});

export type UserDocument = z.infer<typeof userDocumentSchema>;
