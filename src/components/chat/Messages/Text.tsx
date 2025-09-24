'use client';

import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { Fragment } from 'react';
import { UIMessageExtended } from './Messages';
import { AssistantActions } from './Assistant';

interface TextMessageProps {
  messageId: string;
  role: UIMessageExtended['role'];
  text: string;
  isLastAssistantMessage: boolean;
  onRegenerate: () => void;
}

export const TextMessage = ({
  messageId,
  role,
  text,
  isLastAssistantMessage,
  onRegenerate,
}: TextMessageProps) => {
  return (
    <Fragment key={messageId}>
      <Message from={role}>
        <MessageContent>
          <Response>{text}</Response>
        </MessageContent>
      </Message>
      {role === 'assistant' && isLastAssistantMessage && (
        <AssistantActions text={text} onRegenerate={onRegenerate} />
      )}
    </Fragment>
  );
};

