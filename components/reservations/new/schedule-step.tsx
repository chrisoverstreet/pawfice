'use client';

import DatesInput from '@/components/reservations/new/dates-input';
import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import RecurringCheckbox from '@/components/reservations/new/recurring-checkbox';
import RecurringDaysOfWeekCheckboxGroup from '@/components/reservations/new/recurring-days-of-week-checkbox-group';
import RecurringFrequencySelect from '@/components/reservations/new/recurring-frequency-select';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

export default function ScheduleStep() {
  const { setValue, watch } = useFormContext<FormValues>();

  const [recurring, startDate] = watch(['recurring', 'dates.from']);

  return (
    <div className='flex flex-col gap-6'>
      <DatesInput />
      <RecurringCheckbox />
      {recurring && (
        <>
          <RecurringFrequencySelect />
          <RecurringDaysOfWeekCheckboxGroup />
        </>
      )}
      <div className='flex justify-between pt-8'>
        <Button
          onClick={() => setValue('step', 'Service Type')}
          size='lg'
          variant='ghost'
        >
          Back
        </Button>
        <Button
          disabled={!startDate}
          onClick={() => setValue('step', 'Review')}
          size='lg'
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
