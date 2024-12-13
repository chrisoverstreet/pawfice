'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function DurationDiscountFormFields({
  index,
}: {
  index: number;
}) {
  const { setFocus, setValue, watch } = useFormContext<FormValues>();

  const durationDiscounts = watch('durationDiscounts');
  const durationDiscount = durationDiscounts[index];

  const [minDays, setMinDays] = useState(durationDiscount?.minDays);
  const [minDaysError, setMinDaysError] = useState<string>();
  const [description, setDescription] = useState(durationDiscount.description);
  const [discountPercent, setDiscountPercent] = useState(
    durationDiscount.discountPercent,
  );
  const [discountPercentError, setDiscountPercentError] = useState<string>();

  return (
    <Card className='space-y-4 p-3'>
      <FormItem className='col-span-2'>
        <FormLabel>Minimum Days</FormLabel>
        <FormControl>
          <Input
            autoFocus
            placeholder='e.g., 5'
            onChange={(e) => {
              setMinDays(e.currentTarget.value);
              setMinDaysError(undefined);
            }}
            value={minDays}
          />
        </FormControl>
        <FormMessage>{minDaysError}</FormMessage>
      </FormItem>

      <FormItem>
        <FormLabel>Discount Percentage</FormLabel>
        <FormControl>
          <Input
            max='100'
            min='0'
            step='1'
            type='number'
            inputMode='numeric'
            placeholder='e.g., 10'
            onChange={(e) => {
              setDiscountPercent(e.currentTarget.value);
              setDiscountPercentError(undefined);
            }}
            value={discountPercent}
          />
        </FormControl>
        <FormMessage>{discountPercentError}</FormMessage>
      </FormItem>

      <div>Description TODO</div>
      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type='button' onClick={handleSaveClick} variant='secondary'>
          <Check className='h-4 w-4 mr-2' /> Save Tier
        </Button>
      </div>
    </Card>
  );

  function handleSaveClick() {
    if (!minDays || !discountPercent) {
      if (!minDays) {
        setMinDaysError('Minimum days is required');
        setFocus(`durationDiscounts.${index}.minDays`);
      }
      if (!discountPercent) {
        setDiscountPercentError('Discount percentage is required');
        setFocus(`durationDiscounts.${index}.discountPercent`);
      }
      return;
    }

    setValue(`durationDiscounts.${index}`, {
      minDays,
      discountPercent,
      description,
    });
    setValue('durationDiscountIndexEditing', null);
  }

  function handleCancelClick() {
    setValue('durationDiscountIndexEditing', null);

    if (!minDays && !discountPercent && !description) {
      setValue('durationDiscounts', [
        ...durationDiscounts.slice(0, index),
        ...durationDiscounts.slice(index + 1),
      ]);
    }
  }
}
