import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UIMessage } from 'ai';
import { nanoid } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

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

export const generateConversationTitle = (messages: UIMessage[]): string => {
  if (messages.length === 0) return 'Chat';

  const firstUserMessage = messages.find((m) => m.role === 'user');
  if (!firstUserMessage?.parts) return 'Chat';

  const textPart = firstUserMessage.parts.find((part) => part.type === 'text');

  if (!textPart || !('text' in textPart) || typeof textPart.text !== 'string') {
    return 'Chat';
  }

  const text = textPart.text;
  return text.slice(0, 50) + (text.length > 50 ? '...' : '');
};

export const parseStoredConversation = (
  stored: string
): Record<string, unknown> | null => {
  try {
    const parsed = JSON.parse(stored);
    // TODO: add more robust parsing & typeguard
    if (parsed.createdAt) parsed.createdAt = new Date(parsed.createdAt);
    if (parsed.updatedAt) parsed.updatedAt = new Date(parsed.updatedAt);
    return parsed;
  } catch {
    return null;
  }
};

export const parseStoredConversationList = (
  stored: string
): Record<string, unknown>[] => {
  try {
    const conversations = JSON.parse(stored);
    return Array.isArray(conversations)
      ? conversations.map((conv) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
        }))
      : [];
  } catch {
    return [];
  }
};

