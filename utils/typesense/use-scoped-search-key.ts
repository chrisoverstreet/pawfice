'use client';

import getScopedSearchKeyAction from '@/utils/typesense/get-scoped-search-key-action';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useMemo } from 'react';

export default function useScopedSearchKey(unscopedKey: string) {
  const boundedGetScopedSearchKeyAction = useMemo(
    () => getScopedSearchKeyAction.bind(null, unscopedKey),
    [unscopedKey],
  );

  const { reset, execute, result } = useAction(boundedGetScopedSearchKeyAction);

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
