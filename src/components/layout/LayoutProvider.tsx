'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatProvider } from '@/contexts/ChatContext';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { ReactNode } from 'react';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutContent = ({ children }: LayoutProviderProps) => {
  const pathname = usePathname();

  // Simple path check - no auth logic needed since route groups handle it
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <ChatProvider>
      <SidebarProvider>
        <AppSidebar>{children}</AppSidebar>
      </SidebarProvider>
    </ChatProvider>
  );
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return <LayoutContent>{children}</LayoutContent>;
};

