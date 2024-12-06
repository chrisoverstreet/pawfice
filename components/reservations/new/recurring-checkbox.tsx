'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

export default function RecurringCheckbox() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name='recurring'
      render={({ field }) => (
        <FormItem className='flex items-center gap-2 space-y-0'>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className='cursor-pointer'>
            Make this a recurring reservation
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
