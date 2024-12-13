'use client';

import { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import SeasonalPricingCard from '@/components/settings/services/daycare/new/seasonal-pricing-card';
import SeasonalPricingFormFields from '@/components/settings/services/daycare/new/seasonal-pricing-form-fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const EXAMPLE_SEASONAL_PRICING: FormValues['seasonalPricing'] = [
  {
    name: 'Holiday Season',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2025-01-05'),
    priceAdjustmentPercent: '20',
    description: `Higher rates during peak holiday times<ul><li>Increased demand</li><li>Special holiday activities</li><li>Festive treats for pets</li></ul>`,
  },
  {
    name: 'Summer Peak',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    priceAdjustmentPercent: '10',
    description: `Slightly increased rates during busy summer months<ul><li>Extended playtime hours</li><li>Outdoor water activities</li><li>Frozen treats for hot days</li></ul>`,
  },
] as const;

export default function SeasonalPricingStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [seasonalPricing, seasonalPricingIndexEditing] = watch([
    'seasonalPricing',
    'seasonalPricingIndexEditing',
  ]);

  const addedSeasonalPricingNames = seasonalPricing.map((sp) => sp.name);
  const suggestions = EXAMPLE_SEASONAL_PRICING.filter(
    (s) => !addedSeasonalPricingNames.includes(s.name),
  );

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {!seasonalPricing.length && (
          <p className='text-sm text-gray-500'>
            No seasonal pricing added yet. Add your first seasonal pricing below
            or choose from our suggestions.
          </p>
        )}
        {seasonalPricing.map((_sp, index) => (
          <div key={index}>
            {seasonalPricingIndexEditing === index ? (
              <SeasonalPricingFormFields index={index} />
            ) : (
              <SeasonalPricingCard index={index} />
            )}
          </div>
        ))}
      </div>

      <div>
        <Button
          onClick={() => {
            setValue('seasonalPricingIndexEditing', seasonalPricing.length);
            setValue('seasonalPricing', [
              ...seasonalPricing,
              {
                name: '',
                startDate: null,
                endDate: null,
                priceAdjustmentPercent: '',
                description: '',
              },
            ]);
          }}
          type='button'
          variant='outline'
        >
          Add Seasonal Pricing
        </Button>
      </div>

      {!!suggestions.length && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2 flex items-center'>
            <Info className='h-4 w-4 mr-2' />
            Suggested Seasonal Pricing
          </h4>
          <p className='text-sm text-blue-700 mb-3'>
            Quick-add these common seasonal pricing options to get started
            faster:
          </p>
          <div className='flex flex-wrap gap-2'>
            {suggestions.map((sp, index) => (
              <Badge
                key={index}
                className='cursor-pointer bg-blue-100 hover:bg-blue-200'
                onClick={() => {
                  if (
                    seasonalPricing.length === 1 &&
                    !seasonalPricing[0].name &&
                    !seasonalPricing[0].startDate &&
                    !seasonalPricing[0].endDate &&
                    !seasonalPricing[0].priceAdjustmentPercent &&
                    !seasonalPricing[0].description
                  ) {
                    setValue('seasonalPricing', [sp]);
                    setValue('seasonalPricingIndexEditing', null);
                  } else {
                    setValue('seasonalPricing', [...seasonalPricing, sp]);
                  }
                }}
              >
                + Add {sp.name} (${sp.startDate?.toLocaleDateString()}-$
                {sp.endDate?.toLocaleDateString()}lbs, $
                {sp.priceAdjustmentPercent})
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
