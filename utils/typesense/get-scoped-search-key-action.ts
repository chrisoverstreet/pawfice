'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';
import decodeAccessToken from '@/utils/supabase/decode-access-token';
import invariant from 'invariant';
import { z } from 'zod';

const getScopedSearchKeyAction = actionClient
  .bindArgsSchemas<[unscopedKey: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs: [unscopedKey] }) => {
    const supabase = await getServerClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    const tenantId = (await decodeAccessToken(session?.access_token))
      ?.tenant_short_id;
    invariant(tenantId, 'Missing tenant id');

    const typesenseClient = getTypesenseAdminClient();

    return typesenseClient.keys().generateScopedSearchKey(unscopedKey, {
      expires_at:
        parseInt((new Date().getTime() / 1000).toFixed(0), 10) + 60 * 60,
      filter_by: `tenant_id:=${tenantId}`,
      exclude_fields: 'tenant_id',
    });
  });

export default getScopedSearchKeyAction;
