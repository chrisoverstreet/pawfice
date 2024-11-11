import DashboardPage from '@/app/(dashboard)/dashboard-page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getAdminClient } from '@/lib/supabase/get-admin-client';
import { getServerClient } from '@/lib/supabase/get-server-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const getPageData = async (userId: string) => {
  const supabase = await getServerClient();
  return supabase
    .from('tenant_profiles')
    .select('*, users(*)')
    .eq('id', userId)
    .single();
};

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
    title: `${data.first_name} | Pawfice`,
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
              <BreadcrumbPage>{data.first_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <pre>{JSON.stringify(data, null, `\t`)}</pre>
    </DashboardPage>
  );
}

export async function generateStaticParams() {
  const supabaseAdmin = getAdminClient();

  return supabaseAdmin
    .from('users')
    .select('id')
    .then(
      ({ data }) =>
        data?.map((u) => ({
          userId: u.id,
        })) ?? [],
    );
}
