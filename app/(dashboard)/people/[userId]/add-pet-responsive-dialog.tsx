'use client';

import AddPetForm from '@/app/(dashboard)/people/[userId]/add-pet-form';
import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/responsive-dialog';

export default function AddPetResponsiveDialog({
  user,
}: {
  user: Pick<PageData, 'id'>;
}) {
  const [modal, setModal] = useUserPageModal();

  return (
    <ResponsiveDialog
      open={modal === 'add-pet'}
      onOpenChange={(open) => setModal(open ? 'add-pet' : null)}
    >
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add pet</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Fill out form to add a new pet
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <AddPetForm user={user} />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
