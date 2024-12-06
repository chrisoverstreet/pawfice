'use server';

import { actionClient } from '@/lib/safe-action';
import { getServerClient } from '@/lib/supabase/get-server-client';
import indexUserAction from '@/utils/typesense/index-user-action';
import invariant from 'invariant';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import { z } from 'zod';

const schema = z.object({
  // User info
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    })
    .optional()
    .transform((p) =>
      p ? parsePhoneNumberWithError(p, 'US').number : undefined,
    ),

  // Address info
  addressType: z.enum(['home', 'work', 'other']).nullish(),
  streetLine1: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  postalCode: z.string().nullish(),
  country: z.string().nullish(),
  placeId: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),

  // Emergency contact info
  emergencyContactName: z.string().nullish(),
  emergencyContactPhone: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    })
    .nullish()
    .transform((p) =>
      p ? parsePhoneNumberWithError(p, 'US').number : undefined,
    ),
  emergencyContactRelationship: z
    .enum(['spouse', 'parent', 'sibling', 'friend', 'other'])
    .nullish(),
});

const addParentAction = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: {
        addressType,
        city,
        country,
        email,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship,
        firstName,
        lastName,
        latitude,
        longitude,
        phone,
        placeId,
        postalCode,
        state,
        streetLine1,
      },
    }) => {
      console.log('test');

      const supabase = await getServerClient();

      const { data: userShortId, error: addParentError } = await supabase.rpc(
        'add_parent',
        {
          p_email: email,
          p_first_name: firstName,
          p_last_name: lastName,
          p_phone: phone,
        },
      );

      if (addParentError) {
        throw addParentError;
      }

      const userId = (
        await supabase
          .from('users')
          .select('id')
          .eq('short_id', userShortId)
          .single()
      ).data?.id;

      invariant(userId, 'Failed to add parent');

      try {
        if (
          addressType &&
          streetLine1 &&
          city &&
          state &&
          postalCode &&
          country
        ) {
          await supabase.from('addresses').upsert(
            {
              user_id: userId,
              address_type: addressType,
              street_line1: streetLine1,
              city,
              state,
              postal_code: postalCode,
              country,
              place_id: placeId,
              latitude: latitude,
              longitude: longitude,
            },
            {
              onConflict: 'user_id',
            },
          );
        }
      } catch (e) {
        console.error(e);
      }

      try {
        if (
          emergencyContactName &&
          emergencyContactPhone &&
          emergencyContactRelationship
        ) {
          await supabase.from('emergency_contacts').upsert({
            user_id: userId,
            name: emergencyContactName,
            phone: emergencyContactPhone,
            relationship: emergencyContactRelationship,
          });
        }
      } catch (e) {
        console.error(e);
      }

      await indexUserAction({ userShortId }).catch(console.error);

      return userShortId;
    },
  );

export default addParentAction;
