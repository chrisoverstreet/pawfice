'use client';

import ReviewStep from '@/components/reservations/new/review-step';
import ScheduleStep from '@/components/reservations/new/schedule-step';
import SelectPetsStep from '@/components/reservations/new/select-pets-step';
import ServiceTypeStep from '@/components/reservations/new/service-type-step';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  dates: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  parentIds: z.array(z.string()).optional(),
  petIds: z.array(z.string()).min(1),
  recurring: z.boolean(),
  recurringFrequency: z.enum(['Weekly', 'EveryTwoWeeks', 'Monthly']).optional(),
  recurringDaysOfWeek: z.array(
    z.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
  ),
  serviceType: z.enum(['Daycare', 'Overnight Boarding']),
  step: z.enum(['Select Pets', 'Service Type', 'Schedule', 'Review']),
});

export type FormValues = z.infer<typeof schema>;

export default function NewReservationForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      dates: undefined,
      parentIds: undefined,
      petIds: [],
      recurring: false,
      recurringDaysOfWeek: [],
      serviceType: undefined,
      step: 'Select Pets',
    },
    resolver: zodResolver(schema),
  });

  const step = methods.watch('step');

  return (
    <Form {...methods}>
      <form>
        {step === 'Select Pets' && (
          <Suspense>
            <SelectPetsStep />
          </Suspense>
        )}
        {step === 'Service Type' && <ServiceTypeStep />}
        {step === 'Schedule' && <ScheduleStep />}
        {step === 'Review' && <ReviewStep />}
      </form>
    </Form>
  );
}
