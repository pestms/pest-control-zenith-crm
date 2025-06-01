
import { createSlice } from '@reduxjs/toolkit';

interface DashboardStats {
  monthlyRevenue: number;
  revenueChange: string;
  activeContracts: number;
  contractsChange: string;
  leadConversion: number;
  conversionChange: string;
  quoteSuccessRate: number;
  quoteChange: string;
}

interface LeadSource {
  area: string;
  count: number;
  percentage: number;
  color: string;
}

interface ConversionFlow {
  totalLeads: number;
  quotations: number;
  contracts: number;
  conversionRate: number;
  bestMonth: string;
  monthlyData: {
    month: string;
    leads: number;
    quotations: number;
    contracts: number;
  }[];
}

interface DashboardState {
  stats: DashboardStats;
  leadSources: LeadSource[];
  conversionFlow: ConversionFlow;
}

const initialState: DashboardState = {
  stats: {
    monthlyRevenue: 24750,
    revenueChange: '+15%($3,600)',
    activeContracts: 147,
    contractsChange: '+12%(16)',
    leadConversion: 68,
    conversionChange: '+5%',
    quoteSuccessRate: 73,
    quoteChange: '+8%'
  },
  leadSources: [
    { area: 'Downtown District', count: 89, percentage: 17, color: '#3B82F6' },
    { area: 'Business District', count: 76, percentage: 15, color: '#10B981' },
    { area: 'Residential Zone', count: 134, percentage: 26, color: '#F59E0B' },
    { area: 'Shopping Area', count: 98, percentage: 19, color: '#EF4444' },
    { area: 'Medical District', count: 65, percentage: 13, color: '#8B5CF6' },
    { area: 'Industrial Zone', count: 47, percentage: 9, color: '#6B7280' }
  ],
  conversionFlow: {
    totalLeads: 481,
    quotations: 294,
    contracts: 193,
    conversionRate: 40,
    bestMonth: 'March showed the highest conversion with 38 contracts from 83 leads',
    monthlyData: [
      { month: 'Jan', leads: 65, quotations: 42, contracts: 28 },
      { month: 'Feb', leads: 78, quotations: 48, contracts: 31 },
      { month: 'Mar', leads: 83, quotations: 52, contracts: 38 },
      { month: 'Apr', leads: 71, quotations: 45, contracts: 29 },
      { month: 'May', leads: 89, quotations: 56, contracts: 35 },
      { month: 'Jun', leads: 95, quotations: 51, contracts: 32 }
    ]
  }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {}
});

export default dashboardSlice.reducer;
