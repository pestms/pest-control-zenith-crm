
import { StatsCard } from '@/components/StatsCard';
import { LeadSourceChart } from '@/components/LeadSourceChart';
import { ConversionFlowChart } from '@/components/ConversionFlowChart';
import { TeamPerformance } from '@/components/TeamPerformance';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { DollarSign, FileText, Target, TrendingUp, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
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
  const urgentLeads = leads.filter(lead => lead.priority === 'high').length;

  // Recent Activities (mock data for demonstration)
  const recentActivities = [
    { id: 1, type: 'New Lead', description: 'Ant infestation reported by John Smith', time: '2 minutes ago', priority: 'high' },
    { id: 2, type: 'Quote Sent', description: 'Termite treatment quote sent to Mary Johnson', time: '15 minutes ago', priority: 'medium' },
    { id: 3, type: 'Contract Signed', description: 'Rodent control contract signed by ABC Corp', time: '1 hour ago', priority: 'low' },
    { id: 4, type: 'Service Completed', description: 'Cockroach treatment completed at 123 Main St', time: '2 hours ago', priority: 'low' }
  ];

  const upcomingAppointments = [
    { id: 1, customer: 'Sarah Wilson', service: 'Termite Inspection', time: 'Today 2:00 PM', address: '456 Oak Ave' },
    { id: 2, customer: 'Mike Chen', service: 'Ant Treatment', time: 'Today 4:30 PM', address: '789 Pine St' },
    { id: 3, customer: 'Emma Davis', service: 'Follow-up Visit', time: 'Tomorrow 9:00 AM', address: '321 Elm Rd' }
  ];

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

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.priority === 'high' ? 'bg-red-500' : 
                      activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/leads')}
            >
              <div className="flex items-center justify-between w-full">
                <span>Urgent Leads</span>
                <Badge variant="destructive">{urgentLeads}</Badge>
              </div>
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/quotations')}
            >
              <div className="flex items-center justify-between w-full">
                <span>Pending Quotes</span>
                <Badge variant="secondary">{pendingQuotes}</Badge>
              </div>
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
            >
              <div className="flex items-center justify-between w-full">
                <span>Today's Appointments</span>
                <Badge variant="outline">{upcomingAppointments.filter(apt => apt.time.includes('Today')).length}</Badge>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{appointment.customer}</h4>
                  <Badge variant={appointment.time.includes('Today') ? 'default' : 'secondary'}>
                    {appointment.time.includes('Today') ? 'Today' : 'Tomorrow'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{appointment.service}</p>
                <p className="text-sm font-medium">{appointment.time}</p>
                <p className="text-xs text-muted-foreground">{appointment.address}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadSourceChart />
        <ConversionFlowChart />
      </div>

      <TeamPerformance />
    </div>
  );
}
