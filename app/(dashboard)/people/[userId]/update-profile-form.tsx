'use client';

import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import updateProfileAction, {
  type UpdateProfileActionArgs,
} from '@/app/(dashboard)/people/[userId]/update-profile-action';
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
import {
  AsYouType,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email().or(z.literal('')),
  firstName: z.string(),
  lastName: z.string(),
  phone: z
    .string()
    .refine((p) => isValidPhoneNumber(p, 'US'))
    .or(z.literal(''))
    .transform((p) =>
      p ? parsePhoneNumberWithError(p, 'US').number : undefined,
    ),
});

type FormValues = z.input<typeof schema>;

export default function UpdateProfileForm({ data }: { data: PageData }) {
  const methods = useForm<FormValues>({
    values: {
      email: data.email ?? '',
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      phone: data.phone || '',
    },
    resolver: zodResolver(schema),
  });

  const { isPending, execute } = useAction(updateProfileAction, {
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: ({ error }) => {
      console.log(error);
      toast.error(error.serverError || 'Unexpected error');
    },
  });

  return (
    <Form {...methods}>
      <form className='p-6 space-y-8' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <FormField
            control={methods.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!data.auth_id}
                    inputMode='email'
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
              <FormItem className='space-y-2'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!data.auth_id}
                    {...field}
                    onChange={(e) => {
                      methods.setValue(
                        'email',
                        new AsYouType('US').input(e.currentTarget.value),
                      );
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className='space-y-2'>
          <FormLabel>User ID</FormLabel>
          <Input disabled value={data.id} />
        </FormItem>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <FormItem className='space-y-2'>
            <FormLabel>Joined</FormLabel>
            <Input disabled value={data.created_at} />
          </FormItem>
          <FormItem className='space-y-2'>
            <FormLabel>Last Updated</FormLabel>
            <Input disabled value={data.updated_at} />
          </FormItem>
        </div>
        <div className='mt-8 flex justify-end'>
          <Button
            className='w-full sm:w-auto'
            disabled={!methods.formState.isDirty}
            loading={isPending}
            type='submit'
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );

  async function onSubmit(fv: FormValues) {
    const args: UpdateProfileActionArgs = {
      userShortId: data.short_id,
    };

    if (methods.formState.dirtyFields.firstName) {
      args.firstName = fv.firstName;
    }
    if (methods.formState.dirtyFields.lastName) {
      args.lastName = fv.lastName;
    }
    if (methods.formState.dirtyFields.email) {
      args.email = fv.email;
    }

    execute(args);
  }
}
