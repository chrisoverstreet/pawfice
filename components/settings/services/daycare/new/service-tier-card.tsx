'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function ServiceTierCard({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<FormValues>();

  const [tier, tiers, tierIndexEditing] = watch([
    `tiers.${index}`,
    'tiers',
    'tierIndexEditing',
  ]);

  return (
    <Card className='flex items-center justify-between p-3'>
      <div>
        <span className='font-medium text-gray-900'>{tier.name}</span>
        <span className='text-sm text-gray-600 ml-2'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(+tier.basePrice)}
          /day
        </span>
        <p className='text-sm text-gray-500 mt-1'>{tier.description}</p>
      </div>
      <div className='flex gap-2'>
        <Button
          disabled={!!tierIndexEditing}
          variant='ghost'
          size='sm'
          onClick={() => setValue('tierIndexEditing', index)}
        >
          <Edit2 className='h-4 w-4' />
        </Button>
        <Button
          disabled={!!tierIndexEditing}
          type='button'
          variant='ghost'
          size='sm'
          onClick={() =>
            setValue('tiers', [
              ...tiers.slice(0, index),
              ...tiers.slice(index + 1),
            ])
          }
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
