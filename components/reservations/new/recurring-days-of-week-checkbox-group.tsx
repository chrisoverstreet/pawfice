'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export default function RecurringDaysOfWeekCheckboxGroup() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name='recurringDaysOfWeek'
      render={() => (
        <FormItem>
          <div>
            <FormLabel>Days of the week</FormLabel>
          </div>
          <div className='space-y-0 flex gap-2 flex-wrap'>
            {DAYS_OF_WEEK.map((dayOfWeek) => (
              <FormField
                key={dayOfWeek}
                control={control}
                name='recurringDaysOfWeek'
                render={({ field }) => (
                  <FormItem key={dayOfWeek}>
                    <FormControl>
                      <input
                        className='hidden peer'
                        type='checkbox'
                        checked={field.value?.includes(dayOfWeek)}
                        onChange={(e) => {
                          if (e.currentTarget.checked) {
                            field.onChange([...(field.value ?? []), dayOfWeek]);
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== dayOfWeek,
                              ),
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        'cursor-pointer inline-block px-5 py-3 rounded-full float-left border-2 border-muted peer-checked:bg-primary/10 peer-checked:border-primary transition-colors',
                      )}
                    >
                      {dayOfWeek}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}
