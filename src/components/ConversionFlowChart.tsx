
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartConfig = {
  leads: {
    label: "Leads",
    color: "#3B82F6",
  },
  quotations: {
    label: "Quotations", 
    color: "#F59E0B",
  },
  contracts: {
    label: "Contracts",
    color: "#10B981",
  },
};

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

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium">{conversionFlow.conversionRate}% Conversion Rate</span>
        </div>
        <p className="text-sm text-muted-foreground">{conversionFlow.bestMonth}</p>
      </div>

      <div className="h-64 mb-4">
        <ChartContainer config={chartConfig}>
          <BarChart data={conversionFlow.monthlyData}>
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="leads" fill="var(--color-leads)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="quotations" fill="var(--color-quotations)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="contracts" fill="var(--color-contracts)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>Leads</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span>Quotations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span>Contracts</span>
        </div>
      </div>
    </Card>
  );
}
