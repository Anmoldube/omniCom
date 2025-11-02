import type { Conversation, Contact, Message, User, Note } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getUserAvatar = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id) || { imageUrl: '', imageHint: '' };
};

export const MOCK_USER: User = {
  name: "Sarah Miller",
  email: "sarah.miller@omnicom.io",
  ...(() => {
    const { imageUrl, imageHint } = getUserAvatar('userAvatar1');
    return { avatarUrl: imageUrl, avatarHint: imageHint };
  })(),
};

const contacts: Contact[] = [
  {
    id: "contact-1",
    name: "Liam Johnson",
    ...(() => {
      const { imageUrl, imageHint } = getUserAvatar('contact1');
      return { avatarUrl: imageUrl, avatarHint: imageHint };
    })(),
    email: "liam.j@example.com",
    phone: "+1-202-555-0182",
    company: "Innovate Inc.",
    lastSeen: "2 hours ago",
  },
  {
    id: "contact-2",
    name: "Olivia Smith",
    ...(() => {
      const { imageUrl, imageHint } = getUserAvatar('contact2');
      return { avatarUrl: imageUrl, avatarHint: imageHint };
    })(),
    email: "olivia.s@example.com",
    phone: "+1-202-555-0149",
    company: "Solutions Corp.",
    lastSeen: "Online",
  },
  {
    id: "contact-3",
    name: "Noah Williams",
    ...(() => {
      const { imageUrl, imageHint } = getUserAvatar('contact3');
      return { avatarUrl: imageUrl, avatarHint: imageHint };
    })(),
    email: "noah.w@example.com",
    phone: "+1-202-555-0125",
    company: "Tech-Forward",
    lastSeen: "Yesterday",
  },
  {
    id: "contact-4",
    name: "Emma Brown",
    ...(() => {
      const { imageUrl, imageHint } = getUserAvatar('contact4');
      return { avatarUrl: imageUrl, avatarHint: imageHint };
    })(),
    email: "emma.b@example.com",
    phone: "+1-202-555-0198",
    company: "Synergy LLC",
    lastSeen: "3 days ago",
  },
    {
    id: "contact-5",
    name: "James Jones",
    ...(() => {
      const { imageUrl, imageHint } = getUserAvatar('contact5');
      return { avatarUrl: imageUrl, avatarHint: imageHint };
    })(),
    email: "james.j@example.com",
    phone: "+1-202-555-0174",
    company: "QuantumLeap",
    lastSeen: "5 minutes ago",
  },
];

const messages: Message[] = [
  // Conversation 1
  { id: "msg-1-1", contactId: "contact-1", channel: "whatsapp", content: "Hey! Just checking in on the project status. Any updates for me?", timestamp: "2024-05-23T10:30:00Z", isSender: false, isRead: true },
  { id: "msg-1-2", contactId: "contact-1", channel: "whatsapp", content: "Hi Liam! We're making great progress. The design phase is complete, and we are moving to development tomorrow.", timestamp: "2024-05-23T10:32:00Z", isSender: true, isRead: true },
  { id: "msg-1-3", contactId: "contact-1", channel: "whatsapp", content: "That's fantastic news! Can't wait to see the first build.", timestamp: "2024-05-23T10:33:00Z", isSender: false, isRead: true },

  // Conversation 2
  { id: "msg-2-1", contactId: "contact-2", channel: "sms", content: "Hi, I have a question about my recent invoice.", timestamp: "2024-05-23T11:00:00Z", isSender: false, isRead: true },
  { id: "msg-2-2", contactId: "contact-2", channel: "sms", content: "Hello Olivia, of course. I can help with that. What's the invoice number?", timestamp: "2024-05-23T11:01:00Z", isSender: true, isRead: true },
  { id: "msg-2-3", contactId: "contact-2", channel: "sms", content: "It's INV-0078. There seems to be a charge I don't recognize.", timestamp: "2024-05-23T11:02:00Z", isSender: false, isRead: false },

  // Conversation 3
  { id: "msg-3-1", contactId: "contact-3", channel: "email", content: "Subject: Following up on our call\n\nHi Noah,\n\nIt was great speaking with you earlier. As discussed, I've attached the proposal document for your review. Let me know if you have any questions.\n\nBest,\nSarah", timestamp: "2024-05-22T15:00:00Z", isSender: true, isRead: true },
  { id: "msg-3-2", contactId: "contact-3", channel: "email", content: "Subject: Re: Following up on our call\n\nHi Sarah,\n\nThanks for sending this over so quickly. I'll review it this afternoon and get back to you by end of day.\n\nCheers,\nNoah", timestamp: "2024-05-22T15:15:00Z", isSender: false, isRead: true },

  // Conversation 4
  { id: "msg-4-1", contactId: "contact-4", channel: "twitter", content: "@OmniComSupport Thanks for the quick response! Problem solved.", timestamp: "2024-05-21T09:00:00Z", isSender: false, isRead: true },
  { id: "msg-4-2", contactId: "contact-4", channel: "twitter", content: "You're very welcome, Emma! Glad we could help. Let us know if anything else comes up. #CustomerSupport", timestamp: "2024-05-21T09:05:00Z", isSender: true, isRead: true },

  // Conversation 5
  { id: "msg-5-1", contactId: "contact-5", channel: "facebook", content: "Our new product line just dropped! Check it out on our website. #NewArrivals", timestamp: "2024-05-23T12:00:00Z", isSender: false, isRead: false },
  { id: "msg-5-2", contactId: "contact-5", channel: "facebook", content: "Looks amazing! Is the blue one available in size M?", timestamp: "2024-05-23T12:05:00Z", isSender: false, isRead: false },

];

export const conversations: Conversation[] = contacts.map(contact => {
  const contactMessages = messages.filter(msg => msg.contactId === contact.id);
  return {
    id: `conv-${contact.id}`,
    contact: contact,
    messages: contactMessages,
    unreadCount: contactMessages.filter(msg => !msg.isSender && !msg.isRead).length
  };
}).sort((a, b) => {
    const lastMsgA = a.messages[a.messages.length - 1];
    const lastMsgB = b.messages[b.messages.length - 1];
    if (!lastMsgA || !lastMsgB) return 0;
    return new Date(lastMsgB.timestamp).getTime() - new Date(lastMsgA.timestamp).getTime();
});

export const getContactById = (id: string) => contacts.find(c => c.id === id);

export const notes: Note[] = [
    {
        id: 'note-1',
        author: 'Alex Green',
        authorAvatarUrl: 'https://picsum.photos/seed/alex/40/40',
        authorAvatarHint: 'man professional',
        content: '@Sarah Miller can you follow up on the invoice issue by EOD?',
        timestamp: '2 hours ago'
    },
    {
        id: 'note-2',
        author: MOCK_USER.name,
        authorAvatarUrl: MOCK_USER.avatarUrl,
        authorAvatarHint: MOCK_USER.avatarHint,
        content: 'Sure thing, @Alex Green. I will contact their accounting department right away.',
        timestamp: '1 hour ago'
    },
    {
        id: 'note-3',
        author: 'Alex Green',
        authorAvatarUrl: 'https://picsum.photos/seed/alex/40/40',
        authorAvatarHint: 'man professional',
        content: 'Client mentioned they are interested in upgrading to the Enterprise plan next quarter. Let\'s schedule a meeting.',
        timestamp: '3 days ago'
    }
];

export const analyticsData = {
    stats: [
        { label: 'Total Conversations', value: '1,423', change: '+12.5%', changeType: 'positive' as const },
        { label: 'Avg. Response Time', value: '1m 32s', change: '-5.2%', changeType: 'positive' as const },
        { label: 'Resolved', value: '94%', change: '+1.8%', changeType: 'positive' as const },
        { label: 'First Contact Resolution', value: '78%', change: '-2.1%', changeType: 'negative' as const },
    ],
    messagesChart: [
        { name: 'Jan', sms: 400, whatsapp: 240, email: 120 },
        { name: 'Feb', sms: 300, whatsapp: 139, email: 100 },
        { name: 'Mar', sms: 200, whatsapp: 980, email: 200 },
        { name: 'Apr', sms: 278, whatsapp: 390, email: 150 },
        { name: 'May', sms: 189, whatsapp: 480, email: 210 },
        { name: 'Jun', sms: 239, whatsapp: 380, email: 250 },
        { name: 'Jul', sms: 349, whatsapp: 430, email: 180 },
    ],
    responseTimeChart: [
        { date: '2024-05-01', 'Response Time': 120 },
        { date: '2024-05-02', 'Response Time': 110 },
        { date: '2024-05-03', 'Response Time': 115 },
        { date: '2024-05-04', 'Response Time': 98 },
        { date: '2024-05-05', 'Response Time': 92 },
        { date: '2024-05-06', 'Response Time': 95 },
        { date: '2024-05-07', 'Response Time': 88 },
    ]
};
