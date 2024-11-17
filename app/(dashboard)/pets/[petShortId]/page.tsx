import { getServerClient } from '@/lib/supabase/get-server-client';
import { notFound } from 'next/navigation';

export default async function PetPage({
  params,
}: {
  params: Promise<{ petShortId: string }>;
}) {
  const { petShortId } = await params;

  const supabase = await getServerClient();

  const { data: pet, error } = await supabase
    .from('pets')
    .select('*, parents:pet_parents(profile:users(*))')
    .eq('short_id', petShortId)
    .single();

  if (error) {
    notFound();
  }

  return (
    <div>
      <h1>Pet page</h1>
      <div>short id: {petShortId}</div>
      <pre>{JSON.stringify(pet, null, `\t`)}</pre>
    </div>
  );
}
