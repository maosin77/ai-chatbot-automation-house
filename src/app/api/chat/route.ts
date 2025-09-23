import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();

  const result = streamText({
    model: openai('gpt-5-nano'),
    messages: convertToModelMessages(messages),
    tools: {
      web_search: openai.tools.webSearch({
        searchContextSize: 'low',
      }),
    },
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
  });

  return result.toUIMessageStreamResponse();
}

