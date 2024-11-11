'use client';

import useModal from '@/app/(dashboard)/people/use-modal';
import { Button } from '@/components/ui/button';

export default function AddUserButton() {
  const [, setModal] = useModal();

  return <Button onClick={() => setModal('add-user')}>Add user</Button>;
}
