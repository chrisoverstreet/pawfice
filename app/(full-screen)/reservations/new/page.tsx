import NewReservationForm from '@/components/reservations/new/new-reservation-form';
import { Card } from '@/components/ui/card';

export default async function NewReservationPage() {
  return (
    <div className='space-y-6 max-w-3xl mx-auto'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold'>New Reservation</h1>
        <p className='text-muted'>
          Create a new reservation for one or more pets
        </p>
      </div>
      <Card className='py-4 px-6'>
        <NewReservationForm />
      </Card>
    </div>
  );
}
