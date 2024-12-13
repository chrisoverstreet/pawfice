'use client';

import BasicInfoStep from '@/components/settings/services/daycare/new/basic-info-step';
import DurationDiscountsStep from '@/components/settings/services/daycare/new/duration-discounts-step';
import ReviewStep from '@/components/settings/services/daycare/new/review-step';
import SeasonalPricingStep from '@/components/settings/services/daycare/new/seasonal-pricing-step';
import ServiceTiersStep from '@/components/settings/services/daycare/new/service-tiers-step';
import SizeCategoriesStep from '@/components/settings/services/daycare/new/size-categories-step';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

enum Step {
  BasicInfo,
  ServiceTiers,
  SizeCategories,
  DurationDiscounts,
  SeasonalPricing,
  Review,
}

const schema = z.object({
  step: z.nativeEnum(Step),

  name: z.string().min(1),
  description: z.string(),

  tierIndexEditing: z.number().int().nullable(),
  tiers: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        basePrice: z.string(),
      }),
    )
    .min(1),

  sizeCategoryIndexEditing: z.number().int().nullable(),
  sizeCategories: z.array(
    z.object({
      name: z.string().min(1),
      minWeight: z.string(),
      maxWeight: z.string(),
      priceAdjustmentDollars: z.string(),
      description: z.string(),
    }),
  ),

  durationDiscountIndexEditing: z.number().int().nullable(),
  durationDiscounts: z.array(
    z.object({
      minDays: z.string(),
      discountPercent: z.string(),
      description: z.string(),
    }),
  ),

  seasonalPricingIndexEditing: z.number().int().nullable(),
  seasonalPricing: z.array(
    z.object({
      name: z.string().min(1),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      priceAdjustmentPercent: z.string(),
      description: z.string(),
    }),
  ),
});

export type FormValues = z.infer<typeof schema>;

export default function DaycareServiceWizard() {
  const methods = useForm<FormValues>({
    defaultValues: {
      step: Step.BasicInfo,

      name: 'Daycare',
      description: '',

      tiers: [{ name: '', description: '', basePrice: '' }],
      tierIndexEditing: 0,

      sizeCategories: [
        {
          name: '',
          minWeight: '',
          maxWeight: '',
          priceAdjustmentDollars: '',
          description: '',
        },
      ],
      sizeCategoryIndexEditing: 0,

      durationDiscounts: [
        {
          minDays: '',
          discountPercent: '',
        },
      ],
      durationDiscountIndexEditing: 0,

      seasonalPricing: [
        {
          name: '',
          startDate: null,
          endDate: null,
          priceAdjustmentPercent: '',
          description: '',
        },
      ],
      seasonalPricingIndexEditing: 0,
    },
    resolver: zodResolver(schema),
  });

  const steps: Record<
    Step,
    {
      title: string;
      description: string;
      content: () => ReactNode;
      required: boolean;
    }
  > = {
    [Step.BasicInfo]: {
      title: 'Basic Information',
      description: 'Name and describe your service',
      content: () => <BasicInfoStep />,
      required: false,
    },
    [Step.ServiceTiers]: {
      title: 'Service Tiers',
      description: 'Configure pricing tiers',
      content: () => <ServiceTiersStep />,
      required: false,
    },
    [Step.SizeCategories]: {
      title: 'Size Categories',
      description: 'Add size-based pricing adjustments',
      content: () => <SizeCategoriesStep />,
      required: false,
    },
    [Step.DurationDiscounts]: {
      title: 'Duration Discounts',
      description: 'Set up multi-day discounts',
      content: () => <DurationDiscountsStep />,
      required: false,
    },
    [Step.SeasonalPricing]: {
      title: 'Seasonal Pricing',
      description: 'Configure seasonal adjustments',
      content: () => <SeasonalPricingStep />,
      required: false,
    },
    [Step.Review]: {
      title: 'Review',
      description: 'Review daycare configuration',
      content: () => <ReviewStep />,
      required: false,
    },
  };

  const step = methods.watch('step');

  const currentStep = steps[step];

  return (
    <Form {...methods}>
      <form className='w-full max-w-3xl mx-auto space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {currentStep.title}
          </h1>
          <p className='text-lg text-gray-600'>{currentStep.description}</p>
        </div>

        <div>{currentStep.content()}</div>

        <div className='fixed bottom-0 left-0 w-full py-4 px-4 sm:px-0 drop-shadow-sm grid grid-cols-2 gap-4 sm:relative sm:flex justify-between items-center'>
          <Button
            key='previous'
            variant='outline'
            onClick={() => methods.setValue('step', step - 1)}
            disabled={step === Step.BasicInfo}
            className='w-full sm:w-auto text-gray-600 hover:text-gray-900'
            type='button'
          >
            <ChevronLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <div className='hidden sm:block text-sm font-medium text-gray-500'>
            Step {step + 1} of 5
          </div>
          {step === Step.Review ? (
            <Button
              className='w-full sm:w-auto'
              key='submit'
              type='submit'
              variant='default'
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              className='w-full sm:w-auto'
              key={step}
              onClick={() => methods.setValue('step', step + 1)}
              type='button'
              variant='default'
            >
              Continue
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
