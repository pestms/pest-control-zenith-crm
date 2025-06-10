
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsContainer } from '@/components/StatsContainer';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

// Mock sales agent data
const mockSalesAgent = {
  id: '3',
  name: 'Alex Thompson',
  email: 'alex@pestguard.com',
  phone: '+1 (555) 456-7890',
  role: 'sales',
  status: 'active',
  createdAt: '2024-01-15',
  avatar: '/placeholder.svg',
  department: 'Sales Department',
  location: 'San Francisco, CA'
};

export default function SalesProfile() {
  const getRoleIcon = (role: string) => {
    return <Users className="w-4 h-4" />;
  };

  const getRoleBadgeColor = (role: string) => {
    return 'bg-blue-100 text-blue-800';
  };

  // Sales agent performance stats
  const salesStats = [
    {
      title: 'Active Leads',
      value: 32,
      change: '+12% from last month',
      icon: <Target className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Quotations Created',
      value: 18,
      change: '+6 this month',
      icon: <FileText className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Converted to Contracts',
      value: 14,
      change: '78% conversion rate',
      icon: <CheckCircle className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Revenue This Month',
      value: '$18,750',
      change: '+28% from last month',
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Personal Details</h1>
        <p className="text-muted-foreground">Your profile and performance overview</p>
      </div>

      {/* User Profile Section */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={mockSalesAgent.avatar} alt={mockSalesAgent.name} />
                <AvatarFallback className="text-xl md:text-2xl font-bold">
                  {mockSalesAgent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge 
                variant="outline" 
                className={`${getRoleBadgeColor(mockSalesAgent.role)} flex items-center gap-1`}
              >
                {getRoleIcon(mockSalesAgent.role)}
                {mockSalesAgent.role}
              </Badge>
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">{mockSalesAgent.name}</h2>
                <p className="text-muted-foreground">{mockSalesAgent.department}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockSalesAgent.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockSalesAgent.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined {mockSalesAgent.createdAt}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge variant={mockSalesAgent.status === 'active' ? 'default' : 'secondary'}>
                    {mockSalesAgent.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <StatsContainer stats={salesStats} />
    </div>
  );
}
