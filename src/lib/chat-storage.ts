import { UIMessage } from 'ai';
import { Session } from 'next-auth';
import {
  generateConversationTitle,
  parseStoredConversation,
  parseStoredConversationList,
} from './utils';

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

export class ChatStorage {
  private static getSessionKey(session: Session): string {
    const sessionId = session.user?.email || 'anonymous';
    return `chatbot-session-${sessionId}`;
  }

  private static isSessionExpired(session: Session): boolean {
    if (!session.expires) return false;
    return new Date() > new Date(session.expires);
  }

  private static validateSession(session: Session | null): session is Session {
    if (!session) return false;

    if (this.isSessionExpired(session)) {
      this.clearSessionData(session);
      return false;
    }

    return true;
  }

  static clearSessionData(session: Session | null): void {
    if (!session) {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('chatbot-'))
        .forEach((key) => localStorage.removeItem(key));
    } else {
      const sessionKey = this.getSessionKey(session);
      Object.keys(localStorage)
        .filter((key) => key.startsWith(sessionKey))
        .forEach((key) => localStorage.removeItem(key));
    }
  }

  static cleanupExpiredSessions(): void {
    Object.keys(localStorage)
      .filter((key) => key.includes('-expires'))
      .forEach((key) => {
        const expiry = localStorage.getItem(key);
        if (expiry && new Date() > new Date(expiry)) {
          const sessionPrefix = key.replace('-expires', '');
          Object.keys(localStorage)
            .filter((k) => k.startsWith(sessionPrefix))
            .forEach((k) => localStorage.removeItem(k));
        }
      });
  }

  static loadConversation(
    session: Session | null,
    id: string
  ): StoredConversation | null {
    if (!this.validateSession(session)) return null;

    const sessionKey = this.getSessionKey(session);
    const stored = localStorage.getItem(`${sessionKey}-conv-${id}`);

    if (!stored) return null;

    const conversation = parseStoredConversation(stored);
    if (!conversation) {
      console.error('Error loading conversation: Invalid JSON format');
      return null;
    }
    return conversation as unknown as StoredConversation;
  }

  static saveConversation(
    session: Session | null,
    id: string,
    messages: UIMessage[],
    title?: string
  ): void {
    if (!this.validateSession(session)) return;

    const sessionKey = this.getSessionKey(session);
    const existing = this.loadConversation(session, id);

    const conversation: StoredConversation = {
      messages,
      id,
      createdAt: existing?.createdAt
        ? new Date(existing.createdAt)
        : new Date(),
      title: title ?? generateConversationTitle(messages),
      updatedAt: new Date(),
    };

    localStorage.setItem(
      `${sessionKey}-conv-${id}`,
      JSON.stringify(conversation)
    );

    // Store session expiry
    if (session.expires) {
      localStorage.setItem(`${sessionKey}-expires`, session.expires.toString());
    }

    this.updateConversationInList(session, conversation);
  }

  static getConversationList(session: Session | null): ConversationSummary[] {
    if (!this.validateSession(session)) return [];

    const sessionKey = this.getSessionKey(session);
    const stored = localStorage.getItem(`${sessionKey}-conversations`);

    if (!stored) return [];

    const conversations = parseStoredConversationList(
      stored
    ) as unknown as ConversationSummary[];
    if (conversations.length === 0 && stored.trim() !== '[]') {
      console.error('Error loading conversation list: Invalid JSON format');
    }
    return conversations;
  }

  static deleteConversation(session: Session | null, id: string): void {
    if (!session) return;

    const sessionKey = this.getSessionKey(session);
    localStorage.removeItem(`${sessionKey}-conv-${id}`);

    // Update conversation list
    const conversations = this.getConversationList(session).filter(
      (conv) => conv.id !== id
    );
    localStorage.setItem(
      `${sessionKey}-conversations`,
      JSON.stringify(conversations)
    );
  }

  private static updateConversationInList(
    session: Session,
    conversation: StoredConversation
  ): void {
    const sessionKey = this.getSessionKey(session);
    const conversations = this.getConversationList(session);
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

    localStorage.setItem(
      `${sessionKey}-conversations`,
      JSON.stringify(conversations)
    );
  }
}

