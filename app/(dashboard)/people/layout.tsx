import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
