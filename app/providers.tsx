'use client';

import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        <ReactQueryDevtools />
        <Toaster />
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
