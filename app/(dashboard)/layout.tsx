import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { Home } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const links = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
] as const;

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await getServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.app_metadata.tenant_id) {
    return notFound();
  }

  const { data } = await supabase
    .from('tenants')
    .select('name')
    .eq('id', session.user.app_metadata.tenant_id)
    .single();

  if (!data?.name) {
    return notFound();
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <SidebarMenuButton>{data.name}</SidebarMenuButton>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <a href={link.url}>
                      <link.icon />
                      <span>{link.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter />
        <SidebarRail />
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
