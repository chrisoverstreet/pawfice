'use server';

import { getServerClient } from '@/lib/supabase/get-server-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function signOutAction() {
  const supabase = await getServerClient();
  await supabase.auth.signOut();

  revalidatePath('/');
  redirect('/');
}
