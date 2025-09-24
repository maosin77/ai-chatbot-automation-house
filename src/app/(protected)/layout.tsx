import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}