'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { type PromptInputMessage } from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { ChatPromptInput } from '@/components/chat/PromptInput';
import { Messages } from '@/components/chat/Messages/Messages';
import { ErrorDisplay } from '@/components/chat/ErrorDisplay';
import type { UIMessageExtended } from '@/components/chat/Messages/Messages';
import { ChatStatus } from 'ai';

interface ChatProps {
  messages: UIMessageExtended[];
  status: ChatStatus;
  error: Error | null | undefined;
  onRegenerate: () => void;
  onSubmit: (message: PromptInputMessage) => void;
}

export const Chat = ({
  messages,
  status,
  error,
  onRegenerate,
  onSubmit,
}: ChatProps) => {
  return (
    <div className="flex flex-col h-full">
      <Conversation className="h-full">
        <ConversationContent>
          <Messages
            messages={messages}
            status={status}
            onRegenerate={onRegenerate}
          />
          {status === 'submitted' && <Loader />}
          {error && <ErrorDisplay error={error} />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <ChatPromptInput onSubmit={onSubmit} status={status} className="mt-4" />
    </div>
  );
};

