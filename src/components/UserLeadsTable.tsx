
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, FileText, Phone, Mail, MapPin, Building, Home } from 'lucide-react';

interface Lead {
  id: string;
  customerName: string;
  customerType: string;
  email: string;
  phone: string;
  address: string;
  serviceDetails: string;
  priority: string;
  status: string;
  estimatedValue: number;
  lastContact: string;
  createdAt: string;
}

interface UserLeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: UserLeadsTableProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'quote': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contract': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCustomerIcon = (type: string) => {
    return type === 'Commercial' ? <Building className="w-4 h-4" /> : <Home className="w-4 h-4" />;
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No leads assigned to this user yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border/40">
          <TableHead className="text-left p-4 font-semibold text-sm">Customer</TableHead>
          <TableHead className="text-left p-4 font-semibold text-sm">Service Details</TableHead>
          <TableHead className="text-left p-4 font-semibold text-sm">Contact</TableHead>
          <TableHead className="text-left p-4 font-semibold text-sm">Status</TableHead>
          <TableHead className="text-left p-4 font-semibold text-sm">Value</TableHead>
          <TableHead className="text-left p-4 font-semibold text-sm">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id} className="border-b border-border/20 hover:bg-accent/50">
            <TableCell className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  {getCustomerIcon(lead.customerType)}
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{lead.customerName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    {getCustomerIcon(lead.customerType)}
                    {lead.customerType}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getPriorityColor(lead.priority)}`}
                  >
                    {lead.priority} priority
                  </Badge>
                </div>
              </div>
            </TableCell>
            <TableCell className="p-4">
              <div className="space-y-1">
                <div className="font-medium text-sm">{lead.serviceDetails}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {lead.address}
                </div>
              </div>
            </TableCell>
            <TableCell className="p-4">
              <div className="space-y-1">
                <div className="text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {lead.phone}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {lead.email}
                </div>
                <div className="text-xs text-muted-foreground">{lead.lastContact}</div>
              </div>
            </TableCell>
            <TableCell className="p-4">
              <Badge 
                variant="outline" 
                className={getStatusColor(lead.status)}
              >
                {lead.status}
              </Badge>
            </TableCell>
            <TableCell className="p-4">
              <div className="font-semibold text-green-600">
                ${lead.estimatedValue.toLocaleString()}
              </div>
            </TableCell>
            <TableCell className="p-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
