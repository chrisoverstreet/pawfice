import SignOutButton from '@/components/sign-out-button';
import { getServerClient } from '@/lib/supabase/get-server-client';
import Link from 'next/link';

export default async function Home() {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='flex flex-col gap-8'>
      <h1>Home page</h1>
      {session?.user ? (
        <>
          {session.user.email}
          <SignOutButton />
          {session.user.app_metadata.tenant_id ? (
            <Link href='/dashboard'>Dashboard</Link>
          ) : (
            <Link href='/get-started'>Get started</Link>
          )}
          <pre>{JSON.stringify(session, null, `\t`)}</pre>
        </>
      ) : (
        <Link href='/login'>Sign in</Link>
      )}
    </div>
  );
}
