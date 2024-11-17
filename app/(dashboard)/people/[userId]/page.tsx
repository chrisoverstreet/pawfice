import DashboardPage from '@/app/(dashboard)/dashboard-page';
import ContentTabs from '@/app/(dashboard)/people/[userId]/content-tabs';
import EditAvatarResponsiveDialog from '@/app/(dashboard)/people/[userId]/edit-avatar-responsive-dialog';
import getPageData from '@/app/(dashboard)/people/[userId]/get-page-data';
import Heading from '@/app/(dashboard)/people/[userId]/heading';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;

  const { data, error } = await getPageData(userId);

  if (error) {
    notFound();
  }

  return {
    title: `${data.name} | Pawfice`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const { data, error } = await getPageData(userId);

  if (error) {
    return notFound();
  }

  return (
    <>
      <DashboardPage
        heading={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/people'>People</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <Heading user={data} />
        <ContentTabs data={data} />
      </DashboardPage>
      <EditAvatarResponsiveDialog user={data} />
    </>
  );
}

export async function generateStaticParams() {
  const supabaseAdmin = getAdminClient();

  return supabaseAdmin
    .from('users')
    .select('short_id')
    .then(
      ({ data }) =>
        data?.map((u) => ({
          userId: u.short_id,
        })) ?? [],
    );
}
