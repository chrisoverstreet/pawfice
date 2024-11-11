'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';

const signOutAction = actionClient.action(async () => {
  const supabase = await getServerClient();

  await supabase.auth.signOut();
});

export default signOutAction;
