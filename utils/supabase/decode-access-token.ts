import type { Enums } from '@/utils/supabase/types';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';

const tenantRoleEnumSchema = z.enum([
  'owner',
  'admin',
  'parent',
]) satisfies z.ZodType<Enums<'tenant_role'>>;

export default async function decodeAccessToken(accessToken?: string | null) {
  if (!accessToken) {
    return null;
  }

  const payload = jwt.verify(
    accessToken,
    process.env.SUPABASE_JWT_SECRET!,
  ) as JwtPayload;

  return z
    .object({
      tenant_id: z.number().int().nullable().catch(null),
      tenant_short_id: z.string().nullable().catch(null),
      tenant_role: tenantRoleEnumSchema.nullable().catch(null),
    })
    .parse(payload);
}
