import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { ChannelIcon } from '@/components/channel-icon';

type ConversationListProps = {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
};

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredConversations = conversations.filter(convo => 
    convo.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <h2 className="text-xl font-headline font-semibold">Inbox</h2>
        <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search conversations..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {filteredConversations.map((convo) => {
            const lastMessage = convo.messages[convo.messages.length - 1];
            return (
              <button
                key={convo.id}
                onClick={() => onSelectConversation(convo.id)}
                className={cn(
                  'flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted',
                  selectedConversationId === convo.id && 'bg-muted'
                )}
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarImage asChild src={convo.contact.avatarUrl}>
                    <Image src={convo.contact.avatarUrl} alt={convo.contact.name} width={40} height={40} data-ai-hint={convo.contact.avatarHint} />
                  </AvatarImage>
                  <AvatarFallback>{convo.contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold truncate">{convo.contact.name}</p>
                    {lastMessage && (
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {lastMessage.content}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 self-center">
                    {lastMessage && <ChannelIcon channel={lastMessage.channel} className="text-muted-foreground" />}
                    {convo.unreadCount > 0 && (
                        <Badge variant="default" className="h-5 w-5 justify-center p-0 bg-primary text-primary-foreground">{convo.unreadCount}</Badge>
                    )}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
