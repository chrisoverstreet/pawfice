'use client';

import type { FormValues } from '@/components/reservations/new/new-reservation-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { getBrowserClient } from '@/lib/supabase/get-browser-client';
import { useQuery } from '@tanstack/react-query';
import pluralize from 'pluralize';
import type { FormProps } from 'react-hook-form';

export default function OtherPetsSelection({
  control,
  parentIds,
  selectedPetId,
}: {
  control: FormProps<FormValues>['control'];
  parentIds: string[];
  selectedPetId: string;
}) {
  const { data } = useQuery({
    queryFn: async () => {
      const supabase = getBrowserClient();
      const { data, error } = await supabase
        .from('pets')
        .select(`*, pet_parents!inner(users!inner(*))`)
        .in('pet_parents.users.short_id', parentIds)
        .neq('short_id', selectedPetId);

      if (error) {
        throw error;
      }

      return data;
    },
    queryKey: ['parent_pets', parentIds, selectedPetId],
  });

  if (!data?.length) {
    return null;
  }

  return (
    <>
      <div className='flex items-center gap-4 my-8'>
        <div className='flex-1 border-t border-divider' />
        <h3 className='text-sm font-medium text-content'>
          {parentIds.length === 1 ? `Parent's` : `Parents'`} other pets
        </h3>
        <div className='flex-1 border-t border-divider' />
      </div>
      <div>
        {data?.map((pet) => (
          <FormField
            key={pet.id}
            control={control}
            name='petIds'
            render={({ field }) => (
              <FormItem key={pet.id}>
                <FormControl>
                  <input
                    className='hidden peer'
                    type='checkbox'
                    checked={field.value?.includes(pet.short_id)}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        field.onChange([...field.value, pet.short_id]);
                      } else {
                        const newValue = field.value?.filter(
                          (value) => value !== pet.short_id,
                        );
                        field.onChange(newValue);
                      }
                    }}
                  />
                </FormControl>
                <FormLabel className='cursor-pointer flex gap-4 items-center rounded-lg p-4 peer-checked:bg-primary/10 border-2 peer-checked:border-primary border-gray-200 hover:border-primary transition-colors'>
                  <Avatar>
                    <AvatarFallback>{pet.name}</AvatarFallback>
                    <AvatarImage src={pet.avatar_url ?? undefined} />
                  </Avatar>
                  <div className='space-y-2'>
                    <p className='font-semibold'>{pet.name}</p>
                    <p className='text-muted'>TODO Breed</p>
                    <p className='text-muted'>
                      {pluralize('Parent', pet.pet_parents.length)}:{' '}
                      {pet.pet_parents.flatMap((p) => p.users.name).join(', ')}
                    </p>
                  </div>
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </>
  );
}
