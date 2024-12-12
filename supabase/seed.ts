/**
 * ! Executing this script will delete all data in your database and seed it with 10 public_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Required for custom_auth_hook to work
  console.log('grant all on schema extensions to supabase_auth_admin;');

  const {
    auth_users: [authUser],
  } = await seed.auth_users((x) =>
    x(1, {
      instance_id: '00000000-0000-0000-0000-000000000000',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'christopheroverstreet@gmail.com',
      encrypted_password:
        '$2a$10$A1kbqq3bGUWwh.WiriUMKOQmSoWyKIopsAkMQX3HaA7PBvEC33eG6', // "password"
      email_confirmed_at: new Date(),
      invited_at: null,
      confirmation_token: '',
      confirmation_sent_at: null,
      recovery_token: '',
      recovery_sent_at: null,
      email_change_token_new: '',
      email_change: '',
      email_change_sent_at: null,
      last_sign_in_at: null,
      raw_app_meta_data: { provider: 'email', providers: ['email'] },
      raw_user_meta_data: {},
      is_super_admin: null,
      phone: null,
      phone_confirmed_at: null,
      phone_change: '',
      phone_change_token: '',
      phone_change_sent_at: null,
      email_change_token_current: '',
      email_change_confirm_status: 0,
      banned_until: null,
      reauthentication_token: '',
      reauthentication_sent_at: null,
      is_sso_user: false,
      deleted_at: null,
      is_anonymous: false,
    }),
  );

  await seed.identities((x) =>
    x(1, {
      provider_id: authUser.id,
      identity_data: {
        sub: authUser.id,
        email: 'christopheroverstreet@gmail.com',
        email_verified: false,
        phone_verified: false,
      },
      provider: 'email',
      last_sign_in_at: new Date(),
      user_id: authUser.id,
    }),
  );

  const {
    public_tenants: [demoTenant],
  } = await seed.public_tenants((x) =>
    x(1, { name: 'Demo', created_by: authUser.id }),
  );
  seed.public_tenants((x) => x(10));

  await seed.public_users((x) =>
    x(1, ({ index }) => ({
      avatar_url: () => `https://api.dicebear.com/9.x/thumbs/svg?seed=${index}`,
      tenant_id: demoTenant.id,
      auth_id: authUser.id,
      first_name: 'Chris',
      last_name: 'Overstreet',
      email: 'christopheroverstreet@gmail.com',
      phone: '+15409318153',
      role: 'owner',
    })),
  );

  const { public_users } = await seed.public_users((x) =>
    x(100, ({ index }) => ({
      tenant_id: demoTenant.id,
      avatar_url: () =>
        Math.random() > 0.7
          ? `https://api.dicebear.com/9.x/thumbs/svg?seed=${index}`
          : null,
      role: 'parent',
      auth_id: null,
    })),
  );

  const { pets } = await seed.pets((x) =>
    x(100, ({ index }) => ({
      tenant_id: demoTenant.id,
      avatar_url: () =>
        Math.random() > 0.5
          ? `https://api.dicebear.com/9.x/thumbs/svg?seed=${index}`
          : null,
    })),
  );

  await seed.pet_parents((x) => x(100, { tenant_id: demoTenant.id }), {
    connect: { pets, public_users },
  });

  process.exit();
};

main();
