
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Bug, TrendingUp, Calendar, DollarSign, MapPin, Clock } from 'lucide-react';

const serviceTypes = [
  { name: 'Ant Treatment', value: 35, color: '#8884d8' },
  { name: 'Termite Control', value: 25, color: '#82ca9d' },
  { name: 'Rodent Control', value: 20, color: '#ffc658' },
  { name: 'Cockroach Control', value: 15, color: '#ff7300' },
  { name: 'Others', value: 5, color: '#8dd1e1' }
];

const monthlyTrends = [
  { month: 'Jan', leads: 45, contracts: 32, revenue: 48000 },
  { month: 'Feb', leads: 52, contracts: 38, revenue: 52000 },
  { month: 'Mar', leads: 48, contracts: 35, revenue: 49000 },
  { month: 'Apr', leads: 61, contracts: 42, revenue: 58000 },
  { month: 'May', leads: 55, contracts: 39, revenue: 54000 },
  { month: 'Jun', leads: 67, contracts: 48, revenue: 67000 }
];

const pestSeasonality = [
  { month: 'Jan', ants: 20, termites: 15, rodents: 35, cockroaches: 25 },
  { month: 'Feb', ants: 25, termites: 18, rodents: 30, cockroaches: 22 },
  { month: 'Mar', ants: 35, termites: 25, rodents: 25, cockroaches: 20 },
  { month: 'Apr', ants: 45, termites: 35, rodents: 20, cockroaches: 18 },
  { month: 'May', ants: 55, termites: 45, rodents: 15, cockroaches: 15 },
  { month: 'Jun', ants: 65, termites: 55, rodents: 12, cockroaches: 18 }
];

const areaData = [
  { area: 'Downtown', contracts: 45, avgValue: 850 },
  { area: 'Suburbs', contracts: 67, avgValue: 1200 },
  { area: 'Industrial', contracts: 23, avgValue: 2100 },
  { area: 'Residential', contracts: 89, avgValue: 750 },
  { area: 'Commercial', contracts: 34, avgValue: 1800 }
];

export default function Analytics() {
  const { leads } = useSelector((state: RootState) => state.leads);
  const { quotations } = useSelector((state: RootState) => state.quotations);

  const totalRevenue = 284000;
  const avgResponseTime = 2.4;
  const customerSatisfaction = 94.5;
  const repeatCustomers = 67;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Pest control business insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}h</div>
            <p className="text-xs text-muted-foreground">-15% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repeatCustomers}%</div>
            <p className="text-xs text-muted-foreground">+8% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Percentage", color: "hsl(var(--chart-1))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                leads: { label: "Leads", color: "hsl(var(--chart-1))" },
                contracts: { label: "Contracts", color: "hsl(var(--chart-2))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="contracts" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pest Seasonality */}
        <Card>
          <CardHeader>
            <CardTitle>Pest Activity Seasonality</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ants: { label: "Ants", color: "#8884d8" },
                termites: { label: "Termites", color: "#82ca9d" },
                rodents: { label: "Rodents", color: "#ffc658" },
                cockroaches: { label: "Cockroaches", color: "#ff7300" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pestSeasonality}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="ants" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="termites" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="rodents" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="cockroaches" stackId="1" stroke="#ff7300" fill="#ff7300" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Area Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                contracts: { label: "Contracts", color: "hsl(var(--chart-1))" },
                avgValue: { label: "Avg Value", color: "hsl(var(--chart-2))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="contracts" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Revenue ($)", color: "hsl(var(--chart-1))" }
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
