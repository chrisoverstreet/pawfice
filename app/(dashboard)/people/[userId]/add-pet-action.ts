'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import { ServerError } from 'typesense/lib/Typesense/Errors';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  userId: z.number().int(),
});

const addPetAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, userId } }) => {
    const supabase = await getServerClient();

    const { data: pet, error: insertPetError } = await supabase
      .from('pets')
      .insert({
        name,
      })
      .select('id, short_id')
      .single();

    if (insertPetError) {
      throw new ServerError(insertPetError.message);
    }

    const { error: insertPetParentError } = await supabase
      .from('pet_parents')
      .insert({
        pet_id: pet.id,
        user_id: userId,
      })
      .single();

    if (insertPetParentError) {
      await supabase.from('pets').delete().eq('id', pet.id);
      throw new ServerError(insertPetParentError.message);
    }

    return pet.short_id;
  });

export default addPetAction;
