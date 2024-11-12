'use server';

import { getServerClient } from '@/lib/supabase/get-server-client';
import { QueryData } from '@supabase/supabase-js';

export default async function getPageData(userId: string) {
  const supabase = await getServerClient();
  return supabase
    .from('tenant_profiles')
    .select('*, auth:users(*), pets:pet_parents(pet:pets(*))')
    .eq('id', userId)
    .single();
}

export type PageData = QueryData<ReturnType<typeof getPageData>>;
