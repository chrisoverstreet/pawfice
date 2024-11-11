import DashboardPage from '@/app/(dashboard)/dashboard-page';
import List from '@/app/(dashboard)/people/list';
import SearchInput from '@/app/(dashboard)/people/search-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

export default async function Page() {
  return (
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
          {/* TODO */}
          <Button>Add user</Button>
        </div>
        <List />
      </div>
    </DashboardPage>
  );
}
