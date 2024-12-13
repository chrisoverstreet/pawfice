'use client';

import { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import SizeCategoryCard from '@/components/settings/services/daycare/new/size-category-card';
import SizeCategoryFormFields from '@/components/settings/services/daycare/new/size-category-form-fields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const EXAMPLE_SIZE_CATEGORIES: FormValues['sizeCategories'] = [
  {
    name: 'Small',
    minWeight: '0',
    maxWeight: '20',
    priceAdjustmentDollars: '0',
    description: `For small breeds and puppies. Suitable for:<ul><li>Chihuahuas</li><li>Yorkies</li><li>Toy Poodles</li></ul>`,
  },
  {
    name: 'Medium',
    minWeight: '21',
    maxWeight: '50',
    priceAdjustmentDollars: '5',
    description: `For average-sized dogs. Ideal for:<ul><li>Beagles</li><li>Cocker Spaniels</li><li>Border Collies</li></ul>`,
  },
  {
    name: 'Large',
    minWeight: '51',
    maxWeight: '100',
    priceAdjustmentDollars: '10',
    description: `For large breeds. Perfect for:<ul><li>Labrador Retrievers</li><li>German Shepherds</li><li>Golden Retrievers</li></ul>`,
  },
] as const;

export default function SizeCategoriesStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [sizeCategories, sizeCategoryIndexEditing] = watch([
    'sizeCategories',
    'sizeCategoryIndexEditing',
  ]);

  const addedSizeCategoryNames = sizeCategories.map((sc) => sc.name);
  const suggestions = EXAMPLE_SIZE_CATEGORIES.filter(
    (s) => !addedSizeCategoryNames.includes(s.name),
  );

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {!sizeCategories.length && (
          <p className='text-sm text-gray-500'>
            No size categories added yet. Add your first category below or
            choose from our suggestions.
          </p>
        )}
        {sizeCategories.map((_sizeCategory, index) => (
          <div key={index}>
            {sizeCategoryIndexEditing === index ? (
              <SizeCategoryFormFields index={index} />
            ) : (
              <SizeCategoryCard index={index} />
            )}
          </div>
        ))}
      </div>

      <div>
        <Button
          onClick={() => {
            setValue('sizeCategoryIndexEditing', sizeCategories.length);
            setValue('sizeCategories', [
              ...sizeCategories,
              {
                description: '',
                minWeight: '',
                maxWeight: '',
                priceAdjustmentDollars: '',
                name: '',
              },
            ]);
          }}
          type='button'
          variant='outline'
        >
          Add Size Category
        </Button>
      </div>

      {!!suggestions.length && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2 flex items-center'>
            <Info className='h-4 w-4 mr-2' />
            Suggested Size Categories
          </h4>
          <p className='text-sm text-blue-700 mb-3'>
            Quick-add these common size categories to get started faster::
          </p>
          <div className='flex flex-wrap gap-2'>
            {suggestions.map((sizeCategory, index) => (
              <Badge
                key={index}
                className='cursor-pointer bg-blue-100 hover:bg-blue-200'
                onClick={() => {
                  if (
                    sizeCategories.length === 1 &&
                    !sizeCategories[0].name &&
                    !sizeCategories[0].minWeight &&
                    !sizeCategories[0].maxWeight &&
                    !sizeCategories[0].priceAdjustmentDollars &&
                    !sizeCategories[0].description
                  ) {
                    setValue('sizeCategories', [sizeCategory]);
                    setValue('sizeCategoryIndexEditing', null);
                  } else {
                    setValue('sizeCategories', [
                      ...sizeCategories,
                      sizeCategory,
                    ]);
                  }
                }}
              >
                + Add {sizeCategory.name} (${sizeCategory.minWeight}-$
                {sizeCategory.maxWeight}lbs)
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
