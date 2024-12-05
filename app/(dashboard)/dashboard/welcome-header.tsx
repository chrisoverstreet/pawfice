import { Button } from '@/components/ui/button';
import { Calendar, Lightbulb, LogIn, LogOut, Plus } from 'lucide-react';
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
        <div className='relative overflow-hidden col-span-1 card p-6'>
          {/* Background image with overlay */}
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=2070")',
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80' />
          <div className='relative h-full p-6 flex flex-col justify-center'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-white/20 backdrop-blur-sm rounded-lg'>
                <Lightbulb className='w-5 h-5 text-white' />
              </div>
              <h2 className='text-lg font-semibold text-white'>Quick tip</h2>
            </div>
            <p className='text-white/90'>
              Complete your business profile to attract more pet owners.
            </p>
          </div>
        </div>
        <div className='col-span-1 card p-6'>
          <h3 className='font-medium mb-2'>Today&#39;s schedule</h3>
          <p className='text-gray-airbnb text-sm'>
            You have 3 pets checking in today.
          </p>
        </div>
        <div className='card p-6 sm:col-span-2 lg:col-span-1'>
          <h3 className='font-medium mb-4'>Quick actions</h3>
          <div className='grid grid-cols-1 gap-3'>
            <Button asChild variant='outline'>
              <Link href='/check-in' className='py-3 h-auto'>
                <LogIn className='h-8 w-8 mr-2' />
                <div className='flex-1'>
                  <div className='text-sm font-medium text-secondary'>
                    Check In
                  </div>
                  <div className='text-xs text-gray-airbnb'>
                    Process pet arrivals
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild variant='outline'>
              <Link href='/check-out' className='py-3 h-auto'>
                <LogOut className='h-8 w-8 mr-2' />
                <div className='flex-1'>
                  <div className='text-sm font-medium text-secondary'>
                    Check Out
                  </div>
                  <div className='text-xs text-gray-airbnb'>
                    Process pet departures
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild variant='outline'>
              <Link href='/bookings/new' className='py-3 h-auto'>
                <Calendar className='h-8 w-8 mr-2' />
                <div className='flex-1'>
                  <div className='text-sm font-medium text-secondary'>
                    New Booking
                  </div>
                  <div className='text-xs text-gray-airbnb'>
                    Schedule a stay
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
