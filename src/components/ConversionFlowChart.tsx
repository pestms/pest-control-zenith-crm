
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function ConversionFlowChart() {
  const { conversionFlow } = useSelector((state: RootState) => state.dashboard);

  return (
    <Card className="p-6 bg-card border border-border/40">
      <h3 className="text-lg font-semibold mb-6">Lead Conversion Flow</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">{conversionFlow.totalLeads}</div>
          <div className="text-sm text-muted-foreground">Total Leads</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">{conversionFlow.quotations}</div>
          <div className="text-sm text-muted-foreground">Quotations</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{conversionFlow.contracts}</div>
          <div className="text-sm text-muted-foreground">Contracts</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium">{conversionFlow.conversionRate}% Conversion Rate</span>
        </div>
        <p className="text-sm text-muted-foreground">{conversionFlow.bestMonth}</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Monthly Breakdown</h4>
        {conversionFlow.monthlyData.map((month) => (
          <div key={month.month} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{month.month}</span>
              <span className="text-muted-foreground">
                {month.leads} → {month.quotations} → {month.contracts}
              </span>
            </div>
            <div className="flex gap-1 h-2">
              <div
                className="bg-blue-400 rounded-sm"
                style={{ width: `${(month.leads / 100) * 100}%` }}
              />
              <div
                className="bg-yellow-400 rounded-sm"
                style={{ width: `${(month.quotations / 100) * 100}%` }}
              />
              <div
                className="bg-green-400 rounded-sm"
                style={{ width: `${(month.contracts / 100) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
