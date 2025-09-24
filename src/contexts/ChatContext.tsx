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
import { usePathname } from 'next/navigation';
import { ChatStorage, ConversationSummary } from '@/lib/chat-storage';
import { nanoid } from 'nanoid';
import { useNavigation } from '@/hooks/useNavigation';
import { useSession } from 'next-auth/react';
import { convertBlobUrlsToDataUrls } from '@/lib/utils';

interface ChatContextType {
  conversations: ConversationSummary[] | undefined;
  refreshConversations: () => void;
  deleteConversation: (id: string) => void;
  loadConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
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
  const { data: session, status: sessionStatus } = useSession();
  const persistence = useChatPersistence();
  const pathname = usePathname();
  const { navigateToChat } = useNavigation();
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

  const renameConversation = useCallback(
    (conversationId: string, newTitle: string) => {
      const conversation = persistence.loadConversation(conversationId);
      if (conversation) {
        persistence.saveConversation(conversationId, conversation, newTitle);
      }
    },
    [persistence]
  );

  useEffect(() => {
    const syncUrlWithConversation = () => {
      // Only apply navigation logic on chat pages
      if (!pathname.startsWith('/chat')) {
        return;
      }

      // Extract conversation ID from pathname: /chat/[conversationId]
      const pathSegments = pathname.split('/');
      const urlConversationId = pathSegments[2]; // /chat/[conversationId]

      if (urlConversationId && urlConversationId !== id) {
        loadConversation(urlConversationId);
      } else if (!urlConversationId && pathname === '/chat') {
        // Only redirect if we're exactly on /chat without an ID
        navigateToChat(id);
      }
    };

    syncUrlWithConversation();
  }, [pathname, loadConversation, id, navigateToChat]);

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
    async (message: PromptInputMessage) => {
      if (!session) {
        console.warn('Cannot send messages - user not authenticated');
        return;
      }

      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      // Convert blob URLs to data URLs for files
      const processedFiles = message.files?.length
        ? await convertBlobUrlsToDataUrls(message.files)
        : message.files;

      sendMessage({
        text: message.text || 'Sent with attachments',
        files: processedFiles,
      });
    },
    [sendMessage, session]
  );

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      ChatStorage.clearSessionData(null);
      setMessages([]);
      // TODO: Add user notification about session-based storage behavior
      window.location.href = '/login';
    }
  }, [sessionStatus, setMessages]);

  useEffect(() => {
    const autoSaveMessages = () => {
      if (messages.length === 0) return;
      if (!session) return;

      const storedMessages = persistence.loadConversation(id);
      const hasNewMessages = storedMessages?.length !== messages.length;
      const isStableState = status === 'ready' || status === 'submitted';

      if (isStableState && hasNewMessages) {
        persistence.saveConversation(id, chat.messages);
      }
    };

    autoSaveMessages();
  }, [status, chat.messages, id, messages.length, persistence, session]);

  return (
    <ChatContext.Provider
      value={{
        conversations: persistence.conversations,
        refreshConversations: persistence.refreshConversations,
        deleteConversation,
        loadConversation,
        renameConversation,

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

