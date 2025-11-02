'use server';
/**
 * @fileOverview This file defines a Genkit flow for routing messages via the appropriate channel (SMS, WhatsApp, Email, etc.).
 *
 * - routeMessage - A function that handles the message routing process.
 * - RouteMessageInput - The input type for the routeMessage function.
 * - RouteMessageOutput - The return type for the routeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteMessageInputSchema = z.object({
  recipient: z.string().describe('The recipient of the message (e.g., phone number or email address).'),
  message: z.string().describe('The content of the message to be sent.'),
  preferredChannel: z.enum(['sms', 'whatsapp', 'email']).optional().describe('The user\'s preferred channel, if any.'),
});
export type RouteMessageInput = z.infer<typeof RouteMessageInputSchema>;

const RouteMessageOutputSchema = z.object({
  channel: z.enum(['sms', 'whatsapp', 'email']).describe('The channel through which the message was routed.'),
  messageId: z.string().describe('The ID of the sent message.'),
});
export type RouteMessageOutput = z.infer<typeof RouteMessageOutputSchema>;

export async function routeMessage(input: RouteMessageInput): Promise<RouteMessageOutput> {
  return routeMessageFlow(input);
}

const determineChannelPrompt = ai.definePrompt({
  name: 'determineChannelPrompt',
  input: {schema: RouteMessageInputSchema},
  output: {schema: z.object({channel: z.enum(['sms', 'whatsapp', 'email']).describe('The determined channel for sending the message.')})},
  prompt: `You are an intelligent routing system that determines the best channel to send a message to a recipient.

You have the following information about the recipient and the message:
- Recipient: {{{recipient}}}
- Message: {{{message}}}
- Preferred Channel (if any): {{{preferredChannel}}}

Consider the following factors when determining the channel:
- User preference: If the user has a preferred channel, use that channel.
- Recipient availability: If the preferred channel is not available, use an alternative channel.
- Message content: If the message contains media, use a channel that supports media.

Based on this information, determine the best channel to send the message. Respond only with the name of the Channel. Valid options are: sms, whatsapp, email.
`,
});

const routeMessageFlow = ai.defineFlow(
  {
    name: 'routeMessageFlow',
    inputSchema: RouteMessageInputSchema,
    outputSchema: RouteMessageOutputSchema,
  },
  async input => {
    const {output: {channel}} = await determineChannelPrompt(input);

    // TODO: Implement the logic to send the message through the determined channel.
    // This will involve using the appropriate channel integration (Twilio for SMS/WhatsApp, Resend for Email, etc.).
    // For now, we'll just return a dummy message ID.
    const messageId = 'dummy-message-id-' + Math.random().toString(36).substring(7);

    return {
      channel: channel,
      messageId: messageId,
    };
  }
);
