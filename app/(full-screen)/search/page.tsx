import SearchInput from '@/components/search-input';
import PetsAndOwnersResults from '@/components/search/pets-and-owners-results';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default async function SearchPage() {
  return (
    <>
      <div className='relative'>
        <div className='flex items-center justify-between border-b border-divider pb-6'>
          <SearchInput placeholder='Search pets or parents…' />
          <div className='ml-4'>
            <Link
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors'
              href='/parents/new'
            >
              <UserPlus className='h-5 w-5' />
              Add Parent
            </Link>
          </div>
        </div>
      </div>

      <PetsAndOwnersResults />
    </>
  );
}
