import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatProvider } from '@/contexts/ChatContext';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Chatbot-ai',
  description: 'Developed for Automation House',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatProvider>
            <SidebarProvider>
              <AppSidebar>{children}</AppSidebar>
            </SidebarProvider>
          </ChatProvider>
        </Suspense>
      </body>
    </html>
  );
}

