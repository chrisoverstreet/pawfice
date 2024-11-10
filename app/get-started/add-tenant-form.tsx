'use client';

import addTenantAction from '@/app/get-started/add-tenant-action';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function AddTenantForm() {
  const router = useRouter();

  const { execute, hasSucceeded, isPending } = useAction(addTenantAction, {
    onSuccess: () => router.push('/dashboard'),
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    disabled: isPending || hasSucceeded,
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input autoFocus required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || hasSucceeded}
          loading={isPending}
          type='submit'
        >
          Let&apos;s go!
        </Button>
      </form>
    </Form>
  );
}
