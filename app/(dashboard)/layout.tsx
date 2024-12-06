import AppBar from '@/components/dashboard/app-bar';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await getServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    notFound();
  }

  const { data: user } = await supabase
    .from('users')
    .select('avatar_url, email, initials, name')
    .eq('auth_id', session.user.id)
    .single();
  if (!user) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-base'>
      <AppBar user={user} />
      <main className='pt-28 pb-10'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
}
