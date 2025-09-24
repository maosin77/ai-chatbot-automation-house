'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { ChatPromptInput } from '@/components/chat/PromptInput';
import { Messages } from '@/components/chat/messages/Messages';
import { ErrorDisplay } from '@/components/chat/ErrorDisplay';
import { useChatContext } from '@/contexts/ChatContext';

export const Chat = () => {
  const { messages, status, regenerate, error, handleSubmit } =
    useChatContext();

  return (
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
  );
};

