'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function SizeCategoryCard({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<FormValues>();

  const [sizeCategory, sizeCategories, sizeCategoryIndexEditing] = watch([
    `sizeCategories.${index}`,
    'sizeCategories',
    'sizeCategoryIndexEditing',
  ]);

  return (
    <Card className='flex items-center justify-between p-3'>
      <div>
        <div>
          <span className='font-medium text-gray-900'>{sizeCategory.name}</span>
          <span className='text-sm text-gray-600 ml-2'>
            {sizeCategory.minWeight}-${sizeCategory.maxWeight}lbs (+
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(+sizeCategory.priceAdjustmentDollars)}
            )
          </span>
        </div>

        <p className='text-sm text-gray-500 mt-1'>{sizeCategory.description}</p>
      </div>
      <div className='flex gap-2'>
        <Button
          disabled={!!sizeCategoryIndexEditing}
          variant='ghost'
          size='sm'
          onClick={() => setValue('sizeCategoryIndexEditing', index)}
        >
          <Edit2 className='h-4 w-4' />
        </Button>
        <Button
          disabled={!!sizeCategoryIndexEditing}
          type='button'
          variant='ghost'
          size='sm'
          onClick={() =>
            setValue('sizeCategories', [
              ...sizeCategories.slice(0, index),
              ...sizeCategories.slice(index + 1),
            ])
          }
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
