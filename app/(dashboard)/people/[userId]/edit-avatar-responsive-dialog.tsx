'use client';

import EditAvatarForm from '@/app/(dashboard)/people/[userId]/edit-avatar-form';
import { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/responsive-dialog';

export default function EditAvatarResponsiveDialog({
  user,
}: {
  user: Pick<PageData, 'avatar_url' | 'id'>;
}) {
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
            Click below to upload avatar image
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <EditAvatarForm user={user} />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
