
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsContainer } from '@/components/StatsContainer';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Users, 
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Mock agent data
const mockAgent = {
  id: '2',
  name: 'Mike Wilson',
  email: 'mike@pestguard.com',
  phone: '+1 (555) 987-6543',
  role: 'agent',
  status: 'active',
  createdAt: '2024-02-20',
  avatar: '/placeholder.svg',
  department: 'Field Operations',
  location: 'Los Angeles, CA'
};

export default function AgentProfile() {
  const getRoleIcon = (role: string) => {
    return <Users className="w-4 h-4" />;
  };

  const getRoleBadgeColor = (role: string) => {
    return 'bg-green-100 text-green-800';
  };

  // Agent performance stats
  const agentStats = [
    {
      title: 'Leads Created',
      value: 24,
      change: '+8% from last month',
      icon: <Target className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Successfully Closed',
      value: 18,
      change: '75% success rate',
      icon: <CheckCircle className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Revenue Generated',
      value: '$12,400',
      change: '+22% from last month',
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: 'Performance Score',
      value: '91%',
      change: '+3% from last month',
      icon: <TrendingUp className="h-4 w-4" />,
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
                <AvatarImage src={mockAgent.avatar} alt={mockAgent.name} />
                <AvatarFallback className="text-xl md:text-2xl font-bold">
                  {mockAgent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge 
                variant="outline" 
                className={`${getRoleBadgeColor(mockAgent.role)} flex items-center gap-1`}
              >
                {getRoleIcon(mockAgent.role)}
                {mockAgent.role}
              </Badge>
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">{mockAgent.name}</h2>
                <p className="text-muted-foreground">{mockAgent.department}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockAgent.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mockAgent.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined {mockAgent.createdAt}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge variant={mockAgent.status === 'active' ? 'default' : 'secondary'}>
                    {mockAgent.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <StatsContainer stats={agentStats} />
    </div>
  );
}
