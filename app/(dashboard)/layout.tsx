import AppBar from '@/components/dashboard/app-bar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-base'>
      <AppBar />
      <main className='pt-28 pb-10'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
}
