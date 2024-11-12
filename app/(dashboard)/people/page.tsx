import DashboardPage from '@/app/(dashboard)/dashboard-page';
import AddUserButton from '@/app/(dashboard)/people/add-user-button';
import AddUserResponsiveDialog from '@/app/(dashboard)/people/add-user-responsive-dialog';
import PeopleList from '@/app/(dashboard)/people/people-list';
import SearchInput from '@/app/(dashboard)/search-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People',
};

export default async function PeoplePage() {
  return (
    <>
      <DashboardPage
        heading={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>People</BreadcrumbPage>
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
            <AddUserButton />
          </div>
          <PeopleList />
        </div>
      </DashboardPage>
      <AddUserResponsiveDialog />
    </>
  );
}
