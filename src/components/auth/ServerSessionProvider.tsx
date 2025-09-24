'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

interface ServerSessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const ServerSessionProvider = ({ children, session }: ServerSessionProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};