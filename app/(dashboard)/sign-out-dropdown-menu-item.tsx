'use client';

import signOutAction from '@/actions/sign-out-action';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Loader2, LogOut } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignOutDropdownMenuItem() {
  const router = useRouter();

  const { execute, hasSucceeded, isPending } = useAction(signOutAction, {
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
    onSuccess: () => router.replace('/'),
  });

  return (
    <DropdownMenuItem
      className='cursor-pointer'
      disabled={hasSucceeded || isPending}
      onClick={() => execute()}
    >
      {isPending ? <Loader2 className='animate-spin' /> : <LogOut />}
      Log out
    </DropdownMenuItem>
  );
}
