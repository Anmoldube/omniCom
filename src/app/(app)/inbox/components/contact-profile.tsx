import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Contact, Note } from '@/lib/types';
import { notes as mockNotes, MOCK_USER } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Phone, Building } from 'lucide-react';
import React from 'react';

type ContactProfileProps = {
  contact: Contact;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ContactProfile({ contact, isOpen, onOpenChange }: ContactProfileProps) {
    const [notes, setNotes] = React.useState<Note[]>(mockNotes);
    const [newNote, setNewNote] = React.useState('');

    const handleAddNote = () => {
        if (newNote.trim()) {
            const note: Note = {
                id: `note-${Date.now()}`,
                author: MOCK_USER.name,
                authorAvatarUrl: MOCK_USER.avatarUrl,
                authorAvatarHint: MOCK_USER.avatarHint,
                content: newNote.trim(),
                timestamp: 'Just now',
            };
            setNotes(prev => [note, ...prev]);
            setNewNote('');
        }
    };


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage asChild src={contact.avatarUrl}>
                <Image src={contact.avatarUrl} alt={contact.name} width={64} height={64} data-ai-hint={contact.avatarHint} />
              </AvatarImage>
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <SheetTitle className="font-headline text-2xl truncate">{contact.name}</SheetTitle>
              <SheetDescription className="truncate">{contact.company || 'No company'}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-2">Contact Details</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {contact.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> <span>{contact.email}</span></div>}
                {contact.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> <span>{contact.phone}</span></div>}
                {contact.company && <div className="flex items-center gap-2"><Building className="w-4 h-4" /> <span>{contact.company}</span></div>}
              </div>
            </div>
            
            <Separator />

            <div>
              <h4 className="text-sm font-semibold mb-4">Notes</h4>
              <div className="space-y-4">
                {notes.map(note => (
                    <div key={note.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage asChild src={note.authorAvatarUrl}>
                              <Image src={note.authorAvatarUrl} alt={note.author} width={32} height={32} data-ai-hint={note.authorAvatarHint}/>
                            </AvatarImage>
                            <AvatarFallback>{note.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm">{note.author}</p>
                                <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                            </div>
                            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: note.content.replace(/(@\w+)/g, '<strong class="text-accent-foreground font-medium">$&</strong>') }} />
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-6 border-t bg-background">
            <h4 className="text-sm font-semibold mb-2">Add a note</h4>
            <div className="space-y-3">
                <Textarea 
                    placeholder="Type your note here... Use @ to mention teammates." 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <Button onClick={handleAddNote} className="w-full" size="sm" disabled={!newNote.trim()}>Add Note</Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
