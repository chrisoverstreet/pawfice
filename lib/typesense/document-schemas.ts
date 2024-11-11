import { z } from 'zod';

export const userDocumentSchema = z.object({
  avatar_url: z.string().nullish(),
  created_at: z.number().int(),
  email: z.string().email().nullish(),
  id: z.string(),
  name: z.string(),
  phone: z.array(z.string()).nullish(),
  role: z.enum(['owner', 'admin', 'parent']),
  tenant_id: z.string(),
});
