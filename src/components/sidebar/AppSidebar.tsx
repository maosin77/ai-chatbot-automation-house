'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { ConversationHistory } from './ConversationHistory';

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">AI Chatbot</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
            <ConversationHistory />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="text-sm text-muted-foreground">Automation House</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}

