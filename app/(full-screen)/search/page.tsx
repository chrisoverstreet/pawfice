import SearchInput from '@/components/search-input';
import PetsAndOwnersResults from '@/components/search/pets-and-owners-results';
import { Suspense } from 'react';

export default async function SearchPage() {
  return (
    <>
      <div className='relative'>
        <div className='border-b border-divider pb-6'>
          <Suspense fallback={<>Loading…</>}>
            <SearchInput
              className='w-full'
              placeholder='Search pets or parents…'
            />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<>Loading…</>}>
        <PetsAndOwnersResults />
      </Suspense>
    </>
  );
}
