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
      <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        {heading}
      </header>
      <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
    </SidebarInset>
  );
}