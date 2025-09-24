import { useState, useCallback, useEffect, useMemo } from 'react';
import { UIMessage } from 'ai';
import { ChatStorage, ConversationSummary } from '@/lib/chat-storage';
import { useSession } from 'next-auth/react';

interface UseChatPersistenceReturn {
  conversations: ConversationSummary[] | undefined;
  refreshConversations: () => void;
  deleteConversation: (id: string) => void;
  loadConversation: (id: string) => UIMessage[] | undefined;
  saveConversation: (id: string, messages: UIMessage[], title?: string) => void;
}

export function useChatPersistence(): UseChatPersistenceReturn {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<
    ConversationSummary[] | undefined
  >(undefined);

  const refreshConversations = useCallback(() => {
    try {
      const conversationList = ChatStorage.getConversationList(session);
      setConversations(conversationList);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, [session]);

  const deleteConversation = useCallback(
    (id: string) => {
      try {
        ChatStorage.deleteConversation(session, id);
        refreshConversations();
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    },
    [session, refreshConversations]
  );

  const loadConversation = useCallback(
    (id: string) => {
      try {
        const conversation = ChatStorage.loadConversation(session, id);
        return conversation?.messages;
      } catch (error) {
        console.error('Error loading conversation:', error);
        return undefined;
      }
    },
    [session]
  );

  const saveConversation = useCallback(
    (id: string, messages: UIMessage[], title?: string) => {
      try {
        ChatStorage.saveConversation(session, id, messages, title);
        refreshConversations();
      } catch (error) {
        console.error('Error saving conversation:', error);
      }
    },
    [session, refreshConversations]
  );


  // Clean up expired sessions on mount
  useEffect(() => {
    ChatStorage.cleanupExpiredSessions();
  }, []);

  // Refresh conversations when session changes
  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  return useMemo(
    () => ({
      conversations,
      refreshConversations,
      deleteConversation,
      loadConversation,
      saveConversation,
    }),
    [
      conversations,
      refreshConversations,
      deleteConversation,
      loadConversation,
      saveConversation,
    ]
  );
}

