'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clsx } from 'clsx';
import { ChevronDown, MapPin, PawPrint } from 'lucide-react';
import { useState } from 'react';

export default function BusinessDropdown() {
  const [open, onOpenChange] = useState(false);

  return (
    <div className='relative'>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-highlight transition-colors w-full md:w-auto'>
          <div className='w-full flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full flex items-center justify-center'>
              <PawPrint className='h-5 w-5' />
            </div>
            <div className='text-left'>
              <div className='text-sm font-semibold text-content'>
                Demo, Inc.
              </div>
              <div className='flex items-center text-xs text-muted'>
                <MapPin className='h-3 w-3 mr-1' />
                San Francisco, CA
              </div>
            </div>
            <ChevronDown
              className={clsx(
                'h-4 w-4 text-muted transition-transform ml-auto',
                open && 'transform rotate-180',
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-full bg-surface'>
          <div>TODO</div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
