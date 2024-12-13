'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import ServiceTierCard from '@/components/settings/services/daycare/new/service-tier-card';
import ServiceTierFormFields from '@/components/settings/services/daycare/new/service-tier-form-fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const EXAMPLE_TIERS: FormValues['tiers'] = [
  {
    name: 'Basic',
    description:
      'Standard daycare with group play. Includes:<ul><li>Group playtime</li><li>Basic feeding</li><li>Outdoor walks</li></ul>',
    basePrice: '35',
  },
  {
    name: 'Premium',
    description:
      'Enhanced care with extra attention. Includes:<ul><li>All Basic features</li><li>Individual playtime</li><li>Premium food options</li></ul>',
    basePrice: '45',
  },
  {
    name: 'VIP',
    description:
      'Luxury care with individual attention. Includes:<ul><li>All Premium features</li><li>Spa treatments</li><li>Training sessions</li></ul>',
    basePrice: '60',
  },
] as const;

export default function ServiceTiersStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [tiers, tierIndexEditing] = watch(['tiers', 'tierIndexEditing']);

  const addedTierNames = tiers.map((t) => t.name);
  const suggestions = EXAMPLE_TIERS.filter(
    (t) => !addedTierNames.includes(t.name),
  );

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {!tiers.length && (
          <p className='text-sm text-gray-500'>
            No tiers added yet. Add your first tier below or choose from our
            suggestions.
          </p>
        )}
        {tiers.map((_tier, index) => (
          <div key={index}>
            {tierIndexEditing === index ? (
              <ServiceTierFormFields index={index} />
            ) : (
              <ServiceTierCard index={index} />
            )}
          </div>
        ))}
      </div>

      <div>
        <Button
          onClick={() => {
            setValue('tierIndexEditing', tiers.length);
            setValue('tiers', [
              ...tiers,
              { description: '', basePrice: '', name: '' },
            ]);
          }}
          type='button'
          variant='outline'
        >
          Add Tier
        </Button>
      </div>

      {!!suggestions.length && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2 flex items-center'>
            <Info className='h-4 w-4 mr-2' />
            Suggested Tiers
          </h4>
          <p className='text-sm text-blue-700 mb-3'>
            Quick-add these common tiers to get started faster:
          </p>
          <div className='flex flex-wrap gap-2'>
            {suggestions.map((tier, index) => (
              <Badge
                key={index}
                className='cursor-pointer bg-blue-100 hover:bg-blue-200'
                onClick={() => {
                  if (
                    tiers.length === 1 &&
                    !tiers[0].name &&
                    !tiers[0].basePrice &&
                    !tiers[0].description
                  ) {
                    setValue('tiers', [tier]);
                    setValue('tierIndexEditing', null);
                  } else {
                    setValue('tiers', [...tiers, tier]);
                  }
                }}
              >
                + Add {tier.name} (${tier.basePrice}/day)
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
