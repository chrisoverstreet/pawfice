import type { Database } from '@/utils/supabase/types';
import { createBrowserClient } from '@supabase/ssr';

export function getBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (input, init) => {
          const headers = new Headers(init?.headers);

          const tenant = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`tenant=`))
            ?.split('=')[1];

          if (tenant) {
            headers.set('x-tenant', tenant);
          }

          return fetch(input, {
            ...init,
            headers,
          });
        },
      },
    },
  );
}