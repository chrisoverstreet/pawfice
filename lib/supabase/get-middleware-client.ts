import type { Database } from '@/utils/supabase/types';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function getMiddlewareClient({
  request,
}: {
  request: NextRequest;
}) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            response.cookies.set(name, value),
          );
          // @ts-expect-error TODO
          response.value = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            // @ts-expect-error TODO
            response.value.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return { supabase, response };
}
