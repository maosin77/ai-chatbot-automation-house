'use client';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatContext } from '@/contexts/ChatContext';
import { ConversationItem } from './ConversationItem';
import { ConversationMenu } from './ConversationMenu';
import { useNavigation } from '@/hooks/useNavigation';

export function ConversationHistory() {
  const { conversations, id } = useChatContext();
  const { navigateToChat, navigateToNewChat } = useNavigation();

  const handleNewConversation = () => {
    navigateToNewChat();
  };

  const onSelectConversation = (id: string) => {
    navigateToChat(id);
  };

  if (!conversations) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading conversations...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="px-2">
        <Button
          onClick={handleNewConversation}
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <SidebarMenu>
        {conversations.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No conversations yet.
            <br />
            Start a new chat to begin!
          </div>
        ) : (
          conversations.map((conversation) => (
            // TODO: Consider pagination
            <SidebarMenuItem key={conversation.id} className="group">
              <div className="relative flex items-start gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer group">
                <ConversationItem
                  conversation={conversation}
                  isSelected={id === conversation.id}
                  onSelect={onSelectConversation}
                />
                <ConversationMenu conversation={conversation} />
              </div>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </div>
  );
}

