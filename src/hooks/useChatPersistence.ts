import { useState, useCallback, useEffect, useMemo } from 'react';
import { UIMessage } from 'ai';
import { ClientChatStorage, ConversationSummary } from '@/lib/chat-storage';

interface UseChatPersistenceReturn {
  conversations: ConversationSummary[] | undefined;
  refreshConversations: () => void;
  deleteConversation: (id: string) => void;
  loadConversation: (id: string) => UIMessage[] | undefined;
  saveConversation: (id: string, messages: UIMessage[]) => void;
}

export function useChatPersistence(): UseChatPersistenceReturn {
  const [conversations, setConversations] = useState<
    ConversationSummary[] | undefined
  >(undefined);

  const refreshConversations = useCallback(() => {
    try {
      const conversationList = ClientChatStorage.getConversationList();
      setConversations(conversationList);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      try {
        ClientChatStorage.deleteConversation(id);
        refreshConversations();
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    },
    [refreshConversations]
  );

  const loadConversation = useCallback((id: string) => {
    try {
      const conversation = ClientChatStorage.loadConversation(id);
      return conversation?.messages;
    } catch (error) {
      console.error('Error loading conversation:', error);
      return undefined;
    }
  }, []);

  const saveConversation = useCallback(
    (id: string, messages: UIMessage[]) => {
      try {
        ClientChatStorage.saveConversation(id, messages);
        refreshConversations();
      } catch (error) {
        console.error('Error saving conversation:', error);
      }
    },
    [refreshConversations]
  );

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

