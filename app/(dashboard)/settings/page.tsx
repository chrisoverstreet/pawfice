import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function SettingsPage() {
  return (
    <div className='space-y-4'>
      <h1>TODO Settings</h1>
      <Button asChild variant='outline'>
        <Link href='/settings/services/daycare/new'>Add daycare</Link>
      </Button>
    </div>
  );
}
