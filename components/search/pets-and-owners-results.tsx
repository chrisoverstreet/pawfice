'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useQ from '@/hooks/use-q';
import type {
  PetDocument,
  UserDocument,
} from '@/lib/typesense/document-schemas';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ChevronRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SearchClient } from 'typesense';
import { useDebounce } from 'use-debounce';

const MAX_RESULTS = 6;

export default function PetsAndOwnersResults() {
  const [q] = useQ();
  const [debouncedQ] = useDebounce(q, 240);

  // TODO use scoped key
  const searchKey = 'ABC123';

  const { data } = useQuery({
    queryFn: async () => {
      if (!searchKey) {
        return;
      }

      const searchClient = new SearchClient({
        apiKey: searchKey,
        nodes: [{ url: process.env.NEXT_PUBLIC_TYPESENSE_URL! }],
      });

      const {
        results: [petResults, userResults],
      } = await searchClient.multiSearch.perform<[PetDocument, UserDocument]>({
        searches: [
          {
            collection: 'pets',
            q: debouncedQ,
            query_by: 'name, parents.name',
            limit: MAX_RESULTS,
          },
          {
            collection: 'users',
            q: debouncedQ,
            query_by: 'name, email, phone, pets.name',
            limit: MAX_RESULTS,
          },
        ],
      });

      return {
        pets: petResults,
        parents: userResults,
      };
    },
    queryKey: ['pets-and-owners-search', debouncedQ, searchKey],
  });

  return (
    <div className='mt-8 space-y-8'>
      {!!data?.pets.hits && (
        <section>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-secondary'>
              Pets ({data.pets.found})
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data?.pets.hits.slice(0, MAX_RESULTS).map(({ document: pet }) => (
              <div
                key={pet.id}
                className='card p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-center gap-4'>
                  <PetLink petId={pet.id}>
                    <Avatar className='h-16 w-16'>
                      {/* TODO initials */}
                      <AvatarFallback>{pet.name}</AvatarFallback>
                      <AvatarImage
                        alt={pet.name}
                        src={pet.avatar_url ?? undefined}
                      />
                    </Avatar>
                  </PetLink>
                  <div className='flex-1'>
                    <PetLink petId={pet.id}>
                      <h3 className='font-medium text-secondary'>{pet.name}</h3>
                    </PetLink>
                    {/* TODO */}
                    {/*<p className='text-sm text-gray-airbnb'>{pet.breed}</p>*/}
                    {pet.parents.map((parent) => (
                      <ParentLink key={parent.id} parentId={parent.id}>
                        {parent.name}
                      </ParentLink>
                    ))}
                  </div>
                  <ChevronRight className='h-5 w-5 text-gray-300' />
                </div>
              </div>
            ))}
          </div>
          {data?.pets.found > MAX_RESULTS && (
            <div className='mt-4 mx-auto text-center'>
              <Link
                className='font-medium text-sm hover:underline'
                href={`/pets/search?q=${encodeURIComponent(q)}`}
              >
                View all pets
              </Link>
            </div>
          )}
        </section>
      )}

      {!!data?.parents.hits?.length && (
        <section>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-secondary'>
              Parents ({data.parents.found})
            </h2>
            {data.parents.found > MAX_RESULTS && (
              <Button asChild>
                <Link href='/parents/new'>Add parent</Link>
              </Button>
            )}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.parents.hits
              .slice(0, MAX_RESULTS)
              .map(({ document: parent }) => (
                <div
                  key={parent.id}
                  className='card p-4 hover:shadow-md transition-shadow'
                >
                  <ParentLink parentId={parent.id}>
                    <div className='flex items-center gap-4'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-secondary'>
                          {parent.name}
                        </h3>
                        <div className='space-y-2 mt-2'>
                          <div className='flex items-center text-sm text-gray-airbnb'>
                            <Mail className='h-4 w-4 mr-2' />
                            {parent.email}
                          </div>
                          <div className='flex items-center text-sm text-gray-airbnb'>
                            <Phone className='h-4 w-4 mr-2' />
                            {parent.phone}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className='h-5 w-5 text-gray-300' />
                    </div>
                  </ParentLink>
                </div>
              ))}
          </div>
          {data?.pets.found > MAX_RESULTS && (
            <div className='mt-4 mx-auto text-center'>
              <Link
                className='font-medium text-sm hover:underline'
                href={`/parents/search?q=${encodeURIComponent(q)}`}
              >
                View all parents
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function PetLink({
  petId,
  children,
  className,
}: {
  petId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={clsx('hover:text-primary transition-colors', className)}
      href={`/pets/${petId}`}
    >
      {children}
    </Link>
  );
}

function ParentLink({
  parentId,
  children,
  className,
}: {
  parentId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={clsx('hover:text-primary transition-colors', className)}
      href={`/parents/${parentId}`}
    >
      {children}
    </Link>
  );
}
