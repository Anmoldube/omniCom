'use server';

/**
 * @fileOverview A flow to suggest relevant tags or categories for a contact based on their information.
 *
 * - suggestContactTags - A function that suggests tags for a contact.
 * - SuggestContactTagsInput - The input type for the suggestContactTags function.
 * - SuggestContactTagsOutput - The return type for the suggestContactTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContactTagsInputSchema = z.object({
  name: z.string().optional().describe('The name of the contact.'),
  company: z.string().optional().describe('The company the contact works for.'),
  email: z.string().optional().describe('The email address of the contact.'),
});
export type SuggestContactTagsInput = z.infer<typeof SuggestContactTagsInputSchema>;

const SuggestContactTagsOutputSchema = z.object({
  tags: z.array(
    z.string().describe('A suggested tag or category for the contact.')
  ).describe('A list of suggested tags for the contact based on their information.'),
});
export type SuggestContactTagsOutput = z.infer<typeof SuggestContactTagsOutputSchema>;

export async function suggestContactTags(input: SuggestContactTagsInput): Promise<SuggestContactTagsOutput> {
  return suggestContactTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContactTagsPrompt',
  input: {schema: SuggestContactTagsInputSchema},
  output: {schema: SuggestContactTagsOutputSchema},
  prompt: `You are a helpful assistant that suggests relevant tags or categories for a contact based on the provided information.

  Consider the contact's name, company, and email address to generate a list of tags that would be useful for categorizing the contact.

  Name: {{name}}
  Company: {{company}}
  Email: {{email}}

  Suggest at least 3 tags.
  `,
});

const suggestContactTagsFlow = ai.defineFlow(
  {
    name: 'suggestContactTagsFlow',
    inputSchema: SuggestContactTagsInputSchema,
    outputSchema: SuggestContactTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
