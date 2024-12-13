'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function SeasonalPricingCard({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<FormValues>();

  const [sp, seasonalPricing, seasonalPriceCategoryIndexEditing] = watch([
    `seasonalPricing.${index}`,
    'seasonalPricing',
    'seasonalPricingIndexEditing',
  ]);

  return (
    <Card className='flex items-center justify-between p-3'>
      <div>
        <div>
          <span className='font-medium text-gray-900'>{sp.name}</span>
          <span className='text-sm text-gray-600 ml-2'>
            {sp.startDate?.toLocaleDateString()}-$
            {sp.endDate?.toLocaleDateString()} (+{sp.priceAdjustmentPercent}% )
          </span>
        </div>

        <p className='text-sm text-gray-500 mt-1'>{sp.description}</p>
      </div>
      <div className='flex gap-2'>
        <Button
          disabled={!!seasonalPriceCategoryIndexEditing}
          variant='ghost'
          size='sm'
          onClick={() => setValue('seasonalPricingIndexEditing', index)}
        >
          <Edit2 className='h-4 w-4' />
        </Button>
        <Button
          disabled={!!seasonalPriceCategoryIndexEditing}
          type='button'
          variant='ghost'
          size='sm'
          onClick={() =>
            setValue('seasonalPricing', [
              ...seasonalPricing.slice(0, index),
              ...seasonalPricing.slice(index + 1),
            ])
          }
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
