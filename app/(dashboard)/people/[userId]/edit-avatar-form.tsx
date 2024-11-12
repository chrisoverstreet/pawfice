'use client';

import { PageData } from '@/app/(dashboard)/people/[userId]/get-page-data';
import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getBrowserClient } from '@/lib/supabase/get-browser-client';
import indexPetAction from '@/utils/typesense/index-pet-action';
import indexTenantProfileAction from '@/utils/typesense/index-tenant-profile-action';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

const schema = z.object({
  file: z.instanceof(File),
  croppedAreaPixels: z.object({
    width: z.number().int(),
    height: z.number().int(),
    x: z.number().int(),
    y: z.number().int(),
  }),
});

type FormValues = z.infer<typeof schema>;

export default function EditAvatarForm({
  user,
}: {
  user: Pick<PageData, 'avatar_url' | 'id'>;
}) {
  const router = useRouter();

  const [, setModal] = useUserPageModal();

  const [avatarSrc, setAvatarSrc] = useState(user.avatar_url ?? '');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      methods.setValue('croppedAreaPixels', croppedAreaPixels);
    },
    [methods],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      methods.setValue('file', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setAvatarSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const file = methods.watch('file');

  return (
    <Form {...methods}>
      <form className='grid gap-4' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='relative h-64'>
          {file ? (
            <Cropper
              image={avatarSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <label
              htmlFor='avatar-upload'
              className='cursor-pointer flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg'
            >
              <div>
                <PlusCircle className='w-12 h-12 text-gray-400' />
                <input
                  id='avatar-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
              </div>
            </label>
          )}
        </div>
        <div className='flex justify-end'>
          <Button className='w-full sm:w-auto' disabled={!file} type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );

  async function onSubmit({ file, croppedAreaPixels }: FormValues) {
    console.log({ file, croppedAreaPixels });

    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = URL.createObjectURL(file);
    await new Promise((reesolve) => (image.onload = reesolve));
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );
    const croppedImageDataBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve);
    });

    if (!croppedImageDataBlob) {
      toast.error('Unexpected error');
      return;
    }

    const supabase = getBrowserClient();

    const { data, error } = await supabase.storage
      .from('user_avatars')
      .upload(`/${user.id}/${v4()}/${file.name}`, croppedImageDataBlob);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      const { error: tenantProfileUpdateError } = await supabase
        .from('tenant_profiles')
        .update({
          avatar_url: supabase.storage
            .from('user_avatars')
            .getPublicUrl(data.path).data.publicUrl,
        })
        .eq('id', user.id)
        .single();

      if (tenantProfileUpdateError) {
        toast.error(tenantProfileUpdateError.message);
        return;
      }
    }

    const petIds = await supabase
      .from('pet_parents')
      .select('pet_id')
      .eq('tenant_profile_id', user.id)
      .then(({ data }) => data?.map((pp) => pp.pet_id) ?? []);

    await Promise.all([
      indexTenantProfileAction({ id: user.id }),
      ...petIds.map((id) => indexPetAction({ id })),
    ]).catch(console.error);

    toast.success('Avatar updated successfully');

    await setModal(null);

    router.refresh();
  }
}
