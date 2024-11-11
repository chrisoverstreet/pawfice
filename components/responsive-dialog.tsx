import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  type DialogContentProps,
  type DialogDescriptionProps,
  DialogProps,
  type DialogTitleProps,
  type DialogTriggerProps,
} from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import type { DialogHeaderProps } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog/DialogHeader';

/**
 * Usage:
 *
 * <ResponsiveDialog>
 *   <ResponsiveDialogTrigger>Open</ResponsiveDialogTrigger>
 *   <ResponsiveDialogContent>
 *     <ResponsiveDialogHeader>
 *       <ResponsiveDialogTitle>Are you absolutely sure?</ResponsiveDialogTitle>
 *       <ResponsiveDialogDescription>This action cannot be undone.</ResponsiveDialogDescription>
 *     </ResponsiveDialogHeader>
 *     <div>Content</div>
 *   </ResponsiveDialogContent>
 * </Drawer>
 */
export function ResponsiveDialog({
  children,
  ...props
}: DialogProps & {
  hideDrawerCloseButton?: boolean;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <Dialog {...props}>{children}</Dialog>;
  }

  return <Drawer {...props}>{children}</Drawer>;
}

export function ResponsiveDialogTrigger(props: DialogTriggerProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DialogTrigger {...props} />;
  }

  return <DrawerTrigger {...props} />;
}

export function ResponsiveDialogContent({
  children,
  hideDrawerCloseButton,
  ...props
}: DialogContentProps & { hideDrawerCloseButton?: boolean }) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <DialogContent
        {...props}
        className={clsx('sm:max-w-[425px]', props.className)}
      >
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent {...props}>
      <div className='mx-4'>{children}</div>
      {!hideDrawerCloseButton && (
        <DrawerFooter className='pt-4'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      )}
    </DrawerContent>
  );
}

export function ResponsiveDialogHeader(props: DialogHeaderProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DialogHeader {...props} />;
  }

  return (
    <DrawerHeader
      {...props}
      className={clsx('text-left px-0', props.className)}
    />
  );
}

export function ResponsiveDialogTitle(props: DialogTitleProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DialogTitle {...props} />;
  }

  return <DrawerTitle {...props} />;
}

export function ResponsiveDialogDescription(props: DialogDescriptionProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DialogDescription {...props} />;
  }

  return <DrawerDescription {...props} />;
}
