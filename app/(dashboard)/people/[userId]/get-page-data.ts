'use server';

import { getServerClient } from '@/lib/supabase/get-server-client';
import type { QueryData } from '@supabase/supabase-js';

export default async function getPageData(userShortId: string) {
  const supabase = await getServerClient();
  return supabase
    .from('users')
    .select('*, pets:pet_parents(profile:pets(*))')
    .eq('short_id', userShortId)
    .single();
}

export type PageData = QueryData<ReturnType<typeof getPageData>>;
