'use server';

/**
 * @fileOverview A flow to suggest replies to a message.
 *
 * - suggestReplies - A function that suggests replies to a message.
 * - SuggestRepliesInput - The input type for the suggestReplies function.
 * - SuggestRepliesOutput - The return type for the suggestReplies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRepliesInputSchema = z.object({
  lastMessage: z.string().describe('The last message in the conversation.'),
});
export type SuggestRepliesInput = z.infer<typeof SuggestRepliesInputSchema>;

const SuggestRepliesOutputSchema = z.object({
  replies: z.array(z.string()).describe('A list of 3 suggested replies.'),
});
export type SuggestRepliesOutput = z.infer<typeof SuggestRepliesOutputSchema>;

export async function suggestReplies(
  input: SuggestRepliesInput
): Promise<SuggestRepliesOutput> {
  return suggestRepliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRepliesPrompt',
  input: {schema: SuggestRepliesInputSchema},
  output: {schema: SuggestRepliesOutputSchema},
  prompt: `You are a helpful assistant that suggests concise and relevant replies to a message.
  
  Based on the following message, generate exactly 3 short reply options. The replies should be distinct from each other.

  Message: "{{lastMessage}}"

  Provide only the suggested replies in the required format.
  `,
});

const suggestRepliesFlow = ai.defineFlow(
  {
    name: 'suggestRepliesFlow',
    inputSchema: SuggestRepliesInputSchema,
    outputSchema: SuggestRepliesOutputSchema,
  },
  async input => {
    // Return empty replies if the last message is empty
    if (!input.lastMessage?.trim()) {
      return { replies: [] };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
