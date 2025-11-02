'use client';

import React from 'react';
import { ConversationList } from './components/conversation-list';
import { MessageView } from './components/message-view';
import type { Conversation } from '@/lib/types';
import { conversations as mockConversations } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function InboxPage() {
  const [conversations, setConversations] = React.useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(conversations[0] || null);

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
  };
  
  const handleNewMessage = (conversationId: string, messageContent: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      contactId: selectedConversation!.contact.id,
      channel: selectedConversation!.messages[selectedConversation!.messages.length - 1].channel,
      content: messageContent,
      timestamp: new Date().toISOString(),
      isSender: true,
      isRead: true,
    };

    setConversations(prev => {
      const newConversations = prev.map(convo => {
        if (convo.id === conversationId) {
          return { ...convo, messages: [...convo.messages, newMessage] };
        }
        return convo;
      });

      // Move updated conversation to the top
      const updatedConvoIndex = newConversations.findIndex(c => c.id === conversationId);
      if (updatedConvoIndex > 0) {
        const [updatedConvo] = newConversations.splice(updatedConvoIndex, 1);
        newConversations.unshift(updatedConvo);
      }
      return newConversations;
    });

    setSelectedConversation(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-full">
            <div className="flex flex-col h-full border-r">
                <ConversationList
                    conversations={conversations}
                    selectedConversationId={selectedConversation?.id}
                    onSelectConversation={handleSelectConversation}
                />
            </div>
            <div className="flex flex-col h-full bg-card">
                <MessageView
                    conversation={selectedConversation}
                    onNewMessage={handleNewMessage}
                />
            </div>
        </div>
    </div>
  );
}
