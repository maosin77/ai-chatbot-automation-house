'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { type PromptInputMessage } from '@/components/ai-elements/prompt-input';
import { useChat } from '@ai-sdk/react';
import { Loader } from '@/components/ai-elements/loader';
import { ChatPromptInput } from '@/components/chat/PromptInput';
import { Messages } from '@/components/chat/Messages/Messages';
import { ErrorDisplay } from '@/components/chat/ErrorDisplay';

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
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            <Messages
              messages={messages}
              status={status}
              onRegenerate={regenerate}
            />
            {status === 'submitted' && <Loader />}
            {error && <ErrorDisplay error={error} />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <ChatPromptInput
          onSubmit={handleSubmit}
          status={status}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ChatBotDemo;

