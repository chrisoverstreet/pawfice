'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, X } from 'lucide-react';
import pluralize from 'pluralize';
import { useFormContext } from 'react-hook-form';

export default function DurationDiscountCard({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<FormValues>();

  const [durationDiscount, durationDiscounts, durationDiscountIndexEditing] =
    watch([
      `durationDiscounts.${index}`,
      'durationDiscounts',
      'durationDiscountIndexEditing',
    ]);

  return (
    <Card className='flex items-center justify-between p-3'>
      <div>
        <div>
          <span className='font-medium text-gray-900'>
            {pluralize('day', +durationDiscount.minDays, true)}
          </span>
          <span className='text-sm text-gray-600 ml-2'>
            {durationDiscount.discountPercent} off
          </span>
        </div>
        <p className='text-sm text-gray-500 mt-1'>
          {durationDiscount.description}
        </p>
      </div>
      <div className='flex gap-2'>
        <Button
          disabled={!!durationDiscountIndexEditing}
          variant='ghost'
          size='sm'
          onClick={() => setValue('durationDiscountIndexEditing', index)}
        >
          <Edit2 className='h-4 w-4' />
        </Button>
        <Button
          disabled={!!durationDiscountIndexEditing}
          type='button'
          variant='ghost'
          size='sm'
          onClick={() =>
            setValue('durationDiscounts', [
              ...durationDiscounts.slice(0, index),
              ...durationDiscounts.slice(index + 1),
            ])
          }
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
