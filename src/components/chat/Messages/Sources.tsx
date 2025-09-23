'use client';

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import type { UIMessageExtended } from './Messages';

interface SourcesMessageProps {
  message: UIMessageExtended;
}

export const SourcesMessage = ({ message }: SourcesMessageProps) => {
  const sourceUrls = message.parts.filter((part) => part.type === 'source-url');

  if (message.role !== 'assistant' || sourceUrls.length === 0) {
    return null;
  }

  return (
    <Sources>
      <SourcesTrigger count={sourceUrls.length} />
      {sourceUrls.map((part, index) => (
        <SourcesContent key={`${message.id}-${index}`}>
          <Source
            key={`${message.id}-${index}`}
            href={part.url}
            title={part.url}
          />
        </SourcesContent>
      ))}
    </Sources>
  );
};