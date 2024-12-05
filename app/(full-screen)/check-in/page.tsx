import SearchInput from '@/components/search-input';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Check In',
};

export default async function CheckInPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-content mb-2'>Check In</h1>
        <p className='text-muted'>Process arrivals for upcoming bookings</p>
      </div>

      <div className='mb-6'>
        <Suspense fallback={<>Loading…</>}>
          <SearchInput />
        </Suspense>
      </div>

      <div>TODO List</div>
    </div>
  );
}
