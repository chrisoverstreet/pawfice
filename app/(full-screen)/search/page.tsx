import SearchInput from '@/components/search-input';
import PetsAndOwnersResults from '@/components/search/pets-and-owners-results';

export default async function SearchPage() {
  return (
    <>
      <div className='relative'>
        <div className='border-b border-divider pb-6'>
          <SearchInput
            className='w-full'
            placeholder='Search pets or parents…'
          />
        </div>
      </div>

      <PetsAndOwnersResults />
    </>
  );
}
