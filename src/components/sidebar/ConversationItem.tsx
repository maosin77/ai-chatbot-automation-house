'use client';

import { MessageSquare, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/chat-storage';

interface ConversationItemProps {
  conversation: {
    id: string;
    title: string;
    updatedAt: Date;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  return (
    <div
      onClick={() => {
        onSelect(conversation.id);
      }}
      className={`flex items-center gap-2 flex-1 min-w-0 ${
        isSelected ? 'text-accent-foreground' : ''
      }`}
    >
      <MessageSquare className="h-4 w-4 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{conversation.title}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3" />
          {formatRelativeTime(conversation.updatedAt)}
        </div>
      </div>
    </div>
  );
}

