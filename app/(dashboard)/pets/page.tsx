import DashboardPage from '@/app/(dashboard)/dashboard-page';
import PetsList from '@/app/(dashboard)/pets/petsList';
import SearchInput from '@/app/(dashboard)/search-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pets',
};

export default async function PetsPage() {
  return (
    <>
      <DashboardPage
        heading={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Pets</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex gap-4 flex-1'>
              <SearchInput />
            </div>
          </div>
          <PetsList />
        </div>
      </DashboardPage>
    </>
  );
}
