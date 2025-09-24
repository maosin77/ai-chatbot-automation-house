'use client';

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useChat as useAiChat } from '@ai-sdk/react';
import { ChatStatus, UIMessage } from 'ai';
import { PromptInputMessage } from '@/components/ai-elements/prompt-input';
import { useChatPersistence } from '@/hooks/useChatPersistence';
import { useSearchParams } from 'next/navigation';
import { ConversationSummary } from '@/lib/chat-storage';
import { nanoid } from 'nanoid';
import { useChatNavigation } from '@/lib/navigation';

interface ChatContextType {
  conversations: ConversationSummary[] | undefined;
  refreshConversations: () => void;
  deleteConversation: (id: string) => void;
  loadConversation: (id: string) => void;
  messages: UIMessage[];
  status: ChatStatus;
  error: Error | null | undefined;
  setMessages: (messages: UIMessage[]) => void;
  handleSubmit: (message: PromptInputMessage) => void;
  regenerate: () => void;
  id: string;
  handleChangeConversationId: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const persistence = useChatPersistence();
  const searchParams = useSearchParams();
  const { navigateToChat } = useChatNavigation();
  const [conversationId, setConversationId] = useState(nanoid());
  const handleChangeConversationId = (id: string) => {
    setConversationId(id);
  };
  const chat = useAiChat({
    id: conversationId,
  });
  const { id, setMessages, sendMessage, messages, status, error } = chat;

  const deleteConversation = useCallback(
    (idToDelete: string) => {
      persistence.deleteConversation(idToDelete);
    },
    [persistence]
  );

  const loadConversation = useCallback((id: string) => {
    handleChangeConversationId(id);
  }, []);

  useEffect(() => {
    const syncUrlWithConversation = () => {
      const urlConversationId = searchParams.get('conversationId');
      if (urlConversationId && urlConversationId !== id) {
        loadConversation(urlConversationId);
      } else if (!urlConversationId) {
        navigateToChat(id);
      }
    };

    syncUrlWithConversation();
  }, [searchParams, loadConversation, id, navigateToChat]);

  useEffect(() => {
    const loadStoredMessages = () => {
      const storedMessages = persistence.loadConversation(id);
      if (storedMessages) {
        setMessages(storedMessages);
      }
    };

    loadStoredMessages();
  }, [id, persistence.loadConversation, setMessages, persistence]);

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      sendMessage({
        text: message.text || 'Sent with attachments',
        files: message.files,
      });
    },
    [sendMessage]
  );

  useEffect(() => {
    const autoSaveMessages = () => {
      if (messages.length === 0) return;

      const storedMessages = persistence.loadConversation(id);
      const hasNewMessages = storedMessages?.length !== messages.length;
      const isStableState = status === 'ready' || status === 'submitted';

      if (isStableState && hasNewMessages) {
        persistence.saveConversation(id, chat.messages);
      }
    };

    autoSaveMessages();
  }, [status, chat.messages, id, messages.length, persistence]);

  return (
    <ChatContext.Provider
      value={{
        conversations: persistence.conversations,
        refreshConversations: persistence.refreshConversations,
        deleteConversation,
        loadConversation,

        messages,
        status,
        error,
        setMessages: chat.setMessages,
        regenerate: chat.regenerate,
        id,
        handleSubmit,
        handleChangeConversationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

