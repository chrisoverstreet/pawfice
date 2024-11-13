'use server';

import { getServerClient } from '@/lib/supabase/get-server-client';
import type { QueryData } from '@supabase/supabase-js';

export default async function getPageData(userId: string) {
  const supabase = await getServerClient();
  return supabase
    .from('tenant_user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
}

export type PageData = QueryData<ReturnType<typeof getPageData>>;
