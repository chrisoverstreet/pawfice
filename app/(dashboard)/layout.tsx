import { NavUser } from '@/app/(dashboard)/nav-user';
import {
  Sidebar,
  SidebarContent,
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
} from '@/components/ui/sidebar';
import { getServerClient } from '@/lib/supabase/get-server-client';
import decodeAccessToken from '@/utils/supabase/decode-access-token';
import { Home, PawPrint, Users } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const links = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'People',
    url: '/people',
    icon: Users,
  },
  {
    title: 'Pets',
    url: '/pets',
    icon: PawPrint,
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

  if (!session?.user) {
    notFound();
  }

  const tenantId = (await decodeAccessToken(session.access_token))?.tenant_id;

  if (!tenantId) {
    notFound();
  }

  const { data } = await supabase
    .from('tenants')
    .select('name')
    .eq('id', tenantId)
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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton asChild>
                      <Link href={link.url}>
                        <link.icon />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={session.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}
