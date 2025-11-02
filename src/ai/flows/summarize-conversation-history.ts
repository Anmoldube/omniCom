'use server';

/**
 * @fileOverview Summarizes the conversation history for a given contact.
 *
 * - summarizeConversationHistory - A function that summarizes the conversation history.
 * - SummarizeConversationHistoryInput - The input type for the summarizeConversationHistory function.
 * - SummarizeConversationHistoryOutput - The return type for the summarizeConversationHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationHistoryInputSchema = z.object({
  conversationHistory: z.string().describe('The complete conversation history with a contact.'),
});
export type SummarizeConversationHistoryInput = z.infer<
  typeof SummarizeConversationHistoryInputSchema
>;

const SummarizeConversationHistoryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the conversation history, highlighting key topics and sentiment.'
    ),
});
export type SummarizeConversationHistoryOutput = z.infer<
  typeof SummarizeConversationHistoryOutputSchema
>;

export async function summarizeConversationHistory(
  input: SummarizeConversationHistoryInput
): Promise<SummarizeConversationHistoryOutput> {
  return summarizeConversationHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationHistoryPrompt',
  input: {schema: SummarizeConversationHistoryInputSchema},
  output: {schema: SummarizeConversationHistoryOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing conversation histories.

  Given the following conversation history, please provide a concise summary, highlighting key topics discussed, the overall sentiment expressed, and any important action items or decisions made.

  Conversation History:
  {{conversationHistory}}

  Summary:`,
});

const summarizeConversationHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeConversationHistoryFlow',
    inputSchema: SummarizeConversationHistoryInputSchema,
    outputSchema: SummarizeConversationHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
