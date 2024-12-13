'use client';

import type { FormValues } from '@/components/settings/services/daycare/new/daycare-service-wizard';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export default function BasicInfoStep() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Name</FormLabel>
            <FormControl>
              <Input
                autoFocus
                autoCapitalize='words'
                placeholder='e.g., Full Day Daycare'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder='Describe your daycare service' {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
