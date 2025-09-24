'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/auth/UserMenu';

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between gap-2 p-4 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">AI Chat</h1>
      </div>
      <UserMenu />
    </header>
  );
}

