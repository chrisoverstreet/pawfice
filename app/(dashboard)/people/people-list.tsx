'use client';

import useQ from '@/app/(dashboard)/use-q';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useTransformedImage from '@/hooks/use-transformed-image';
import { userDocumentSchema } from '@/lib/typesense/document-schemas';
import useScopedSearchKey from '@/utils/typesense/use-scoped-search-key';
import { useInfiniteQuery } from '@tanstack/react-query';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { ChevronDown, PawPrint, User } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchClient } from 'typesense';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

export default function PeopleList() {
  // TODO hard-coded
  const searchKey = useScopedSearchKey('7M6FIuvOOigAGbmebpO9M5DG5Tm93jbo');

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
              query_by: ['name', 'email', 'phone', 'pets.name'],
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
        <div className='overflow-x-auto'>
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-1/2 md:w-1/4'>Owner</TableHead>
                <TableHead className='hidden md:table-cell w-1/4'>
                  Email
                </TableHead>
                <TableHead className='hidden md:table-cell w-1/4'>
                  Phone
                </TableHead>
                <TableHead className='w-1/2 md:w-1/4'>Pets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hits.map((hit) => (
                <Hit hit={hit} key={hit.document.id} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function Hit({
  hit,
}: {
  hit: {
    document: Omit<z.infer<typeof userDocumentSchema>, 'tenant_id'>;
  };
}) {
  const [expanded, setExpanded] = useState(false);

  const src = useTransformedImage({
    originalUrl: hit.document.avatar_url,
    transformOptions: {
      height: 96,
      width: 96,
      resize: 'cover',
    },
  });

  return (
    <>
      <TableRow
        key={hit.document.id}
        className='cursor-pointer md:cursor-auto'
        onClick={() => setExpanded((prev) => !prev)}
      >
        <TableCell className='font-medium flex gap-2 items-center'>
          <Link href={`/people/${hit.document.id}`}>
            <Avatar className='w-8 h-8 flex-shrink-0'>
              <AvatarImage src={src} alt={hit.document.name ?? 'Unknown'} />
              <AvatarFallback>{hit.document.initials}</AvatarFallback>
            </Avatar>
          </Link>
          <div className='flex flex-col min-w-0'>
            <Link
              href={`/people/${hit.document.id}`}
              className='hover:underline'
            >
              <span className='truncate'>{hit.document.name ?? 'Unknown'}</span>
            </Link>
            {(hit.document.role === 'admin' ||
              hit.document.role === 'owner') && (
              <Badge variant='secondary' className='w-fit text-xs'>
                {hit.document.role}
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          <span className='truncate block'>{hit.document.email}</span>
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          <span className='flex items-center'>
            <User className='h-3 w-3 mr-1 flex-shrink-0' />
            <span className='truncate'>
              {hit.document.phone?.[0]
                ? parsePhoneNumberWithError(hit.document.phone[0], 'US').format(
                    'NATIONAL',
                  )
                : ''}
            </span>
          </span>
        </TableCell>
        <TableCell>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 max-w-full'>
              {!!hit.document.pets?.length && (
                <PawPrint className='h-3 w-3 flex-shrink-0' />
              )}
              <div className='flex -space-x-2 overflow-hidden flex-shrink-0'>
                {hit.document.pets?.map((pet) => (
                  <Avatar
                    key={pet.id}
                    className='w-6 h-6 border-2 border-background'
                  >
                    <AvatarImage
                      src={pet.avatar_url ?? undefined}
                      alt={pet.name}
                    />
                    <AvatarFallback>{pet.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className='truncate hidden sm:inline-block max-w-[150px]'>
                {hit.document.pets?.map((pet, i) => (
                  <span key={pet.id}>
                    <Link
                      className='inline hover:underline'
                      href={`/pets/${pet.id}`}
                    >
                      {pet.name}
                    </Link>
                    {i !== (hit.document.pets?.length ?? 0) - 1 ? ', ' : null}
                  </span>
                ))}
              </div>
            </div>
            <ChevronDown className='h-4 w-4 flex-shrink-0 md:hidden' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow className='md:hidden'>
        <TableCell colSpan={4} className='p-0'>
          <div
            className={`overflow-hidden transition-all ${expanded ? 'max-h-48' : 'max-h-0'}`}
          >
            <div className='p-4 bg-muted/50'>
              <p>
                <strong>Email:</strong> {hit.document.email}
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <span className='whitespace-nowrap'>
                  {hit.document.phone?.length ? hit.document.phone[0] : 'N/A'}
                </span>
              </p>
              <p>
                <strong>Role:</strong> {hit.document.role}
              </p>
              <p>
                <strong>Pets:</strong>{' '}
                {hit.document.pets?.map((pet) => pet.name).join(', ')}
              </p>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
