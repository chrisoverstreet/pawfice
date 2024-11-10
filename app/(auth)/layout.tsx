import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Pawfice</h1>
      {children}
    </div>
  );
}
