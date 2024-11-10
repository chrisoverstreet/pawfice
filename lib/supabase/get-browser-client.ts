import type { Database } from '@/utils/supabase/types';
import { createBrowserClient } from '@supabase/ssr';

export function getBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
