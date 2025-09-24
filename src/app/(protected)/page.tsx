'use client';

import { useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';

export default function HomePage() {
  const { navigateToChatDefault } = useNavigation();

  useEffect(() => {
    navigateToChatDefault();
  }, [navigateToChatDefault]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg text-muted-foreground">
        Redirecting to chat...
      </div>
    </div>
  );
}

