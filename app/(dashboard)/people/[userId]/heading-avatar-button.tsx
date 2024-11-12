'use client';

import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HeadingAvatarButton({
  user,
}: {
  user: Pick<PageData, 'avatar_url' | 'initials' | 'name'>;
}) {
  const [, setModal] = useUserPageModal();

  return (
    <Avatar
      className='w-24 h-24 border-4 border-primary'
      role='button'
      onClick={() => setModal('edit-avatar')}
    >
      <AvatarImage
        src={user.avatar_url || '/placeholder.svg?height=96&width=96'}
        alt={user.name}
      />
      <AvatarFallback className='text-2xl'>{user.initials}</AvatarFallback>
    </Avatar>
  );
}
