'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function DatesInput() {
  const { control, watch } = useFormContext<FormValues>();

  const dates = watch('dates');

  return (
    <FormField
      control={control}
      name='dates'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Date(s)</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={clsx(
                    'w-[300px] justify-start text-left font-normal',
                    !dates && 'text-muted',
                  )}
                >
                  <CalendarIcon />
                  {dates?.from ? (
                    dates.to ? (
                      <>
                        {format(dates.from, 'LLL dd, y')} -{' '}
                        {format(dates.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dates.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={dates?.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
