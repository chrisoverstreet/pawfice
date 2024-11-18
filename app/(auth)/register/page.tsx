import RegisterForm from '@/app/(auth)/register/register-form';
import Link from 'next/link';

export default async function RegisterPage() {
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden pb-2 pt-32'>
        <img
          src='https://www.shadcnblocks.com/images/block/block-1.svg'
          alt='logo'
          className='mb-4 h-10 w-auto'
        />
        <p className='text-2xl font-bold'>Register</p>
      </div>
      <div className='z-10 mx-auto w-full max-w-sm rounded-md bg-background px-6 py-12 shadow'>
        <div>
          <RegisterForm />
        </div>
      </div>
      <div className='mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground'>
        <p>Already have an account?</p>
        <Link href='/login' className='font-medium text-primary'>
          Sign in
        </Link>
      </div>
    </>
  );
}
