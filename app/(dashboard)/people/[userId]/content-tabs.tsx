'use client';

import AdminUserInfo from '@/app/(dashboard)/people/[userId]/admin-user-info';
import { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import PetsTab from '@/app/(dashboard)/people/[userId]/pets-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PawPrint, User } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { z } from 'zod';

export default function ContentTabs({ data }: { data: PageData }) {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringEnum(['profile', 'pets']).withDefault('profile'),
  );

  return (
    <Tabs
      className='w-full sm:w-auto'
      defaultValue={tab}
      onValueChange={(val) => setTab(z.enum(['profile', 'pets']).parse(val))}
      value={tab}
    >
      <TabsList className='mb-4 grid w-full grid-cols-2 sm:w-auto sm:inline-grid'>
        <TabsTrigger value='profile' className='flex items-center space-x-2'>
          <User className='w-4 h-4' />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value='pets' className='flex items-center space-x-2'>
          <PawPrint className='w-4 h-4' />
          <span>Pets</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='profile'>
        <AdminUserInfo data={data} />
      </TabsContent>
      <TabsContent value='pets'>
        <PetsTab />
      </TabsContent>
    </Tabs>
  );
}
