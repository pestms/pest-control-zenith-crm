
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface TeamMember {
  name: string;
  leadsAssigned: number;
  leadsConverted: number;
  conversionRate: number;
}

interface Appointment {
  date: string;
  time: string;
  client: string;
  service: string;
  status: 'Scheduled' | 'Confirmed';
}

const teamMembers: TeamMember[] = [
  { name: 'Ethan Harper', leadsAssigned: 50, leadsConverted: 25, conversionRate: 50 },
  { name: 'Olivia Bennett', leadsAssigned: 75, leadsConverted: 40, conversionRate: 53 },
  { name: 'Noah Carter', leadsAssigned: 60, leadsConverted: 30, conversionRate: 50 },
];

const upcomingAppointments: Appointment[] = [
  {
    date: '2024-07-15',
    time: '10:00 AM',
    client: 'Sophia Clark',
    service: 'Residential Pest Control',
    status: 'Scheduled'
  },
  {
    date: '2024-07-16', 
    time: '2:00 PM',
    client: 'Liam Foster',
    service: 'Commercial Pest Control',
    status: 'Confirmed'
  },
  {
    date: '2024-07-17',
    time: '11:00 AM', 
    client: 'Ava Morgan',
    service: 'Termite Inspection',
    status: 'Scheduled'
  },
];

export function TeamPerformance() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border border-border/40">
        <h3 className="text-lg font-semibold mb-6">Team Performance</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/40">
            <div>Team Member</div>
            <div>Leads Assigned</div>
            <div>Leads Converted</div>
            <div>Conversion Rate</div>
          </div>
          
          {teamMembers.map((member) => (
            <div key={member.name} className="grid grid-cols-4 gap-4 items-center py-3">
              <div className="font-medium">{member.name}</div>
              <div className="text-muted-foreground">{member.leadsAssigned}</div>
              <div className="text-muted-foreground">{member.leadsConverted}</div>
              <div className="flex items-center gap-3">
                <Progress value={member.conversionRate} className="flex-1 h-2" />
                <span className="text-sm font-medium w-8">{member.conversionRate}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border border-border/40">
        <h3 className="text-lg font-semibold mb-6">Upcoming Appointments</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingAppointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell className="text-muted-foreground">{appointment.date}</TableCell>
                <TableCell className="text-muted-foreground">{appointment.time}</TableCell>
                <TableCell className="font-medium">{appointment.client}</TableCell>
                <TableCell className="text-muted-foreground">{appointment.service}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {appointment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
