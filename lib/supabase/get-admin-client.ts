import type { Database } from '@/utils/supabase/types';
import { createClient } from '@supabase/supabase-js';

export function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}