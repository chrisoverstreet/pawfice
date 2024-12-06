'use client';

import { type ButtonProps } from '@/components/ui/button';
import { clsx } from 'clsx';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton(
  props: Omit<ButtonProps, 'onClick' | 'type'>,
) {
  const { back } = useRouter();

  return (
    <button
      className={clsx(
        'flex items-center gap-2 text-gray-airbnb hover:text-primary',
        props.className,
      )}
      onClick={back}
      type='button'
      {...props}
    >
      <ArrowLeft className='h-5 w-5' />
      <span className='text-sm font-medium'>Back</span>
    </button>
  );
}
