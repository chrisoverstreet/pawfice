import LoginForm from '@/app/(auth)/login/login-form';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='relative flex flex-col items-center overflow-hidden pb-2 pt-32'>
          <img
            src='https://www.shadcnblocks.com/images/block/block-1.svg'
            alt='logo'
            className='mb-4 h-10 w-auto'
          />
          <p className='text-2xl font-bold'>Login</p>
        </div>
        <div className='z-10 mx-auto w-full max-w-sm rounded-md bg-background px-6 py-12 shadow'>
          <div>
            <LoginForm />
          </div>
        </div>
        <div className='mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground'>
          <p>Don&apos;t have an account?</p>
          <Link href='/register' className='font-medium text-primary'>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
