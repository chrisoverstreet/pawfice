'use client';

import useQ from '@/app/(dashboard)/people/use-q';
import useScopedSearchKey from '@/app/(dashboard)/people/use-scoped-search-key';
import { Skeleton } from '@/components/ui/skeleton';
import { userDocumentSchema } from '@/lib/typesense/document-schemas';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo } from 'react';
import { SearchClient } from 'typesense';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

export default function List() {
  const searchKey = useScopedSearchKey();

  const [q] = useQ();
  const [debouncedQ] = useDebounce(q, 240);

  const { data, error, isFetched, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        if (!searchKey) {
          return;
        }

        const searchClient = new SearchClient({
          apiKey: searchKey,
          nodes: [{ url: process.env.NEXT_PUBLIC_TYPESENSE_URL! }],
        });

        return searchClient
          .collections('users')
          .documents()
          .search(
            {
              q: debouncedQ,
              query_by: ['name', 'email', 'phone'],
              facet_by: ['role'],
              page: pageParam,
            },
            {},
          );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        return !!lastPage?.found &&
          lastPage.found >
            +lastPageParam * (lastPage?.request_params.per_page ?? 10)
          ? +lastPageParam + 1
          : null;
      },
      enabled: !!searchKey,
      queryKey: ['people', debouncedQ, searchKey],
    });

  const fetchMoreOnBottomReached = useCallback(() => {
    const { clientHeight } = document.body;

    if (
      clientHeight - window.innerHeight - window.scrollY < 500 &&
      !isFetching &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  useEffect(() => {
    fetchMoreOnBottomReached();
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    document.addEventListener('scroll', fetchMoreOnBottomReached);

    return () => {
      document.removeEventListener('scroll', fetchMoreOnBottomReached);
    };
  }, [fetchMoreOnBottomReached]);

  const hits = useMemo(
    () =>
      z
        .array(
          z.object({
            document: userDocumentSchema.omit({
              tenant_id: true,
            }),
          }),
        )
        .catch([])
        .parse(data?.pages.flatMap((page) => page?.hits ?? [])),
    [data?.pages],
  );

  return (
    <div className='flex flex-col gap-4'>
      <div>
        {!isFetched || isFetching ? (
          <Skeleton className='w-40 h-4' />
        ) : (
          <p className='text-sm'>{data?.pages.at(-1)?.found ?? 0} matches</p>
        )}
      </div>
      {!!error && <div>Error: {error.message}</div>}
      {!!data && (
        <ol className='flex flex-col gap-4'>
          {hits.map((hit) => (
            <Link key={hit.document.id} href={`/people/${hit.document.id}`}>
              <li className='flex gap-4'>
                <div className='h-12 w-12'>
                  {!!hit.document.avatar_url && (
                    <Image
                      alt=''
                      className='h-12 w-12 object-cover rounded-full'
                      height={24}
                      width={24}
                      src={hit.document.avatar_url}
                    />
                  )}
                </div>
                <div className='overflow-hidden'>
                  <pre>{JSON.stringify(hit.document, null, `\t`)}</pre>
                </div>
              </li>
            </Link>
          ))}
        </ol>
      )}
    </div>
  );
}
