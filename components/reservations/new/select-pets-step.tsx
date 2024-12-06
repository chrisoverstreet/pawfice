'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import PetIdsCheckboxGroup from '@/components/reservations/new/pet-ids-checkbox-group';
import SearchInput from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import pluralize from 'pluralize';
import { useFormContext } from 'react-hook-form';

export default function SelectPetsStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const selectedPetCount = watch('petIds').length;

  return (
    <>
      <SearchInput placeholder='Search pets or owners…' />
      <Separator className='mt-0 mb-4' />
      <PetIdsCheckboxGroup />
      {!!selectedPetCount && (
        <div className='flex justify-end pt-8'>
          <Button
            type='button'
            size='lg'
            onClick={() => setValue('step', 'Service Type')}
          >
            Continue with {pluralize('Pet', selectedPetCount, true)}
          </Button>
        </div>
      )}
    </>
  );
}
