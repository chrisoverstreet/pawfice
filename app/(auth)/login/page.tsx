import LoginForm from '@/app/(auth)/login/login-form';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Don&apos;t have an account? <Link href='/register'>Sign up</Link>
      </p>
    </div>
  );
}
