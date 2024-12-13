'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import DurationDiscountCard from '@/components/settings/services/daycare/new/duration-discount-card';
import DurationDiscountFormFields from '@/components/settings/services/daycare/new/duration-discount-form-fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const EXAMPLE_DURATION_DISCOUNTS: FormValues['durationDiscounts'] = [
  {
    minDays: '5',
    discountPercent: '10',
    description: `5+ days - 10% off<br><small>Perfect for workweek stays!</small>`,
  },
  {
    minDays: '10',
    discountPercent: '15',
    description: `10+ days - 15% off<br><small>Ideal for extended vacations</small>`,
  },
  {
    minDays: '20',
    discountPercent: '20',
    description: `20+ days - 20% off<br><small>Best value for long-term care</small>`,
  },
] as const;

export default function DurationDiscountsStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [durationDiscounts, durationDiscountIndexEditing] = watch([
    'durationDiscounts',
    'durationDiscountIndexEditing',
  ]);

  const addedDurationDiscountMinDays = durationDiscounts.map(
    (dd) => dd.minDays,
  );
  const suggestions = EXAMPLE_DURATION_DISCOUNTS.filter(
    (s) => !addedDurationDiscountMinDays.includes(s.minDays),
  );

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {!durationDiscounts.length && (
          <p className='text-sm text-gray-500'>
            No duration discounts added yet. Add your first discount below or
            choose from our suggestions.
          </p>
        )}
        {durationDiscounts.map((_durationDiscount, index) => (
          <div key={index}>
            {durationDiscountIndexEditing === index ? (
              <DurationDiscountFormFields index={index} />
            ) : (
              <DurationDiscountCard index={index} />
            )}
          </div>
        ))}
      </div>

      <div>
        <Button
          onClick={() => {
            setValue('durationDiscountIndexEditing', durationDiscounts.length);
            setValue('durationDiscounts', [
              ...durationDiscounts,
              {
                minDays: '',
                discountPercent: '',
                description: '',
              },
            ]);
          }}
          type='button'
          variant='outline'
        >
          Add Duration Discount
        </Button>
      </div>

      {!!suggestions.length && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2 flex items-center'>
            <Info className='h-4 w-4 mr-2' />
            Suggested Duration Discounts
          </h4>
          <p className='text-sm text-blue-700 mb-3'>
            Quick-add these common duration discounts to get started faster:
          </p>
          <div className='flex flex-wrap gap-2'>
            {suggestions.map((durationDiscount, index) => (
              <Badge
                key={index}
                className='cursor-pointer bg-blue-100 hover:bg-blue-200'
                onClick={() => {
                  if (
                    durationDiscounts.length === 1 &&
                    !durationDiscounts[0].minDays &&
                    !durationDiscounts[0].discountPercent &&
                    !durationDiscounts[0].description
                  ) {
                    setValue('durationDiscounts', [durationDiscount]);
                    setValue('durationDiscountIndexEditing', null);
                  } else {
                    setValue('durationDiscounts', [
                      ...durationDiscounts,
                      durationDiscount,
                    ]);
                  }
                }}
              >
                + Add {durationDiscount.minDays}+ ($
                {durationDiscount.discountPercent}% off)
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
