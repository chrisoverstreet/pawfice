'use client';

import addPetAction from '@/app/(dashboard)/people/[userId]/add-pet-action';
import type { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function AddPetForm({ user }: { user: Pick<PageData, 'id'> }) {
  const router = useRouter();

  const [, setModal] = useUserPageModal();

  const { hasSucceeded, isPending, execute } = useAction(addPetAction, {
    onSuccess: async ({ data: petShortId }) => {
      await setModal(null);
      if (petShortId) {
        toast.success('Successfully added pet');
        router.replace(`/pets/${petShortId}`);
      }
    },
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    disabled: hasSucceeded || isPending,
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form
        className='flex flex-col gap-4'
        onSubmit={methods.handleSubmit((fv) =>
          execute({
            name: fv.name,
            userId: user.id,
          }),
        )}
      >
        <FormField
          control={methods.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoFocus required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isPending} type='submit'>
          Add pet
        </Button>
      </form>
    </Form>
  );
}
