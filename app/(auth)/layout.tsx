import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className='pb-32'>
      <div className='container'>{children}</div>
    </section>
  );
}
