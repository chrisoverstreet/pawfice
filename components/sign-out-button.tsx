'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { getBrowserClient } from '@/lib/supabase/get-browser-client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignOutButton({
  children,
  ...props
}: Omit<ButtonProps, 'disabled' | 'loading' | 'onClick'>) {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async () => {
      const supabase = getBrowserClient();
      await supabase.auth.signOut();
    },
    onSuccess: () => router.replace('/'),
    onError: (error) => toast.error(error.message),
  });

  return (
    <Button
      disabled={isPending || isSuccess}
      loading={isPending}
      onClick={() => mutate()}
      {...props}
    >
      {children || 'Sign out'}
    </Button>
  );
}
