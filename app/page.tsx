import SignOutButton from '@/components/sign-out-button';
import { getServerClient } from '@/lib/supabase/get-server-client';
import Link from 'next/link';

export default async function Home() {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <h1>Home page</h1>
      {session?.user ? (
        <div>
          {session.user.email}
          <SignOutButton />
        </div>
      ) : (
        <Link href='/login'>Sign in</Link>
      )}
    </div>
  );
}
