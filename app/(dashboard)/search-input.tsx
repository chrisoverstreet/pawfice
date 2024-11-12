'use client';

import useQ from '@/app/(dashboard)/use-q';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const [q, setQ] = useQ();

  return (
    <Input
      autoFocus
      className='w-full max-w-lg'
      onChange={(e) => setQ(e.currentTarget.value)}
      placeholder='Search…'
      value={q}
    />
  );
}
