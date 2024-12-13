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

export default function ServiceTierFormFields({ index }: { index: number }) {
  const { setFocus, setValue, watch } = useFormContext<FormValues>();

  const tiers = watch(`tiers`);
  const tier = tiers[index];

  const [name, setName] = useState(tier?.name);
  const [nameError, setNameError] = useState<string>();
  const [description, setDescription] = useState(tier.description);
  const [basePrice, setBasePrice] = useState(tier.basePrice);
  const [basePriceError, setBasePriceError] = useState<string>();

  return (
    <Card className='space-y-4 p-3'>
      <FormItem>
        <FormLabel>Tier Name</FormLabel>
        <FormControl>
          <Input
            autoFocus
            autoCapitalize='words'
            placeholder='e.g., Basic, Premium, VIP'
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
        <FormLabel>Base Price ($/day)</FormLabel>
        <FormControl>
          <Input
            inputMode='decimal'
            placeholder='e.g. 35'
            step='.01'
            type='number'
            onChange={(e) => {
              setBasePrice(e.currentTarget.value);
              setBasePriceError(undefined);
            }}
            value={basePrice}
          />
        </FormControl>
        <FormMessage>{basePriceError}</FormMessage>
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
    if (!name || !basePrice) {
      if (!name) {
        setNameError('Name is required');
        setFocus(`tiers.${index}.name`);
      }
      if (!basePrice) {
        setBasePriceError('Base price is required');
        setFocus(`tiers.${index}.basePrice`);
      }
      return;
    }

    setValue(`tiers.${index}`, {
      name,
      basePrice,
      description,
    });
    setValue('tierIndexEditing', null);
  }

  function handleCancelClick() {
    setValue('tierIndexEditing', null);

    if (!name && !basePrice && !description) {
      setValue('tiers', [...tiers.slice(0, index), ...tiers.slice(index + 1)]);
    }
  }
}
