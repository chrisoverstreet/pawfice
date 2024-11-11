'use client';

import useQ from '@/app/(dashboard)/people/use-q';

export default function List() {
  const [q] = useQ();

  return (
    <div>
      <p>TODO</p>
      <p>{q}</p>
    </div>
  );
}
