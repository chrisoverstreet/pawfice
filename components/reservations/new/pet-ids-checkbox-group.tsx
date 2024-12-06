'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import OtherPetsSelection from '@/components/reservations/new/other-pets-selection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import useQ from '@/hooks/use-q';
import {
  type PetDocument,
  petDocumentSchema,
} from '@/lib/typesense/document-schemas';
import { useInfiniteQuery } from '@tanstack/react-query';
import pluralize from 'pluralize';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { SearchClient } from 'typesense';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

export default function PetIdsCheckboxGroup() {
  const [q] = useQ();
  const [debouncedQ] = useDebounce(q, 240);

  const [parents, setParents] = useState<PetDocument['parents'] | null>(null);

  const parentIds = useMemo(() => parents?.flatMap((p) => p.id), [parents]);

  // TODO use scoped key
  const searchKey = 'ABC123';

  const { control, watch } = useFormContext<FormValues>();

  const selectedPetId = watch('petIds.0');

  const {
    data: searchData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      if (!searchKey) {
        return;
      }

      const searchClient = new SearchClient({
        apiKey: searchKey,
        nodes: [{ url: process.env.NEXT_PUBLIC_TYPESENSE_URL! }],
      });

      return searchClient
        .collections<PetDocument>('pets')
        .documents()
        .search(
          {
            q: selectedPetId ? '' : debouncedQ,
            query_by: ['name', 'parents.name'],
            page: pageParam,
            filter_by: selectedPetId ? `id:=${selectedPetId}` : undefined,
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
    queryKey: ['new-reservation-search', debouncedQ, searchKey, selectedPetId],
  });

  const fetchMoreOnBottomReached = useCallback(async () => {
    const { clientHeight } = document.body;

    if (
      clientHeight - window.innerHeight - window.scrollY < 500 &&
      !isFetching &&
      hasNextPage
    ) {
      await fetchNextPage();
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

  const pets = z
    .array(petDocumentSchema)
    .catch([])
    .parse(
      searchData?.pages.flatMap(
        (page) => page?.hits?.flatMap((hit) => hit.document) ?? [],
      ) ?? [],
    );

  return (
    <FormField
      control={control}
      name='petIds'
      render={() => (
        <FormItem>
          <div>
            <FormLabel>Test</FormLabel>
            <FormDescription>Description</FormDescription>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {pets.map((pet) => (
              <FormField
                key={pet.id}
                control={control}
                name='petIds'
                render={({ field }) => (
                  <FormItem key={pet.id}>
                    <FormControl>
                      <input
                        className='hidden peer'
                        type='checkbox'
                        checked={field.value?.includes(pet.id)}
                        onChange={(e) => {
                          if (e.currentTarget.checked) {
                            field.onChange([...field.value, pet.id]);
                            setParents(pet.parents);
                          } else {
                            const newValue = field.value?.filter(
                              (value) => value !== pet.id,
                            );
                            field.onChange(newValue);
                            if (!newValue.length) {
                              setParents(null);
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className='cursor-pointer flex gap-4 items-center rounded-lg p-4 peer-checked:bg-primary/10 border-2 peer-checked:border-primary border-gray-200 hover:border-primary transition-colors'>
                      <Avatar>
                        <AvatarFallback>{pet.name}</AvatarFallback>
                        <AvatarImage src={pet.avatar_url ?? undefined} />
                      </Avatar>
                      <div className='space-y-2'>
                        <p className='font-semibold'>{pet.name}</p>
                        <p className='text-muted'>TODO Breed</p>
                        <p className='text-muted'>
                          {pluralize('Parent', pet.parents.length)}:{' '}
                          {pet.parents.flatMap((p) => p.name).join(', ')}
                        </p>
                      </div>
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {!!selectedPetId && !!parentIds?.length && (
            <div>
              <OtherPetsSelection
                key={selectedPetId}
                control={control}
                parentIds={parentIds}
                selectedPetId={selectedPetId}
              />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
