'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import ServiceTypeInput from '@/components/reservations/new/service-type-input';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

export default function ServiceTypeStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const serviceType = watch('serviceType');

  return (
    <div>
      <ServiceTypeInput />
      <div className='flex justify-between pt-8'>
        <Button
          onClick={() => setValue('step', 'Select Pets')}
          variant='ghost'
          size='lg'
        >
          Back
        </Button>
        <Button
          disabled={!serviceType}
          onClick={() => setValue('step', 'Schedule')}
          size='lg'
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
