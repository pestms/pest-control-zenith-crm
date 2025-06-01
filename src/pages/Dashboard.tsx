
import { StatsCard } from '@/components/StatsCard';
import { LeadSourceChart } from '@/components/LeadSourceChart';
import { ConversionFlowChart } from '@/components/ConversionFlowChart';
import { TeamPerformance } from '@/components/TeamPerformance';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { DollarSign, FileText, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { stats } = useSelector((state: RootState) => state.dashboard);
  const { leads } = useSelector((state: RootState) => state.leads);

  const newLeads = leads.filter(lead => {
    const today = new Date();
    const leadDate = new Date(lead.createdAt);
    const diffTime = Math.abs(today.getTime() - leadDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  });

  const pendingQuotes = leads.filter(lead => lead.status === 'quote').length;
  const contractsToReview = leads.filter(lead => lead.status === 'contract').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back, Sarah!</h1>
        <p className="text-muted-foreground">
          Today you have <span className="font-semibold text-foreground">{newLeads.length} new leads</span>, 
          <span className="font-semibold text-foreground"> {pendingQuotes} quotes pending</span>, and 
          <span className="font-semibold text-foreground"> {contractsToReview} contracts to review</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={<DollarSign className="w-6 h-6" />}
          trend="up"
        />
        <StatsCard
          title="Active Contracts"
          value={stats.activeContracts}
          change={stats.contractsChange}
          icon={<FileText className="w-6 h-6" />}
          trend="up"
        />
        <StatsCard
          title="Lead Conversion"
          value={`${stats.leadConversion}%`}
          change={stats.conversionChange}
          icon={<Target className="w-6 h-6" />}
          trend="up"
        />
        <StatsCard
          title="Quote Success Rate"
          value={`${stats.quoteSuccessRate}%`}
          change={stats.quoteChange}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadSourceChart />
        <ConversionFlowChart />
      </div>

      <TeamPerformance />
    </div>
  );
}
