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

const getPageData = async (petId: string) => {
  const supabase = await getServerClient();
  return supabase
    .from('pets')
    .select('*, parents:pet_parents(profile:tenant_profiles(*))')
    .eq('id', petId)
    .single();
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ petId: string }>;
}): Promise<Metadata> {
  const { petId } = await params;

  const { data, error } = await getPageData(petId);

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
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;

  const { data, error } = await getPageData(petId);

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
    .select('id')
    .then(
      ({ data }) =>
        data?.map((p) => ({
          petId: p.id,
        })) ?? [],
    );
}
