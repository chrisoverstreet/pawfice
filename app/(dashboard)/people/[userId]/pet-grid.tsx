import { Card, CardContent } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import Link from 'next/link';

type Pet = {
  id: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
};

type PetOwnerProps = {
  pets: { pet: Pet }[];
};

function getGradient(id: string): string {
  const hue1 = parseInt(id.substring(0, 3), 36) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
}

export default function PetGrid({ pets = [] }: PetOwnerProps) {
  const samplePets: { pet: Pet }[] = [
    {
      pet: {
        id: 'RXRWJD',
        name: 'Mr. Bagel',
        avatar_url: null,
        created_at: '2024-11-11T22:29:10.52168+00:00',
      },
    },
    {
      pet: {
        id: 'ABCDEF',
        name: 'Luna with a Very Long Name That Needs Truncating',
        avatar_url: 'https://example.com/luna.jpg',
        created_at: '2024-11-12T10:15:30.00000+00:00',
      },
    },
    {
      pet: {
        id: 'GHIJKL',
        name: 'Max',
        avatar_url: null,
        created_at: '2024-11-13T14:20:45.00000+00:00',
      },
    },
    {
      pet: {
        id: 'MNOPQR',
        name: 'Bella',
        avatar_url: 'https://example.com/bella.jpg',
        created_at: '2024-11-14T09:30:15.00000+00:00',
      },
    },
    {
      pet: {
        id: 'STUVWX',
        name: 'Charlie',
        avatar_url: null,
        created_at: '2024-11-15T16:45:00.00000+00:00',
      },
    },
  ];

  const allPets = pets.length > 0 ? pets : samplePets;

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {allPets.map(({ pet }) => (
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
