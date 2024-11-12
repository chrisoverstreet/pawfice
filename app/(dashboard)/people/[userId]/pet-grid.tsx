import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import { Card, CardContent } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import Link from 'next/link';

function getGradient(id: string): string {
  const hue1 = parseInt(id.substring(0, 3), 36) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
}

export default function PetGrid(props: { pets: PageData['pets'] }) {
  const pets = props.pets.reduce<NonNullable<PageData['pets'][0]['pet']>[]>(
    (acc, p) => {
      if (p.pet) {
        acc.push(p.pet);
      }
      return acc;
    },
    [],
  );

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {pets.map((pet) => (
          <Link href={`/pets/${pet.id}`} key={pet.id} className='group'>
            <Card className='overflow-hidden'>
              <CardContent className='p-0'>
                <div className='aspect-video relative overflow-hidden'>
                  {pet.avatar_url ? (
                    <img
                      src={pet.avatar_url}
                      alt={`${pet.name}'s portrait`}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                  ) : (
                    <div
                      className='w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110'
                      style={{ background: getGradient(pet.id) }}
                    >
                      <PawPrint className='w-1/4 h-1/4 text-white' />
                    </div>
                  )}
                </div>
                <div className='p-4'>
                  <h2
                    className='text-xl font-semibold mb-2 truncate'
                    title={pet.name}
                  >
                    {pet.name}
                  </h2>
                  <p className='text-sm text-gray-500'>
                    Added on {new Date(pet.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
