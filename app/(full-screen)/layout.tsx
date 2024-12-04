import BackButton from '@/components/back-button';
import type { ReactNode } from 'react';

export default function FullScreenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen bg-base'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <BackButton />
        </div>
        {children}
      </div>
    </div>
  );
}
