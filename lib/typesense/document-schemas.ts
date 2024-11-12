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

export const tenantProfileDocumentSchema = z.object({
  avatar_url: z.string().nullish(),
  created_at: z.number().int(),
  email: z.string().email().nullish(),
  first_name: z.string(),
  id: z.string(),
  initials: z.string(),
  last_name: z.string().nullish(),
  name: z.string(),
  phone: z.array(z.string()).nullish(),
  role: z.enum(['owner', 'admin', 'parent']),
  tenant_id: z.string(),
  userId: z.string().nullish(),
  pets: z.array(
    z.object({
      avatar_url: z.string().nullish(),
      id: z.string(),
      name: z.string(),
    }),
  ),
});
