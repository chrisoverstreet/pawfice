import WelcomeHeader from '@/app/(dashboard)/dashboard/welcome-header';

export default async function DashboardPage() {
  return (
    <div className='max-w-7xl mx-auto space-y-8'>
      <WelcomeHeader />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>TODO WeeklyCalendar</div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div>TODO BookingsList</div>
        </div>
        <div>
          <div>TODO TasksCard</div>
        </div>
      </div>
    </div>
  );
}
