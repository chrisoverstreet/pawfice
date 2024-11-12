'use client';

import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import UpdateProfileForm from '@/app/(dashboard)/people/[userId]/update-profile-form';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminUserInfo({ data }: { data: PageData }) {
  return (
    <div className='container mx-auto'>
      <Card className='overflow-hidden'>
        <CardContent className='p-0'>
          <UpdateProfileForm data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
