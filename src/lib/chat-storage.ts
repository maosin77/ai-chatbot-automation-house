import { UIMessage } from 'ai';
import { nanoid } from 'nanoid';

export interface StoredConversation {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationSummary {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

// Client-side storage using localStorage
export class ClientChatStorage {
  private static CONVERSATIONS_KEY = 'chatbot-conversations';
  private static CONVERSATION_PREFIX = 'chatbot-conv-';

  static loadConversation(id: string): StoredConversation | null {
    const stored = localStorage.getItem(`${this.CONVERSATION_PREFIX}${id}`);

    if (!stored) return null;

    try {
      const conversation = JSON.parse(stored) as StoredConversation; // TODO: use zod to validate it.
      // Convert date strings back to Date objects
      conversation.createdAt = new Date(conversation.createdAt);
      conversation.updatedAt = new Date(conversation.updatedAt);
      return conversation;
    } catch (error) {
      console.error('Error loading conversation:', error);
      return null;
    }
  }

  static saveConversation(
    id: string,
    messages: UIMessage[],
    title?: string
  ): void {
    const existing = this.loadConversation(id);

    // Generate title from first user message if not provided
    if (!title && messages.length > 0) {
      const firstUserMessage = messages.find((m) => m.role === 'user');
      if (firstUserMessage && firstUserMessage.parts) {
        const textPart = firstUserMessage.parts.find(
          (part) => part.type === 'text'
        );
        if (
          textPart &&
          'text' in textPart &&
          typeof textPart.text === 'string'
        ) {
          title =
            textPart.text.slice(0, 50) +
            (textPart.text.length > 50 ? '...' : '');
        }
      }
    }

    const conversation: StoredConversation = {
      messages,
      id,
      createdAt: existing?.createdAt ? new Date(existing.createdAt) : new Date(),
      title: title ?? 'Chat',
      updatedAt: new Date(),
    };

    localStorage.setItem(
      `${this.CONVERSATION_PREFIX}${id}`,
      JSON.stringify(conversation)
    );

    this.updateConversationInList(conversation);
  }

  static getConversationList(): ConversationSummary[] {
    const stored = localStorage.getItem(this.CONVERSATIONS_KEY);
    if (!stored) return [];

    try {
      const conversations = JSON.parse(stored) as ConversationSummary[]; // TODO: use zod to validate.
      return conversations.map((conv) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading conversation list:', error);
      return [];
    }
  }

  static deleteConversation(id: string): void {
    localStorage.removeItem(`${this.CONVERSATION_PREFIX}${id}`);

    // Update conversation list
    const conversations = this.getConversationList().filter(
      (conv) => conv.id !== id
    );
    localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
  }

  private static updateConversationInList(
    conversation: StoredConversation
  ): void {
    const conversations = this.getConversationList();
    const index = conversations.findIndex(
      (conv) => conv.id === conversation.id
    );

    const summary: ConversationSummary = {
      id: conversation.id,
      title: conversation.title,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      messageCount: conversation.messages.length,
    };

    if (index >= 0) {
      conversations[index] = summary;
    } else {
      conversations.unshift(summary);
    }

    // Sort by updatedAt descending
    conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
  }
}

// Server-side storage utilities (for API routes)
export const getChatFilePath = (id: string): string => {
  return `./conversations/${id}.json`;
};

export const generateChatId = (): string => {
  return nanoid();
};

export const validateUIMessages = (
  messages: unknown
): messages is UIMessage[] => {
  return (
    Array.isArray(messages) &&
    messages.every(
      (msg) =>
        msg &&
        typeof msg === 'object' &&
        'role' in msg &&
        ['user', 'assistant', 'system', 'tool'].includes(msg.role)
    )
  );
};

// Utility function to format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
};

