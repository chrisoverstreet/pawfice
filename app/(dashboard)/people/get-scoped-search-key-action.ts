'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { getTypesenseAdminClient } from '@/lib/typesense/get-typesense-admin-client';

// TODO - remove hardcoded value and rotate
const TENANT_PROFILES_SEARCH_KEY = 'INpUpyzd99B55Je50taOcPVlFsjVQqxC';

const getScopedSearchKeyAction = actionClient.action(async () => {
  const supabase = await getServerClient();

  const { data: tenantId, error } = await supabase.rpc('tenant_id').single();

  if (error) {
    throw error;
  }

  const typesenseClient = getTypesenseAdminClient();

  return typesenseClient
    .keys()
    .generateScopedSearchKey(TENANT_PROFILES_SEARCH_KEY, {
      expires_at:
        parseInt((new Date().getTime() / 1000).toFixed(0), 10) + 60 * 60,
      filter_by: `tenant_id:=${tenantId}`,
    });
});

export default getScopedSearchKeyAction;
