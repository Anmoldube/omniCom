import { config } from 'dotenv';
config();

import '@/ai/flows/route-messages-via-appropriate-channel.ts';
import '@/ai/flows/summarize-conversation-history.ts';
import '@/ai/flows/suggest-contact-tags.ts';
import '@/ai/flows/suggest-replies.ts';
