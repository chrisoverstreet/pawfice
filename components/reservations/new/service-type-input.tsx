'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { Calendar, Clock } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const SERVICE_TYPES = [
  {
    name: 'Overnight Boarding',
    value: 'Overnight Boarding',
    description: 'Overnight care for your pet',
    price: 'From $45/night',
    icon: Calendar,
  },
  {
    name: 'Daycare',
    value: 'Daycare',
    description: 'Daytime care and activities',
    price: 'From $35/day',
    icon: Clock,
  },
] as const;

export default function ServiceTypeInput() {
  const { control, setValue } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name='serviceType'
      render={({ field }) => (
        <FormItem>
          <div>
            <FormLabel>Test</FormLabel>
            <FormDescription>Description</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {SERVICE_TYPES.map((st) => (
                <FormItem key={st.value}>
                  <FormControl>
                    <input
                      className='hidden peer'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue('step', 'Schedule');
                      }}
                      type='radio'
                      checked={st.value === field.value}
                      value={st.value}
                    />
                  </FormControl>
                  <FormLabel className='cursor-pointer flex gap-4 items-center rounded-lg p-4 peer-checked:bg-primary/10 border-2 peer-checked:border-primary border-gray-200 hover:border-primary transition-colors'>
                    <st.icon className='h-8 w-8' />
                    <div>
                      <p className='text-lg mb-2'>{st.name}</p>
                      <p className='text-muted mb-3.5'>{st.description}</p>
                      <p className='text-muted font-semibold'>{st.price}</p>
                    </div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
