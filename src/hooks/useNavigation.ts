'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { nanoid } from 'nanoid';

export const navigationRoutes = {
  chat: {
    withId: (conversationId: string) => `/chat/${conversationId}`,
    new: () => `/chat/${nanoid()}`,
    default: () => '/chat',
  },
  profile: () => '/profile',
  home: () => '/',
} as const;

export const useNavigation = () => {
  const router = useRouter();

  const navigateToChat = useCallback((conversationId: string) => {
    router.push(navigationRoutes.chat.withId(conversationId));
  }, [router]);

  const navigateToNewChat = useCallback(() => {
    router.push(navigationRoutes.chat.new());
  }, [router]);

  const navigateToChatDefault = useCallback(() => {
    router.push(navigationRoutes.chat.default());
  }, [router]);

  const navigateToProfile = useCallback(() => {
    router.push(navigationRoutes.profile());
  }, [router]);

  const navigateToHome = useCallback(() => {
    router.push(navigationRoutes.home());
  }, [router]);

  return {
    navigateToChat,
    navigateToNewChat,
    navigateToChatDefault,
    navigateToProfile,
    navigateToHome,
  };
};

