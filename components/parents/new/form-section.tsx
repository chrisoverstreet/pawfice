import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ReactNode } from 'react';

export default function FormSection({
  children,
  className,
  heading,
}: {
  children: ReactNode;
  className?: string;
  heading: ReactNode;
}) {
  return (
    <Card className='bg-surface'>
      <CardHeader className='text-lg font-semibold text-content'>
        {heading}
      </CardHeader>
      <CardContent className={className}>{children}</CardContent>
    </Card>
  );
}
