'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';

// TODO
const USERS_SEARCH_KEY = 'g3v0eG9ReevwbWboRq9Fplxu9w72kAoZ';

const getScopedSearchKeyAction = actionClient.action(async () => {
  const supabase = await getServerClient();

  const { data: tenantId, error } = await supabase.rpc('tenant_id').single();

  console.log({ tenantId, error });

  if (error) {
    throw error;
  }

  const typesenseClient = getTypesenseAdminClient();

  return typesenseClient.keys().generateScopedSearchKey(USERS_SEARCH_KEY, {
    expires_at:
      parseInt((new Date().getTime() / 1000).toFixed(0), 10) + 60 * 60,
    filter_by: `tenant_id:=${tenantId}`,
  });
});

export default getScopedSearchKeyAction;
