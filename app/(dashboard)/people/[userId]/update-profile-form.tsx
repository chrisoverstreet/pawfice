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
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function UpdateProfileForm({ data }: { data: PageData }) {
  const { isPending, execute } = useAction(updateProfileAction, {
    onSuccess: () => toast.success('Profile updated successfully'),
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    values: {
      firstName: data.first_name,
      lastName: data.last_name || '',
    },

    resolver: zodResolver(schema),
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
          <FormItem className='space-y-2'>
            <FormLabel>Email</FormLabel>
            <Input disabled value={data.auth?.email || ''} />
          </FormItem>
          <FormItem className='space-y-2'>
            <FormLabel>Phone</FormLabel>
            <Input disabled value={data.auth?.phone || ''} />
          </FormItem>
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
      tenantProfileId: data.id,
    };

    if (methods.formState.dirtyFields.firstName) {
      args.firstName = fv.firstName;
    }
    if (methods.formState.dirtyFields.lastName) {
      args.lastName = fv.lastName;
    }

    execute(args);
  }
}