import type { LucideIcon } from "lucide-react";

export type Channel = "sms" | "whatsapp" | "email" | "twitter" | "facebook";

export type Contact = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  email?: string;
  phone?: string;
  company?: string;
  lastSeen: string;
};

export type Message = {
  id: string;
  contactId: string;
  channel: Channel;
  content: string;
  timestamp: string;
  isSender: boolean;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  contact: Contact;
  messages: Message[];
  unreadCount: number;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
};

export type NavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
};

export type Note = {
  id: string;
  author: string;
  authorAvatarUrl: string;
  authorAvatarHint: string;
  content: string;
  timestamp: string;
};
