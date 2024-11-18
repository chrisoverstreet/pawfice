import { Button } from '@/components/ui/button';
import { getServerClient } from '@/lib/supabase/get-server-client';
import decodeAccessToken from '@/utils/supabase/decode-access-token';
import { ArrowRight, PawPrint } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = await decodeAccessToken(session?.access_token);

  return (
    <div className='flex min-h-screen flex-col max-w-screen-xl mx-auto'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link className='flex items-center justify-center' href='#'>
          <PawPrint className='mr-2' />
          <span className='font-bold text-xl'>Pawfice</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          {!!accessToken?.tenant_role &&
            ['owner', 'admin'].includes(accessToken.tenant_role) && (
              <Link
                className='text-sm font-medium hover:underline underline-offset-4'
                href='/dashboard'
              >
                Dashboard
              </Link>
            )}
          {session ? (
            <Link
              href='/auth/sign-out'
              className='text-sm font-medium hover:underline underline-offset-4'
            >
              Sign out
            </Link>
          ) : (
            <Link
              className='text-sm font-medium hover:underline underline-offset-4'
              href='/login'
            >
              Sign in
            </Link>
          )}
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <img
                src='/dashboard-screenshot.jpeg'
                width={550}
                height={550}
                alt='Pawfice dashboard preview'
                className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
              />
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <Link
                    className='inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm font-medium'
                    href='#'
                  >
                    How to streamline pet care operations
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Create effective solutions for pet care businesses.
                  </h1>
                  <p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Access all necessary tools for managing your pet boarding
                    and daycare business. Streamline operations, enhance
                    efficiency, and scale your pet care services.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90'>
                    Get Started
                  </Button>
                  <Button
                    className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
                    variant='outline'
                  >
                    Discover Our Platform
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='h-32 w-32 rounded-full overflow-hidden'>
                  <img
                    src='/placeholder.svg?height=128&width=128'
                    width={128}
                    height={128}
                    alt='Booking Management icon'
                    className='object-cover'
                  />
                </div>
                <h3 className='text-xl font-bold'>Booking Management</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Efficiently manage pet boarding reservations, schedules, and
                  occupancy rates.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='h-32 w-32 rounded-full overflow-hidden'>
                  <img
                    src='/placeholder.svg?height=128&width=128'
                    width={128}
                    height={128}
                    alt='Client Management icon'
                    className='object-cover'
                  />
                </div>
                <h3 className='text-xl font-bold'>Client Management</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Keep track of pet owners, their pets, and maintain detailed
                  service histories.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='h-32 w-32 rounded-full overflow-hidden'>
                  <img
                    src='/placeholder.svg?height=128&width=128'
                    width={128}
                    height={128}
                    alt='Financial Tools icon'
                    className='object-cover'
                  />
                </div>
                <h3 className='text-xl font-bold'>Financial Tools</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Handle billing, payments, and generate financial reports with
                  ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                    Simplify Your Pet Care Business
                  </h2>
                  <p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Pawfice provides an all-in-one solution for managing your
                    pet boarding and daycare business. From scheduling to
                    billing, we&apos;ve got you covered.
                  </p>
                </div>
                <ul className='grid gap-2 py-4'>
                  <li className='flex items-center'>
                    <ArrowRight className='mr-2 h-4 w-4' />
                    <span>Easy-to-use interface for staff and clients</span>
                  </li>
                  <li className='flex items-center'>
                    <ArrowRight className='mr-2 h-4 w-4' />
                    <span>Real-time updates and notifications</span>
                  </li>
                  <li className='flex items-center'>
                    <ArrowRight className='mr-2 h-4 w-4' />
                    <span>Comprehensive reporting and analytics</span>
                  </li>
                </ul>
                <div>
                  <Button className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90'>
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src='/placeholder.svg?height=550&width=550'
                width={550}
                height={550}
                alt='Pawfice features showcase'
                className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full'
              />
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 Pawfice. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    // <div className='flex flex-col gap-8'>
    //   <h1>Home page</h1>
    //   <p>Tenant id: {accessToken?.tenant_id}</p>
    //   <p>Tenant role: {accessToken?.tenant_role}</p>
    //   {session?.user ? (
    //     <>
    //       {session.user.email}
    //       <SignOutButton />
    //       {!!accessToken?.tenant_role &&
    //       ['owner', 'admin'].includes(accessToken.tenant_role) ? (
    //         <Link href='/dashboard'>Dashboard</Link>
    //       ) : (
    //         <Link href='/get-started'>Get started</Link>
    //       )}
    //       <pre>{JSON.stringify(accessToken, null, `\t`)}</pre>
    //       <pre>{JSON.stringify(session, null, `\t`)}</pre>
    //     </>
    //   ) : (
    //     <Link href='/login'>Sign in</Link>
    //   )}
    // </div>
  );
}
