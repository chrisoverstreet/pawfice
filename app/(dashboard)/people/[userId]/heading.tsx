import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import HeadingAvatarButton from '@/app/(dashboard)/people/[userId]/heading-avatar-button';
import { Badge } from '@/components/ui/badge';

export default function Heading({ user }: { user: PageData }) {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8'>
      <HeadingAvatarButton user={user} />
      <div className='text-center sm:text-left'>
        <h2 className='text-3xl font-bold text-primary'>{user.name}</h2>
        <Badge variant='secondary' className='mt-2 text-sm'>
          {user.role}
        </Badge>
      </div>
    </div>
  );
}
