'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function ReviewStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [serviceType, startDate, endDate, recurring, recurringFrequency] =
    watch([
      'serviceType',
      'dates.from',
      'dates.to',
      'recurring',
      'recurringFrequency',
    ]);

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>Reservation Summary</h2>
      <div className='bg-gray-100 px-6 py-4 rounded-lg'>{serviceType}</div>
      <div className='grid grid-cols-2'>
        {!!startDate && (
          <div className='space-y-1'>
            <p className='text-sm text-muted'>Start Date</p>
            <p className='font-semibold'>{format(startDate, 'LLL dd, y')}</p>
          </div>
        )}
        {!!endDate && (
          <div className='space-y-1'>
            <p className='text-sm text-muted'>End Date</p>
            <p className='font-semibold'>{format(endDate, 'LLL dd, y')}</p>
          </div>
        )}
      </div>
      {!!recurring && (
        <div className='bg-primary/10 rounded-lg px-6 py-4 w-full space-y-2'>
          <div className='font-semibold flex items-center'>
            <Calendar className='h-6 w-6 mr-2' />
            Recurring Schedule
          </div>
          <p className='text-sm'>
            {recurringFrequency} visits until{' '}
            {format(endDate || startDate, 'LLL dd, y')}
          </p>
          <p>TODO 1 additional visits scheduled</p>
        </div>
      )}
      <div>TODO</div>
      <div className='flex justify-between pt-8'>
        <Button
          onClick={() => setValue('step', 'Schedule')}
          size='lg'
          variant='ghost'
        >
          Back
        </Button>
        <Button disabled type='submit' size='lg'>
          Create Reservation
        </Button>
      </div>
    </div>
  );
}
