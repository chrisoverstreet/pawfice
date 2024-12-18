'use client';

import addParentAction from '@/app/(full-screen)/parents/new/add-parent-action';
import FormSection from '@/components/parents/new/form-section';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().transform((ln) => ln || undefined),
  email: z
    .string()
    .email()
    .or(z.literal(''))
    .transform((e) => e || undefined),
  phone: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val, 'US'), {
      message: 'Invalid phone number',
    })
    .transform((x) => x || undefined),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  emergencyContact: z.string(),
  emergencyRelationship: z.enum([
    'spouse',
    'parent',
    'sibling',
    'friend',
    'other',
  ]),
  emergencyPhone: z.string(),
  contactViaEmail: z.boolean(),
  contactViaSms: z.boolean(),
  contactViaPush: z.boolean(),
  reservationReminders: z.boolean(),
  checkInUpdates: z.boolean(),
  promotions: z.boolean(),
  newsletters: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function NewParentForm() {
  const router = useRouter();

  const { execute, hasSucceeded, isPending } = useAction(addParentAction, {
    onSuccess: async ({ data: parentId }) => {
      if (parentId) {
        toast.success('Successfully added new parent');
        router.push(`/parents/${parentId}`);
      }
    },
    onError: ({ error }) =>
      toast.error(error.serverError || 'Unexpected error'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      emergencyContact: '',
      emergencyRelationship: 'other',
      emergencyPhone: '',
      contactViaEmail: true,
      contactViaSms: true,
      contactViaPush: true,
      reservationReminders: true,
      checkInUpdates: true,
      promotions: false,
      newsletters: false,
    },
    disabled: hasSucceeded || isPending,
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form className='space-y-6' onSubmit={methods.handleSubmit(onSubmit)}>
        <FormSection
          className='grid grid-cols-1 sm:grid-cols-2 gap-4'
          heading='Contact Information'
        >
          <FormField
            control={methods.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder='John' required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder='Smith' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl
                  onChange={(e: FormEvent<HTMLInputElement>) => {
                    methods.setValue(
                      'phone',
                      new AsYouType('US').input(e.currentTarget.value),
                    );
                  }}
                >
                  <Input
                    placeholder='(540) 123-4567'
                    type='tel'
                    inputMode='tel'
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    inputMode='email'
                    placeholder='johnsmith@pawfice.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection className='grid grid-cols-2 gap-4' heading='Address'>
          <FormField
            control={methods.control}
            name='streetAddress'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder='123 Main St' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='San Francisco' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder='CA' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='zip'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder='94105' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder='United States' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection className='space-y-4' heading='EmergencyContact'>
          <FormField
            control={methods.control}
            name='emergencyContact'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder='Jane Smith' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='emergencyRelationship'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select relationship' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-surface'>
                    <SelectItem value='spouse'>Spouse</SelectItem>
                    <SelectItem value='parent'>Parent</SelectItem>
                    <SelectItem value='sibling'>Sibling</SelectItem>
                    <SelectItem value='friend'>Friend</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name='emergencyPhone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    inputMode='tel'
                    placeholder='(555) 123-4567'
                    type='tel'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection className='space-y-6' heading='Preferences'>
          <div>
            <h2 className='text-sm font-medium text-content mb-4'>
              Communication Preferences
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <FormField
                control={methods.control}
                name='contactViaEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 p-3 border border-divider rounded-lg cursor-pointer hover:bg-highlight'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Mail className='h-4 w-4 text-muted' />
                      <span className='text-sm text-content'>Email</span>
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='contactViaSms'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 p-3 border border-divider rounded-lg cursor-pointer hover:bg-highlight'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <MessageSquare className='h-4 w-4 text-muted' />
                      <span className='text-sm text-content'>SMS</span>
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='contactViaPush'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 p-3 border border-divider rounded-lg cursor-pointer hover:bg-highlight'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Bell className='h-4 w-4 text-muted' />
                      <span className='text-sm text-content'>Push</span>
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <h2 className='text-sm font-medium text-content mb-4'>
              Notification Settings
            </h2>
            <div className='space-y-3'>
              <FormField
                control={methods.control}
                name='reservationReminders'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Reservation reminders</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='checkInUpdates'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Check-in updates</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='promotions'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Promotions and offers</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='newsletters'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='text-sm text-content'>
                      Newsletters
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </FormSection>

        <div className='flex justify-end'>
          <Button
            className='w-full sm:w-auto'
            disabled={isPending || hasSucceeded}
            loading={isPending}
            type='submit'
            size='lg'
            variant='default'
          >
            Add Parent
          </Button>
        </div>
      </form>
    </Form>
  );

  // TODO this needs to be cleaned up
  function onSubmit(fv: FormValues) {
    return execute({
      email: fv.email,
      firstName: fv.firstName,
      lastName: fv.lastName,
      phone: fv.phone,

      emergencyContactName: fv.emergencyContact,
      emergencyContactPhone: fv.emergencyPhone,
      emergencyContactRelationship: fv.emergencyRelationship,

      addressType: 'home',
      streetLine1: fv.streetAddress,
      city: fv.city,
      state: fv.state,
      postalCode: fv.zip,
      country: fv.country,
    });
  }
}
