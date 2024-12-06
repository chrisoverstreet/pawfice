import StatsCard from '@/app/(dashboard)/dashboard/stats-card';
import WelcomeHeader from '@/app/(dashboard)/dashboard/welcome-header';
import { mockStats } from '@/data/mock-data';
import { Calendar, Clipboard, DollarSign, Users } from 'lucide-react';

export default async function DashboardPage() {
  return (
    <div className='max-w-7xl mx-auto space-y-8'>
      <WelcomeHeader />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatsCard
          title='Total Reservations'
          value={mockStats.activeReservations}
          icon={Calendar}
          trend={{ value: 12, label: 'vs last month' }}
        />
        <StatsCard
          title='Active Reservations'
          value={mockStats.activeReservations}
          icon={Clipboard}
        />
        <StatsCard
          title='Upcoming Reservations'
          value={mockStats.upcomingReservations}
          icon={Users}
        />
        <StatsCard
          title='Monthly Revenue'
          value={mockStats.monthlyRevenue}
          icon={DollarSign}
          trend={{ value: 8.2, label: 'vs last month' }}
        />
      </div>

      <div>TODO WeeklyCalendar</div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div>TODO ReservationsList</div>
        </div>
        <div>
          <div>TODO TasksCard</div>
        </div>
      </div>
    </div>
  );
}
