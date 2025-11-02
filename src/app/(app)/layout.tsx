'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Inbox,
  Users,
  BarChart3,
  Settings,
  CircleHelp,
  Moon,
  Sun,
} from 'lucide-react';
import type { NavItem } from '@/lib/types';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';

const navItems: NavItem[] = [
  { href: '/inbox', title: 'Inbox', icon: Inbox },
  { href: '/contacts', title: 'Contacts', icon: Users },
  { href: '/analytics', title: 'Analytics', icon: BarChart3 },
  { href: '/integrations', title: 'Integrations', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Simulate checking authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push('/login');
    }
  }, [router]);

  // A simple theme toggle implementation
  const [theme, setTheme] = React.useState('light');
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  if (isAuthenticated === null) {
    // You can render a loading spinner here
    return null;
  }
  
  if (!isAuthenticated) {
    // This will be handled by the redirect, but as a fallback
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-sidebar-border">
        <SidebarHeader>
          <Logo className="p-2 hidden group-data-[state=expanded]:block" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  href={item.href}
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.title}
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <CircleHelp />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleTheme} tooltip="Toggle Theme">
                {theme === 'light' ? <Moon /> : <Sun />}
                <span>Toggle Theme</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold font-headline">
              {navItems.find(item => pathname.startsWith(item.href))?.title || 'OmniCom'}
            </h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
