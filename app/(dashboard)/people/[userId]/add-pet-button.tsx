'use client';

import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Button } from '@/components/ui/button';

export default function AddPetButton() {
  const [, setModal] = useUserPageModal();

  return <Button onClick={() => setModal('add-pet')}>Add pet</Button>;
}
