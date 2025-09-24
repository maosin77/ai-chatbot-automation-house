'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ClientChatStorage } from '@/lib/chat-storage';

interface ConversationMenuProps {
  conversationId: string;
  currentTitle: string;
  onDelete: (event: React.MouseEvent) => void;
  onUpdate: () => void;
}

export function ConversationMenu({
  conversationId,
  currentTitle,
  onDelete,
  onUpdate,
}: ConversationMenuProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== currentTitle) {
      try {
        const conversation = ClientChatStorage.loadConversation(
          conversationId
        );
        if (conversation) {
          ClientChatStorage.saveConversation(
            conversationId,
            conversation.messages,
            newTitle.trim()
          );
          onUpdate();
        }
      } catch (error) {
        console.error('Error renaming conversation:', error);
      }
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewTitle(currentTitle);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    // TODO: use dialog here.
    return (
      <div className="flex-1 min-w-0 px-2">
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyPress}
          className="h-6 text-sm"
          autoFocus
        />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 flex-shrink-0 cursor-pointer"
        >
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 ">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="flex items-center gap-2 cursor-pointer "
        >
          <Edit2 className="h-4 w-4 " />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer "
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

