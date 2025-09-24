import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import { validateUIMessages } from '@/lib/utils';

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();

  if (!validateUIMessages(messages)) {
    return new Response('Invalid messages format', { status: 400 });
  }

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
    tools: {
      web_search: openai.tools.webSearch({
        searchContextSize: 'low',
      }),
    },
    system:
      'You are a helpful assistant that can analyze images, documents, and answer questions',
  });

  return result.toUIMessageStreamResponse();
}

