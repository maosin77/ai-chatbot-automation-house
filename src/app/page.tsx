'use client';

import { type PromptInputMessage } from '@/components/ai-elements/prompt-input';
import { useChat } from '@ai-sdk/react';
import { Chat } from '@/components/chat/Chat';

const ChatBotDemo = () => {
  const { messages, sendMessage, status, regenerate, error } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || 'Sent with attachments',
      files: message.files,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <Chat
        messages={messages}
        status={status}
        error={error}
        onRegenerate={regenerate}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBotDemo;

