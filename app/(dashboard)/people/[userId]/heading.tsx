import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import HeadingAvatarButton from '@/app/(dashboard)/people/[userId]/heading-avatar-button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export default function Heading({ user }: { user: PageData }) {
  return (
    <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8'>
      <HeadingAvatarButton user={user} />
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-primary '>{user.name}</h2>
        <div className='flex gap-2 items-center mt-2 justify-center sm:justify-start'>
          {!!user.role && user.role !== 'parent' && (
            <Badge variant='secondary' className=' text-sm'>
              {user.role}
            </Badge>
          )}
          {!!user.auth_id && (
            <div className='flex gap-2 items-center text-xs'>
              <CheckCircle color='green' size={16} /> Registered
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
