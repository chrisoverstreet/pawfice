'use client';

import useQ from '@/hooks/use-q';
import { Search, X } from 'lucide-react';

export default function SearchInput() {
  const [q, setQ] = useQ();

  return (
    <div className='relative flex-1'>
      <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
      <input
        autoFocus
        className='w-full pl-12 pr-4 py-3 text-lg bg-transparent placeholder:text-gray-400 focus:outline-none text-content'
        type='text'
        onChange={(e) => setQ(e.currentTarget.value)}
        placeholder='Search pets or parents…'
        value={q}
      />
      {!!q && (
        <button
          className='absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover-bg'
          onClick={() => setQ(null)}
        >
          <X className='h5 w-5 text-gray-400' />
        </button>
      )}
    </div>
  );
}
