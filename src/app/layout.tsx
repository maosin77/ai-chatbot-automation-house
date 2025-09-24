import type { Metadata } from 'next';
import './globals.css';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { ServerSessionProvider } from '@/components/auth/ServerSessionProvider';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Chatbot-ai',
  description: 'Developed for Automation House',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="overflow-auto">
        <ServerSessionProvider session={session}>
          <LayoutProvider>{children}</LayoutProvider>
        </ServerSessionProvider>
      </body>
    </html>
  );
}

