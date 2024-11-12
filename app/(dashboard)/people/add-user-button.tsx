'use client';

import usePeoplePageModal from '@/app/(dashboard)/people/use-people-page-modal';
import { Button } from '@/components/ui/button';

export default function AddUserButton() {
  const [, setModal] = usePeoplePageModal();

  return <Button onClick={() => setModal('add-user')}>Add user</Button>;
}
