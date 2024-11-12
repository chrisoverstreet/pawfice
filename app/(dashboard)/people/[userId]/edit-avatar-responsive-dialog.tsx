'use client';

import EditAvatarForm from '@/app/(dashboard)/people/[userId]/edit-avatar-form';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/responsive-dialog';

export default function EditAvatarResponsiveDialog() {
  const [modal, setModal] = useUserPageModal();

  return (
    <ResponsiveDialog
      open={modal === 'edit-avatar'}
      onOpenChange={(open) => setModal(open ? 'add-user' : null)}
    >
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit avatar</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Click below to update image
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <EditAvatarForm />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
