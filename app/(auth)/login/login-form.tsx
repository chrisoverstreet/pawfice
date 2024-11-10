'use client';

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
import { getBrowserClient } from '@/lib/supabase/get-browser-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async (fv: FormValues) => {
      const supabase = getBrowserClient();

      const { error } = await supabase.auth.signInWithPassword(fv);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => router.replace('/'),
    onError: (error) => toast.error(error.message),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    disabled: isPending || isSuccess,
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form
        className='flex flex-col gap-4'
        onSubmit={methods.handleSubmit((fv) => mutate(fv))}
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
