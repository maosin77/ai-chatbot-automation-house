import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <LoginForm />;
}

