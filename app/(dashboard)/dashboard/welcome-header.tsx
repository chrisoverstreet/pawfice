import { Button } from '@/components/ui/button';
import { Calendar, LogIn, LogOut, Plus } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeHeader() {
  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='hidden sm:block text-3xl font-bold text-secondary'>
          Welcome back, Sarah!
        </h1>
        <Button
          className='w-full sm:w-auto'
          variant='default'
          asChild
          size='lg'
        >
          <Link href='/bookings/new'>
            <Plus className='h-5 w-5' />
            New Booking
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='col-span-1 card p-6'>
          <h3 className='font-medium mb-2'>Quick tip</h3>
          <p className='text-gray-airbnb text-sm'>
            Complete your business profile to attract more pet owners.
          </p>
        </div>
        <div className='col-span-1 card p-6 bg-primary/10'>
          <h3 className='font-medium mb-2'>Today&#39;s schedule</h3>
          <p className='text-gray-airbnb text-sm'>
            You have 3 pets checking in today.
          </p>
        </div>
        <div className='card p-6 sm:col-span-2 lg:col-span-1'>
          <h3 className='font-medium mb-4'>Quick actions</h3>
          <div className='grid grid-cols-1 gap-3'>
            <Link
              href='/check-in'
              className='flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group'
            >
              <div className='h-8 w-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary/10 transition-colors'>
                <LogIn className='h-4 w-4 text-primary' />
              </div>
              <div className='flex-1'>
                <div className='text-sm font-medium text-secondary'>
                  Check In
                </div>
                <div className='text-xs text-gray-airbnb'>
                  Process pet arrivals
                </div>
              </div>
            </Link>
            <Link
              href='/check-out'
              className='flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group'
            >
              <div className='h-8 w-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary/10 transition-colors'>
                <LogOut className='h-4 w-4 text-primary' />
              </div>
              <div className='flex-1'>
                <div className='text-sm font-medium text-secondary'>
                  Check Out
                </div>
                <div className='text-xs text-gray-airbnb'>
                  Process pet departures
                </div>
              </div>
            </Link>
            <Link
              href='/bookings/new'
              className='flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group'
            >
              <div className='h-8 w-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary/10 transition-colors'>
                <Calendar className='h-4 w-4 text-primary' />
              </div>
              <div className='flex-1'>
                <div className='text-sm font-medium text-secondary'>
                  New Booking
                </div>
                <div className='text-xs text-gray-airbnb'>Schedule a stay</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
