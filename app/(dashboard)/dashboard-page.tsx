import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';

export default function DashboardPage({
  children,
  heading,
}: {
  children: ReactNode;
  heading: ReactNode;
}) {
  return (
    <SidebarInset>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky w-full top-0 z-40 backdrop-blur-md bg-white/30'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        {heading}
      </header>
      <div className='conatiner mx-auto w-full max-w-screen-xl px-4 py-8'>
        {children}
      </div>
    </SidebarInset>
  );
}
