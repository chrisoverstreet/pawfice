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

export default function SizeCategoryFormFields({ index }: { index: number }) {
  const { setFocus, setValue, watch } = useFormContext<FormValues>();

  const sizeCategories = watch('sizeCategories');
  const sizeCategory = sizeCategories[index];

  const [name, setName] = useState(sizeCategory?.name);
  const [nameError, setNameError] = useState<string>();
  const [description, setDescription] = useState(sizeCategory.description);
  const [priceAdjustmentDollars, setPriceAdjustmentDollars] = useState(
    sizeCategory.priceAdjustmentDollars,
  );
  const [priceAdjustmentDollarsError, setPriceAdjustmentDollarsError] =
    useState<string>();
  const [minWeight, setMinWeight] = useState(sizeCategory.minWeight ?? '');
  const [minWeightError, setMinWeightError] = useState<string>();
  const [maxWeight, setMaxWeight] = useState(sizeCategory.minWeight ?? '');
  const [maxWeightError, setMaxWeightError] = useState<string>();

  return (
    <Card className='grid grid-cols-2 gap-4 p-3'>
      <FormItem className='col-span-2'>
        <FormLabel>Category Name</FormLabel>
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

      <FormItem>
        <FormLabel>Min Weight (lbs)</FormLabel>
        <FormControl>
          <Input
            max='500'
            min='0'
            step='1'
            type='number'
            inputMode='numeric'
            placeholder='e.g., 0'
            onChange={(e) => {
              setMinWeight(e.currentTarget.value);
              setMinWeightError(undefined);
            }}
            value={minWeight}
          />
        </FormControl>
        <FormMessage>{minWeightError}</FormMessage>
      </FormItem>

      <FormItem>
        <FormLabel>Max Weight (lbs)</FormLabel>
        <FormControl>
          <Input
            max='500'
            min='0'
            step='1'
            type='number'
            inputMode='numeric'
            placeholder='e.g., 20'
            onChange={(e) => {
              setMaxWeight(e.currentTarget.value);
              setMaxWeightError(undefined);
            }}
            value={maxWeight}
          />
        </FormControl>
        <FormMessage>{maxWeightError}</FormMessage>
      </FormItem>

      <FormItem className='col-span-2'>
        <FormLabel>Price Adjustment ($)</FormLabel>
        <FormControl>
          <Input
            placeholder='e.g., 5'
            onChange={(e) => {
              setPriceAdjustmentDollars(e.currentTarget.value);
              setPriceAdjustmentDollarsError(undefined);
            }}
            value={priceAdjustmentDollars}
          />
        </FormControl>
        <FormMessage>{priceAdjustmentDollarsError}</FormMessage>
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
    if (!name || !priceAdjustmentDollars) {
      if (!name) {
        setNameError('Name is required');
        setFocus(`sizeCategories.${index}.name`);
      }
      if (!priceAdjustmentDollars) {
        setPriceAdjustmentDollarsError('Base price is required');
        setFocus(`sizeCategories.${index}.priceAdjustmentDollars`);
      }
      return;
    }

    setValue(`sizeCategories.${index}`, {
      name,
      minWeight,
      maxWeight,
      priceAdjustmentDollars,
      description,
    });
    setValue('sizeCategoryIndexEditing', null);
  }

  function handleCancelClick() {
    setValue('sizeCategoryIndexEditing', null);

    if (
      !name &&
      !priceAdjustmentDollars &&
      !description &&
      !minWeight &&
      !maxWeight
    ) {
      setValue('sizeCategories', [
        ...sizeCategories.slice(0, index),
        ...sizeCategories.slice(index + 1),
      ]);
    }
  }
}
