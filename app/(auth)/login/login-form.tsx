'use client';

import loginAction from '@/app/(auth)/login/login-action';
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
  email: z.string().email(),
  // TODO better pw requirements
  password: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();

  const { execute, hasSucceeded, isPending } = useAction(loginAction, {
    onSuccess: () => router.replace('/'),
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoFocus inputMode='email' required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input required type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isPending} type='submit'>
          Sign In
        </Button>
      </form>
    </Form>
  );
}
