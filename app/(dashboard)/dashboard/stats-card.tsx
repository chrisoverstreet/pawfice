import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <div className='card p-6'>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-gray-airbnb text-sm'>{title}</span>
        <Icon className='h-5 w-5 text-muted' />
      </div>
      <div className='space-y-1'>
        <div className='text-2xl font-semibold text-secondary'>{value}</div>
        {trend && (
          <div
            className={`flex items-center text-sm ${
              trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
            <span className='ml-1 text-gray-airbnb'>{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
