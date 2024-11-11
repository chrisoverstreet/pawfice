import DashboardPage from '@/app/(dashboard)/dashboard-page';
import AddUserButton from '@/app/(dashboard)/people/add-user-button';
import AddUserResponsiveDialog from '@/app/(dashboard)/people/add-user-responsive-dialog';
import List from '@/app/(dashboard)/people/list';
import SearchInput from '@/app/(dashboard)/people/search-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export default async function Page() {
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
          <List />
        </div>
      </DashboardPage>
      <AddUserResponsiveDialog />
    </>
  );
}
