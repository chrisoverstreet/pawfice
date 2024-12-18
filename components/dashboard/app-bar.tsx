'use client';

import BusinessDropdownMenu from '@/components/dashboard/business-dropdown-menu';
import Navigation from '@/components/dashboard/navigation';
import UserAvatarDropdownMenu from '@/components/dashboard/user-avatar-dropdown-menu';
import type { Tables } from '@/utils/supabase/types';
import { Bell, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AppBar({
  user,
}: {
  user: Pick<Tables<'users'>, 'avatar_url' | 'email' | 'initials' | 'name'>;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white/70 backdrop-blur-md border border-divider rounded-xl drop-shadow-sm'>
          <div className='flex h-16 items-center justify-between px-4 lg:px-6'>
            <div className='flex items-center gap-x-4 lg:gap-x-6 flex-1'>
              <div className='flex md:hidden'>
                <button
                  className='p-2 text-gray-airbnb hover:bg-gray-50 rounded-lg'
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  type='button'
                >
                  <span className='sr-only'>
                    {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  </span>
                  <Menu className='h-5 w-5' />
                </button>
              </div>
              <div className='hidden md:block'>
                <BusinessDropdownMenu />
              </div>
            </div>

            <div className='hidden md:flex flex-1 justify-center'>
              <Navigation />
            </div>

            <div className='flex items-center gap-x-4 flex-1 justify-end'>
              <Link
                className='p-2 rounded-full hover-bg transition-colors'
                href='/search'
              >
                <Search className='h-5 w-5 text-muted' />
              </Link>
              <div className='p-2 rounded-full hover-bg transition-colors'>
                <Bell className='h-5 w-5 text-muted' />
              </div>
              <UserAvatarDropdownMenu user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50'>
          <div
            className='fixed inset-0 bg-overlay backdrop-blur-sm'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='fixed inset-x-0 top-0 z-50 h-full w-full bg-surface overflow-y-auto'>
            <div className='flex justify-end px-4'>
              <button
                type='button'
                className='p-2 text-muted hover-bg rounded-lg'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='px-4 space-y-6'>
              <div className='px-2'>
                <div>BusinessDropdown</div>
              </div>

              <div className='border-t border-divider pt-6'>
                <div className='px-2 pb-4'>
                  <h3 className='text-sm font-semibold text-muted mb-4'>
                    Menu
                  </h3>
                  <Navigation className='flex flex-col space-y-1' />
                </div>
              </div>

              <div className='border-t border-divider pt-6'>
                <div className='px-2'>
                  <h3 className='text-sm font-semibold text-muted mb-4'>
                    Account
                  </h3>
                  <div className='flex items-center gap-3 p-2 rounded-lg hover-bg'>
                    <img
                      alt='User avatar'
                      className='h-10 w-10 rounded-full object-cover'
                      src={user.avatar_url ?? undefined}
                    />
                    <div>
                      <div className='text-sm font-semibold text-content'>
                        {user.name}
                      </div>
                      <div className='text-sx text-muted'>{user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
