'use client';

import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useTransformedImage from '@/hooks/use-transformed-image';

export default function HeadingAvatarButton({
  user,
}: {
  user: Pick<PageData, 'avatar_url' | 'initials' | 'name'>;
}) {
  const url = useTransformedImage({
    originalUrl: user.avatar_url,
    transformOptions: {
      height: 148,
      width: 148,
      resize: 'cover',
    },
  });

  const [, setModal] = useUserPageModal();

  return (
    <Avatar
      className='w-24 h-24'
      role='button'
      onClick={() => setModal('edit-avatar')}
    >
      <AvatarImage src={url} alt={user.name} />
      <AvatarFallback className='text-2xl'>{user.initials}</AvatarFallback>
    </Avatar>
  );
}
