'use client';

import AddUserForm from '@/app/(dashboard)/people/add-user-form';
import useModal from '@/app/(dashboard)/people/use-modal';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/responsive-dialog';

export default function AddUserResponsiveDialog() {
  const [modal, setModal] = useModal();

  return (
    <ResponsiveDialog
      open={modal === 'add-user'}
      onOpenChange={(open) => setModal(open ? 'add-user' : null)}
    >
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add user</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Fill out the form to quickly add a new user
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <AddUserForm />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
