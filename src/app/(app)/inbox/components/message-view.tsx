'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Paperclip, Send, Smile, User, Info, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/lib/data';
import { ChannelIcon } from '@/components/channel-icon';
import { ContactProfile } from './contact-profile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { suggestReplies } from '@/ai/flows/suggest-replies';

type MessageViewProps = {
  conversation: Conversation | null;
  onNewMessage: (conversationId: string, message: string) => void;
};

export function MessageView({ conversation, onNewMessage }: MessageViewProps) {
  const [message, setMessage] = React.useState('');
  const [isProfileOpen, setProfileOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [conversation]);

  React.useEffect(() => {
    const getSuggestions = async () => {
      if (conversation && conversation.messages.length > 0) {
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage.isSender) {
          setIsLoadingSuggestions(true);
          setSuggestions([]);
          try {
            const result = await suggestReplies({ lastMessage: lastMessage.content });
            setSuggestions(result.replies);
          } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
          } finally {
            setIsLoadingSuggestions(false);
          }
        } else {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    getSuggestions();
  }, [conversation]);


  const handleSendMessage = () => {
    if (message.trim() && conversation) {
      onNewMessage(conversation.id, message.trim());
      setMessage('');
      setSuggestions([]);
    }
  };

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-card">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5.22c0-1.81-1.5-3.22-3-3.22-1.5 0-2.75-1.06-4-1.06-3 0-6 8-6 12.22A4.91 4.91 0 0 0 7 18.78c0 1.81 1.5 3.22 3 3.22Z"/></svg>
            <h3 className="mt-4 text-lg font-semibold font-headline">Select a Conversation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Choose a conversation from the left panel to start chatting.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4 border-b bg-background px-4 py-3">
        <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-9 w-9 border">
              <AvatarImage asChild src={conversation.contact.avatarUrl}>
                <Image src={conversation.contact.avatarUrl} alt={conversation.contact.name} width={36} height={36} data-ai-hint={conversation.contact.avatarHint} />
              </AvatarImage>
              <AvatarFallback>{conversation.contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{conversation.contact.name}</p>
              <p className="text-xs text-muted-foreground">{conversation.contact.lastSeen}</p>
            </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setProfileOpen(true)}>
            <Info className="h-5 w-5" />
            <span className="sr-only">Contact Info</span>
        </Button>
      </header>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-3',
                msg.isSender && 'flex-row-reverse'
              )}
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage asChild src={msg.isSender ? MOCK_USER.avatarUrl : conversation.contact.avatarUrl}>
                  <Image src={msg.isSender ? MOCK_USER.avatarUrl : conversation.contact.avatarUrl} alt="Avatar" width={32} height={32} data-ai-hint={msg.isSender ? MOCK_USER.avatarHint : conversation.contact.avatarHint} />
                </AvatarImage>
                <AvatarFallback>{msg.isSender ? MOCK_USER.name.charAt(0) : conversation.contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 text-sm',
                  msg.isSender
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted rounded-bl-none'
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ChannelIcon channel={msg.channel} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Sent via {msg.channel}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <span>{format(new Date(msg.timestamp), 'p')}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4 space-y-3">
        {(isLoadingSuggestions || suggestions.length > 0) && (
            <div className="flex items-center gap-2 flex-wrap">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                {isLoadingSuggestions ? (
                    <>
                        <Button variant="outline" size="sm" className="opacity-50" disabled>Loading...</Button>
                        <Button variant="outline" size="sm" className="opacity-50 hidden sm:inline-flex" disabled>Loading...</Button>
                    </>
                ) : (
                    suggestions.map((suggestion, i) => (
                        <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            onClick={() => setMessage(suggestion)}
                            className="text-left"
                        >
                            {suggestion}
                        </Button>
                    ))
                )}
            </div>
        )}
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="pr-28 min-h-[48px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Attach file</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Add emoji</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
      <ContactProfile contact={conversation.contact} isOpen={isProfileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
}
