import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Tables } from '@/utils/supabase/types';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function UserAvatarDropdownMenu({
  user,
}: {
  user: Pick<Tables<'users'>, 'avatar_url' | 'email' | 'initials' | 'name'>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='h-10 w-10'>
          <AvatarFallback>{user.initials}</AvatarFallback>
          <AvatarImage src={user.avatar_url ?? undefined} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-surface rounded-lg w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem className='text-sm font-semibold text-content'>
            {user.name}
          </DropdownMenuItem>
          <DropdownMenuItem className='text-xs text-muted'>
            {user.email}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer w-full px-4 py-2 text-left text-sm text-muted hover:bg-highlight flex items-center'>
            <User className='h-4 w-4 mr-2' />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer w-full px-4 py-2 text-left text-sm text-muted hover:bg-highlight flex items-center'>
            <Settings className='h-4 w-4 mr-2' />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className='cursor-pointer w-full px-4 py-2 text-left text-sm text-muted hover:bg-highlight flex items-center'
          >
            <Link href='/auth/sign-out' prefetch={false}>
              <LogOut className='h-4 w-4 mr-2' />
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
