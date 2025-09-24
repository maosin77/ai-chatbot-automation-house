'use client';

import { UIDataTypes, UIMessage, UITools } from 'ai';
import { SourcesMessage } from './Sources';
import { TextMessage } from './Text';
import { ReasoningMessage } from './Reasoning';
import { FileMessage } from './File';

export type UIMessageExtended = UIMessage<unknown, UIDataTypes, UITools>;

interface MessagesProps {
  messages: UIMessageExtended[];
  status: string;
  onRegenerate: () => void;
}

export const Messages = ({ messages, status, onRegenerate }: MessagesProps) => {
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <SourcesMessage message={message} />
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return (
                  <TextMessage
                    key={`${message.id}-${index}`}
                    messageId={`${message.id}-${index}`}
                    role={message.role}
                    text={part.text}
                    isLastAssistantMessage={
                      message.role === 'assistant' &&
                      index === messages.length - 1
                    }
                    onRegenerate={onRegenerate}
                  />
                );
              case 'reasoning':
                return (
                  <ReasoningMessage
                    key={`${message.id}-${index}`}
                    messageId={`${message.id}-${index}`}
                    isStreaming={
                      status === 'streaming' &&
                      index === message.parts.length - 1 &&
                      message.id === messages.at(-1)?.id
                    }
                  />
                );
              case 'file':
                return (
                  <FileMessage
                    key={`${message.id}-${index}`}
                    messageId={`${message.id}-${index}`}
                    part={part}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </>
  );
};

