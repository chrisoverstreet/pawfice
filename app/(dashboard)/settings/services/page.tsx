import { ServicePricingManager } from '@/components/settings/services/service-pricing-manager';
import { getServerClient } from '@/lib/supabase/get-server-client';

export default async function ServicesPage() {
  const supabase = await getServerClient();

  const { data: services } = await supabase
    .from('services')
    .select(
      `
      id,
      name,
      type,
      pricing_rules (
        id,
        name,
        description,
        base_price,
        service_tier:service_tiers (
          id,
          name
        )
      )
    `,
    )
    .order('created_at', { ascending: false });

  const { data: serviceTiers } = await supabase
    .from('service_tiers')
    .select('id, name, description')
    .order('display_order', { ascending: true });

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Service & Pricing Management</h1>
      <ServicePricingManager
        services={services || []}
        serviceTiers={serviceTiers || []}
      />
    </div>
  );
}
