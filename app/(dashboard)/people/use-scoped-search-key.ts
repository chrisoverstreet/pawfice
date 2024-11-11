'use client';

import getScopedSearchKeyAction from '@/app/(dashboard)/people/get-scoped-search-key-action';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';

export default function useScopedSearchKey() {
  const { reset, execute, result } = useAction(getScopedSearchKeyAction);

  useEffect(() => {
    execute();

    const timeoutId = setTimeout(() => execute(), 60 * 60 * 1000);

    return () => {
      reset();
      clearTimeout(timeoutId);
    };
  }, [execute, reset]);

  return result.data;
}
