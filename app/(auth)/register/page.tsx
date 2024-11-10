import RegisterForm from '@/app/(auth)/register/register-form';
import Link from 'next/link';

export default async function RegisterPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <RegisterForm />
      <p>
        Already have an account? <Link href='/login'>Sign in</Link>
      </p>
    </div>
  );
}
