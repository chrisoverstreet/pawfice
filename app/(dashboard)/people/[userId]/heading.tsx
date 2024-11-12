import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Heading({ user }: { user: PageData }) {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8'>
      <Avatar className='w-24 h-24 border-4 border-primary'>
        <AvatarImage
          src={user.avatar_url || '/placeholder.svg?height=96&width=96'}
          alt={user.name}
        />
        <AvatarFallback className='text-2xl'>{user.initials}</AvatarFallback>
      </Avatar>
      <div className='text-center sm:text-left'>
        <h2 className='text-3xl font-bold text-primary'>{user.name}</h2>
        <Badge variant='secondary' className='mt-2 text-sm'>
          {user.role}
        </Badge>
      </div>
    </div>
  );
}
