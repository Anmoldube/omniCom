import { MessageSquare, Mail } from 'lucide-react';
import type { Channel } from '@/lib/types';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.35 3.48 16.82L2 22L7.33 20.59C8.75 21.36 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM16.63 15.2C16.32 15.63 15.32 16.2 14.86 16.43C14.4 16.65 13.71 16.71 13.25 16.55C12.8 16.38 11.83 16.04 10.71 15.03C9.29 13.73 8.53 12.13 8.35 11.75C8.17 11.37 8.34 11.02 8.52 10.84C8.68 10.68 8.86 10.5 9.05 10.28C9.25 10.07 9.32 9.94 9.47 9.68C9.62 9.42 9.55 9.2 9.43 9.01C9.3 8.82 8.78 7.58 8.56 7.08C8.33 6.58 8.1 6.64 7.93 6.63C7.76 6.62 7.55 6.62 7.35 6.62C7.15 6.62 6.83 6.68 6.56 6.95C6.29 7.22 6.06 7.72 6.06 8.58C6.06 9.45 6.59 10.26 6.71 10.45C6.83 10.64 8.01 12.63 9.95 13.53C11.89 14.43 12.59 14.73 13.06 14.9C13.53 15.07 14.16 15.04 14.59 14.88C15.09 14.69 15.93 14.13 16.2 13.82C16.48 13.51 16.63 13.26 16.71 13.07C16.79 12.88 16.79 12.69 16.71 12.58C16.63 12.47 16.44 12.35 16.2 12.19C15.96 12.03 15.82 12.04 15.65 12.24C15.48 12.44 14.98 13.03 14.81 13.23C14.64 13.43 14.47 13.46 14.21 13.34C13.95 13.22 13.12 12.94 12.16 12.1C11.39 11.43 10.87 10.63 10.74 10.39C10.61 10.15 10.76 10 10.92 9.85C11.06 9.72 11.23 9.54 11.38 9.39C11.53 9.24 11.61 9.13 11.7 9.01C11.79 8.89 11.74 8.75 11.69 8.64C11.64 8.53 11.19 7.4 10.99 6.98C10.79 6.56 10.59 6.5 10.43 6.5C10.27 6.5 10.11 6.5 9.96 6.5Z"/>
    </svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.08 1150.3H895.476L569.165 687.854V687.828Z" fill="currentColor"/>
    </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.338 12.923H13.882V20.5H10.132V12.923H8.5V9.91H10.132V7.957C10.132 6.352 11.082 5.5 13.163 5.5L15.823 5.503V8.517H14.165C13.856 8.517 13.882 8.729 13.882 9.176L13.879 9.91H16.35L16.338 12.923Z"/>
    </svg>
);

const channelIcons: Record<Channel, React.ComponentType<{ className?: string }>> = {
  sms: MessageSquare,
  whatsapp: WhatsAppIcon,
  email: Mail,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
};

export const ChannelIcon = ({ channel, className }: { channel: Channel; className?: string }) => {
  const Icon = channelIcons[channel];
  if (!Icon) return null;
  return <Icon className={cn("h-4 w-4", className)} />;
};
