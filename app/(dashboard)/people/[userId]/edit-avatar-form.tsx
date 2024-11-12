'use client';

import useUserPageModal from '@/app/(dashboard)/people/[userId]/use-user-page-modal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { type ChangeEvent, useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

export default function EditAvatarForm() {
  const [, setModal] = useUserPageModal();

  const [avatarSrc, setAvatarSrc] = useState(
    '/placeholder.svg?height=96&width=96',
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [selectedFile, setSelectedFile] = useState<File>();

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setAvatarSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = useCallback(async () => {
    if (croppedAreaPixels && selectedFile) {
      // Here you would typically send the cropped image to your server
      // For this example, we'll just update the avatar source
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      await new Promise((resolve) => (image.onload = resolve));
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
      const croppedImageDataUrl = canvas.toDataURL('image/jpeg');
      setAvatarSrc(croppedImageDataUrl);
      setModal(null);
    }
  }, [croppedAreaPixels, selectedFile, setModal]);

  return (
    <div className='grid gap-4'>
      <div className='relative h-64'>
        {selectedFile ? (
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
        <Button
          className='w-full sm:w-auto'
          onClick={handleSave}
          disabled={!selectedFile}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
