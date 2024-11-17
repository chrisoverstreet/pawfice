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

const getPageData = async (petShortId: string) => {
  const supabase = await getServerClient();
  return supabase.from('pets').select('*').eq('short_id', petShortId).single();
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ petShortId: string }>;
}): Promise<Metadata> {
  const { petShortId } = await params;

  const { data, error } = await getPageData(petShortId);
  if (error) {
    notFound();
  }
  return {
    title: data.name,
  };
}
export default async function PetPage({
  params,
}: {
  params: Promise<{ petShortId: string }>;
}) {
  const { petShortId } = await params;

  const { data, error } = await getPageData(petShortId);

  if (error) {
    notFound();
  }

  return (
    <DashboardPage
      heading={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/pets'>Pets</Link>
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
      <pre>{JSON.stringify(data, null, `\t`)}</pre>
    </DashboardPage>
  );
}
export async function generateStaticParams() {
  const supabaseAdmin = getAdminClient();
  return supabaseAdmin
    .from('pets')
    .select('short_id')
    .then(
      ({ data }) =>
        data?.map((p) => ({
          petId: p.short_id,
        })) ?? [],
    );
}
