'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export function ChatHeader() {
  return (
    <header className="flex items-center gap-2 p-4 border-b">
      <SidebarTrigger />
    </header>
  );
}

