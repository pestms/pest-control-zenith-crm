
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsContainer } from '@/components/StatsContainer';
import { LeadsTable } from '@/components/UserLeadsTable';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Users, 
  UserCheck, 
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Mock user data - in real app this would come from your store/API
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@pestguard.com',
  phone: '+1 (555) 123-4567',
  role: 'admin',
  status: 'active',
  createdAt: '2024-01-15',
  avatar: '/placeholder.svg',
  department: 'Sales & Operations',
  location: 'New York, NY'
};

// Mock leads assigned to this user
const mockUserLeads = [
  {
    id: '1',
    customerName: 'City Hospital',
    customerType: 'Commercial',
    email: 'facilities@cityhospital.org',
    phone: '(555) 567-8901',
    address: '555 Health Boulevard',
    serviceDetails: 'Monthly pest prevention service',
    priority: 'low',
    status: 'contract',
    estimatedValue: 2400,
    lastContact: '1 week ago',
    createdAt: '2024-05-15'
  },
  {
    id: '2',
    customerName: 'Corner Grocery Store',
    customerType: 'Commercial',
    email: 'owner@cornerstore.com',
    phone: '(555) 789-0123',
    address: '202 Commerce Street',
    serviceDetails: 'Fly control in produce section',
    priority: 'medium',
    status: 'lead',
    estimatedValue: 450,
    lastContact: '6 hours ago',
    createdAt: '2024-05-28'
  }
];

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'back-office': return <UserCheck className="w-4 h-4" />;
      case 'agent': return <Users className="w-4 h-4" />;
      case 'sales': return <Phone className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'back-office': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-green-100 text-green-800';
      case 'sales': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats from user leads
  const totalLeads = mockUserLeads.length;
  const closedDeals = mockUserLeads.filter(lead => lead.status === 'contract').length;
  const totalRevenue = mockUserLeads
    .filter(lead => lead.status === 'contract')
    .reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const conversionRate = totalLeads > 0 ? Math.round((closedDeals / totalLeads) * 100) : 0;

  const userStats = [
    {
      title: 'Total Leads Assigned',
      value: totalLeads,
      change: '+12% from last month',
      icon: <Target className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Successfully Closed',
      value: closedDeals,
      change: `${conversionRate}% conversion rate`,
      icon: <CheckCircle className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Revenue Generated',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+18% from last month',
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Performance Score',
      value: '94%',
      change: '+5% from last month',
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 'up' as const
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/users')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">View user profile and performance metrics</p>
        </div>
      </div>

      {/* User Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side - Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge 
                variant="outline" 
                className={`${getRoleBadgeColor(mockUser.role)} flex items-center gap-1`}
              >
                {getRoleIcon(mockUser.role)}
                {mockUser.role.replace('-', ' ')}
              </Badge>
            </div>

            {/* Right Side - User Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                <p className="text-muted-foreground">{mockUser.department}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockUser.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined {mockUser.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={mockUser.status === 'active' ? 'default' : 'secondary'}>
                    {mockUser.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <StatsContainer stats={userStats} />

      {/* Assigned Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={mockUserLeads} />
        </CardContent>
      </Card>
    </div>
  );
}
