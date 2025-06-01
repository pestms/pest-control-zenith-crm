
import { StatsCard } from '@/components/StatsCard';

interface StatsContainerProps {
  stats: Array<{
    title: string;
    value: string | number;
    change: string;
    icon: React.ReactNode;
    trend: 'up' | 'down';
  }>;
}

export function StatsContainer({ stats }: StatsContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}
