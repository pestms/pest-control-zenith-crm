
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function LeadSourceChart() {
  const { leadSources } = useSelector((state: RootState) => state.dashboard);
  const totalLeads = leadSources.reduce((sum, source) => sum + source.count, 0);

  return (
    <Card className="p-6 bg-card border border-border/40">
      <h3 className="text-lg font-semibold mb-6">Lead Sources by Area</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {leadSources.map((source, index) => {
              const prevPercentage = leadSources
                .slice(0, index)
                .reduce((sum, s) => sum + s.percentage, 0);
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(source.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((prevPercentage / 100) * circumference);

              return (
                <circle
                  key={source.area}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={source.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalLeads}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {leadSources.map((source) => (
          <div key={source.area} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-sm font-medium">{source.area}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{source.count}</div>
              <div className="text-xs text-muted-foreground">({source.percentage}%)</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
