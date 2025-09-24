'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';

export const ProfileHeader = () => {
  const { navigateToChatDefault } = useNavigation();

  return (
    <header className="flex items-center gap-3 p-4 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigateToChatDefault()}
        className="h-8 w-8"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-lg font-semibold">Profile</h1>
    </header>
  );
};