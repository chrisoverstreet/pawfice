import SignOutButton from '@/components/sign-out-button';
import { getServerClient } from '@/lib/supabase/get-server-client';
import Link from 'next/link';

export default async function Home() {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: tenantRole, error: tenantError } =
    await supabase.rpc('tenant_role');

  return (
    <div className='flex flex-col gap-8'>
      <h1>Home page</h1>
      {session?.user ? (
        <>
          {session.user.email}
          <SignOutButton />
          <Link href='/get-started'>Get started</Link>
          <pre>{JSON.stringify(session, null, `\t`)}</pre>
        </>
      ) : (
        <Link href='/login'>Sign in</Link>
      )}
      <pre>{JSON.stringify(tenantRole, null, `\t`)}</pre>
      <pre>{JSON.stringify(tenantError, null, `\t`)}</pre>
    </div>
  );
}
