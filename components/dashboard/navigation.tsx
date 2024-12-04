'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import navigationItems from '@/config/navigation';
import { clsx } from 'clsx';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation({
  className = 'hidden md:flex items-center justify-center gap-4',
}) {
  const pathname = usePathname();

  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Show all items when in mobile/vertical layout
  if (className.includes('flex-col')) {
    return (
      <nav className={className}>
        {navigationItems.map((item) => (
          <Link
            className={clsx(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              pathname === item.href
                ? 'text-primary bg-primary/5'
                : 'text-muted hover:text-primary hover-bg',
            )}
            href={item.href}
            key={item.name}
          >
            <item.icon className='h-5 w-5' />
            {item.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className={className}>
      {navigationItems.map((item, i) => (
        <Link
          className={clsx(
            'hidden items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
            pathname === item.href
              ? 'text-primary bg-primary/5'
              : 'text-muted hover:text-primary hover-bg',
            i === 0 && 'md:flex',
            i === 1 && 'lg:flex',
            i === 2 && 'xl:flex',
          )}
          href={item.href}
          key={item.name}
        >
          <item.icon className='h-5 w-5' />
          {item.name}
        </Link>
      ))}
      <DropdownMenu open={moreDropdownOpen} onOpenChange={setMoreDropdownOpen}>
        <DropdownMenuTrigger>
          <div className='hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted hover:text-primary rounded-lg hover-bg transition-colors'>
            <MoreHorizontal className='h-5 w-5' />
            <span>More</span>
            <ChevronDown
              className={clsx(
                'h-4 w-4 transition-transform',
                moreDropdownOpen && 'transform rotate-180',
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 bg-surface rounded-lg'>
          {navigationItems.map((item, i) => (
            <DropdownMenuItem asChild key={item.name}>
              <Link
                className={clsx(
                  'cursor-pointer flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'text-primary bg-primary/5'
                    : 'text-muted hover:text-primary hover-bg',
                  i === 0 && 'hidden',
                  i === 1 && 'lg:hidden',
                  i === 2 && 'xl:hidden',
                )}
                href={item.href}
              >
                <item.icon className='h-5 w-5' />
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
