import { z } from 'zod';

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
});
