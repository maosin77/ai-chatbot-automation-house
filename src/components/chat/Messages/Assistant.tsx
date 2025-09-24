'use client';

import { Action, Actions } from '@/components/ai-elements/actions';
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface AssistantActionsProps {
  text: string;
  onRegenerate: () => void;
}

export const AssistantActions = ({
  text,
  onRegenerate,
}: AssistantActionsProps) => {
  return (
    <Actions className="mt-2">
      <Action onClick={onRegenerate} label="Retry">
        <RefreshCcwIcon className="size-3" />
      </Action>
      <Action onClick={() => copyToClipboard(text)} label="Copy">
        <CopyIcon className="size-3" />
      </Action>
    </Actions>
  );
};

