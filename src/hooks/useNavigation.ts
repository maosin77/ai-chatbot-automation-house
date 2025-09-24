'use client';

import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export const navigationRoutes = {
  chat: {
    withId: (conversationId: string) => `?conversationId=${conversationId}`,
    new: () => `?conversationId=${nanoid()}`,
  },
} as const;

export const useNavigation = () => {
  const router = useRouter();

  const navigateToChat = (conversationId: string) => {
    router.push(navigationRoutes.chat.withId(conversationId));
  };

  const navigateToNewChat = () => {
    router.push(navigationRoutes.chat.new());
  };

  return {
    navigateToChat,
    navigateToNewChat,
  };
};

