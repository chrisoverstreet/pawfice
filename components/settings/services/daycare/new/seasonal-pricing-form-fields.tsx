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

export default function SeasonalPricingFormFields({
  index,
}: {
  index: number;
}) {
  const { setFocus, setValue, watch } = useFormContext<FormValues>();

  const seasonalPricing = watch('seasonalPricing');
  const sp = seasonalPricing[index];

  const [name, setName] = useState(sp?.name);
  const [nameError, setNameError] = useState<string>();
  const [description, setDescription] = useState(sp.description);
  const [priceAdjustmentPercent, setPriceAdjustmentPercent] = useState(
    sp.priceAdjustmentPercent,
  );
  const [priceAdjustmentPercentError, setPriceAdjustmentPercentError] =
    useState<string>();
  const [startDate, setStartDate] = useState<Date | null>(sp.startDate);
  const [startDateError, setStartDateError] = useState<string>();
  const [endDate, setEndDate] = useState<Date | null>(sp.endDate);
  const [endDateError, setEndDateError] = useState<string>();

  return (
    <Card className='grid grid-cols-2 gap-4 p-3'>
      <FormItem className='col-span-2'>
        <FormLabel>Seasonal Name</FormLabel>
        <FormControl>
          <Input
            autoFocus
            autoCapitalize='words'
            placeholder='e.g., Small, Medium, Large'
            onChange={(e) => {
              setName(e.currentTarget.value);
              setNameError(undefined);
            }}
            value={name}
          />
        </FormControl>
        <FormMessage>{nameError}</FormMessage>
      </FormItem>

      <FormItem className='col-span-2'>
        <FormLabel>Price Adjustment (%)</FormLabel>
        <FormControl>
          <Input
            placeholder='e.g., 10'
            onChange={(e) => {
              setPriceAdjustmentPercent(e.currentTarget.value);
              setPriceAdjustmentPercentError(undefined);
            }}
            value={priceAdjustmentPercent}
          />
        </FormControl>
        <FormMessage>{priceAdjustmentPercentError}</FormMessage>
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
    if (!name || !priceAdjustmentPercent) {
      if (!name) {
        setNameError('Name is required');
        setFocus(`seasonalPricing.${index}.name`);
      }
      if (!priceAdjustmentPercent) {
        setPriceAdjustmentPercentError('Base price is required');
        setFocus(`seasonalPricing.${index}.priceAdjustmentPercent`);
      }
      return;
    }

    setValue(`seasonalPricing.${index}`, {
      name,
      startDate,
      endDate,
      priceAdjustmentPercent,
      description,
    });
    setValue('seasonalPricingIndexEditing', null);
  }

  function handleCancelClick() {
    setValue('seasonalPricingIndexEditing', null);

    if (
      !name &&
      !startDate &&
      !endDate &&
      !priceAdjustmentPercent &&
      !description
    ) {
      setValue('seasonalPricing', [
        ...seasonalPricing.slice(0, index),
        ...seasonalPricing.slice(index + 1),
      ]);
    }
  }
}
