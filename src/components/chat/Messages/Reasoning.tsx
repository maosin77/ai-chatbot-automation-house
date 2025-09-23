'use client';

import {
  Reasoning,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';

interface ReasoningMessageProps {
  messageId: string;
  isStreaming: boolean;
}

export const ReasoningMessage = ({
  messageId,
  isStreaming,
}: ReasoningMessageProps) => {
  return (
    <Reasoning key={messageId} className="w-full" isStreaming={isStreaming}>
      <ReasoningTrigger />
    </Reasoning>
  );
};

