'use client';

import createPricingRuleAction from '@/app/(dashboard)/settings/services/create-pricing-rule-action';
import createServiceAction from '@/app/(dashboard)/settings/services/create-service-action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Enums } from '@/utils/supabase/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface Service {
  id: number;
  name: string;
  type: Enums<'service_type'>;
  pricing_rules: {
    id: number;
    name: string;
    description: string | null;
    base_price: number;
    service_tier: {
      id: number;
      name: string;
    } | null;
  }[];
}

interface ServiceTier {
  id: number;
  name: string;
  description: string | null;
}

interface Props {
  services: Service[];
  serviceTiers: ServiceTier[];
}

const serviceFormSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['daycare', 'overnight_boarding', 'grooming']),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const pricingRuleFormSchema = z.object({
  serviceId: z.string(),
  tierId: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.string(),
});

type PricingRuleFormValues = z.infer<typeof pricingRuleFormSchema>;

export function ServicePricingManager({ services, serviceTiers }: Props) {
  const serviceMethods = useForm<ServiceFormValues>({
    defaultValues: {
      name: '',
      type: 'daycare',
    },
    resolver: zodResolver(serviceFormSchema),
  });

  const pricingRuleMethods = useForm<PricingRuleFormValues>({
    defaultValues: {
      serviceId: undefined,
      tierId: undefined,
      name: '',
      description: '',
      basePrice: '',
    },
    resolver: zodResolver(pricingRuleFormSchema),
  });

  const { execute: createService } = useAction(createServiceAction, {
    onSuccess: () => toast.success('Successfully created new service'),
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  async function handleServiceSubmit(fv: ServiceFormValues) {
    createService({ name: fv.name, type: fv.type });
  }

  const { execute: createPricingRule } = useAction(createPricingRuleAction, {
    onSuccess: () => toast.success('Successfully created new pricing rule'),
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  async function handlePricingRuleSubmit(fv: PricingRuleFormValues) {
    createPricingRule({
      serviceId: parseInt(fv.serviceId),
      serviceTierId: fv.tierId ? parseInt(fv.tierId) : null,
      name: fv.name,
      description: fv.description,
      basePrice: parseFloat(fv.basePrice),
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Tabs defaultValue='services' className='space-y-4'>
      <TabsList>
        <TabsTrigger value='services'>Services</TabsTrigger>
        <TabsTrigger value='pricing'>Pricing Rules</TabsTrigger>
      </TabsList>

      <TabsContent value='services'>
        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Existing Services</CardTitle>
              <CardDescription>View and manage your services</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Pricing Rules</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell className='capitalize'>
                        {service.type.replace('_', ' ')}
                      </TableCell>
                      <TableCell>
                        {service.pricing_rules.length} rules
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Service</CardTitle>
              <CardDescription>
                Add a new service to your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...serviceMethods}>
                <form
                  onSubmit={serviceMethods.handleSubmit(handleServiceSubmit)}
                  className='space-y-4'
                >
                  <div className='space-y-2'>
                    <FormField
                      control={serviceMethods.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter service name'
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={serviceMethods.control}
                      name='type'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select service type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='daycare'>Daycare</SelectItem>
                              <SelectItem value='overnight_boarding'>
                                Overnight Boarding
                              </SelectItem>
                              <SelectItem value='grooming'>Grooming</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type='submit'>Create Service</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value='pricing'>
        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Existing Pricing Rules</CardTitle>
              <CardDescription>
                View all pricing rules by service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Base Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.flatMap((service) =>
                    service.pricing_rules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{rule.name}</TableCell>
                        <TableCell>
                          {rule.service_tier?.name || 'No tier'}
                        </TableCell>
                        <TableCell>{formatCurrency(rule.base_price)}</TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Pricing Rule</CardTitle>
              <CardDescription>
                Set up pricing for your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...pricingRuleMethods}>
                <form
                  onSubmit={pricingRuleMethods.handleSubmit(
                    handlePricingRuleSubmit,
                  )}
                  className='space-y-4'
                >
                  <div className='space-y-2'>
                    <FormField
                      control={pricingRuleMethods.control}
                      name='serviceId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select service' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem
                                  key={service.id}
                                  value={service.id.toString()}
                                >
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={pricingRuleMethods.control}
                      name='tierId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Tier (Optional)</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger id='tier'>
                                <SelectValue placeholder='Select tier' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceTiers.map((tier) => (
                                <SelectItem
                                  key={tier.id}
                                  value={tier.id.toString()}
                                >
                                  {tier.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={pricingRuleMethods.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rule Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter rule name'
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={pricingRuleMethods.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter description' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormField
                      control={pricingRuleMethods.control}
                      name='basePrice'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              step='.01'
                              min={0}
                              required
                              inputMode='decimal'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type='submit'>Create Pricing Rule</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
