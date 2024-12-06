'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

export default function RecurringFrequencySelect() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name='recurringFrequency'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Frequency</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Select frequency' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value='Weekly'>Weekly</SelectItem>
              <SelectItem value='EveryTwoWeeks'>Every two weeks</SelectItem>
              <SelectItem value='Monthly'>Monthly</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
