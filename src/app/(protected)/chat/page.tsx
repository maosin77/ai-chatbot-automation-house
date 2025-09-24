'use client';

import { Chat } from '@/components/chat/Chat';
import { ChatHeader } from '@/components/chat/ChatHeader';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-7rem)]">
          <Chat />
        </div>
      </div>
    </div>
  );
}