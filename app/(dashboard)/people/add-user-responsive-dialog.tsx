'use client';

import AddUserForm from '@/app/(dashboard)/people/add-user-form';
import usePeoplePageModal from '@/app/(dashboard)/people/use-people-page-modal';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/responsive-dialog';

export default function AddUserResponsiveDialog() {
  const [modal, setModal] = usePeoplePageModal();

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
