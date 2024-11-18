import SignOutButton from '@/components/sign-out-button';
import { getServerClient } from '@/lib/supabase/get-server-client';
import decodeAccessToken from '@/utils/supabase/decode-access-token';
import Link from 'next/link';

export default async function Home() {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = await decodeAccessToken(session?.access_token);

  return (
    <div className='flex flex-col gap-8'>
      <h1>Home page</h1>
      <p>Tenant id: {accessToken?.tenant_id}</p>
      <p>Tenant role: {accessToken?.tenant_role}</p>
      {session?.user ? (
        <>
          {session.user.email}
          <SignOutButton />
          {!!accessToken?.tenant_role &&
          ['owner', 'admin'].includes(accessToken.tenant_role) ? (
            <Link href='/dashboard'>Dashboard</Link>
          ) : (
            <Link href='/get-started'>Get started</Link>
          )}
          <pre>{JSON.stringify(accessToken, null, `\t`)}</pre>
          <pre>{JSON.stringify(session, null, `\t`)}</pre>
        </>
      ) : (
        <Link href='/login'>Sign in</Link>
      )}
    </div>
  );
}
