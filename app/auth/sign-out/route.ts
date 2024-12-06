import { getServerClient } from '@/lib/supabase/get-server-client';
import { redirect } from 'next/navigation';

export async function GET() {
  const supabase = await getServerClient();

  await supabase.auth.signOut();

  redirect('/');
}
