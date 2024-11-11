'use client';

import addUserAction from '@/app/(dashboard)/people/add-user-action';
import useModal from '@/app/(dashboard)/people/use-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import { useAction } from 'next-safe-action/hooks';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().transform((ln) => ln || undefined),
  email: z
    .string()
    .email()
    .or(z.literal(''))
    .transform((e) => e || undefined),
  phone: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    })
    .transform((x) => x || undefined),
});

type FormValues = z.infer<typeof schema>;

export default function AddUserForm() {
  const [, setModal] = useModal();

  const { execute, hasSucceeded, isPending } = useAction(addUserAction, {
    onSuccess: async () => {
      // TODO redirect
      await setModal(null);
    },
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    disabled: hasSucceeded || isPending,
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form
        className='flex flex-col gap-4'
        onSubmit={methods.handleSubmit((fv) => execute(fv))}
      >
        <FormField
          control={methods.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input autoFocus placeholder='John' required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  inputMode='email'
                  placeholder='john.doe@gmail.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  methods.setValue(
                    'phone',
                    new AsYouType('US').input(e.currentTarget.value),
                  );
                }}
              >
                <Input inputMode='tel' placeholder='(540)123-4567' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add user</Button>
      </form>
    </Form>
  );
}
