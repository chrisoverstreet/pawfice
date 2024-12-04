import BackButton from '@/components/back-button';
import PetsAndOwnersResults from '@/components/search/pets-and-owners-results';
import SearchInput from '@/components/search/search-input';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default async function SearchPage() {
  return (
    <div className='min-h-screen bg-base'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <BackButton />
        </div>

        <div className='relative'>
          <div className='flex items-center justify-between border-b border-divider pb-6'>
            <SearchInput />
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
      </div>
    </div>
  );
}
