import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { convertToQuotation, updateLead } from '@/store/slices/leadsSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Lead } from '@/store/slices/leadsSlice';
import { LeadActivities } from '@/components/LeadActivities';
import { Eye, FileText, Phone, Mail, MapPin, Building, Home, User, Plus } from 'lucide-react';

interface LeadsTableProps {
  onViewDetails: (lead: Lead) => void;
  onCreateQuotation: (lead: Lead) => void;
  onAddActivity?: (lead: Lead) => void;
}

export function LeadsTable({ onViewDetails, onCreateQuotation, onAddActivity }: LeadsTableProps) {
  const dispatch = useDispatch();
  const { filteredLeads } = useSelector((state: RootState) => state.leads);
  const { activities } = useSelector((state: RootState) => state.leadActivities);
  const [openActivities, setOpenActivities] = useState<{[key: string]: boolean}>({});

  const toggleActivities = (leadId: string) => {
    setOpenActivities(prev => ({
      ...prev,
      [leadId]: !prev[leadId]
    }));
  };

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
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCustomerIcon = (type: string) => {
    return type === 'Commercial' ? <Building className="w-4 h-4" /> : <Home className="w-4 h-4" />;
  };

  return (
    <Card className="bg-card border border-border/40">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40">
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[200px]">Customer</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[250px]">Service Details</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[200px]">Contact</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[120px]">Lead By</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[120px]">Assigned To</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[100px]">Status</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[100px]">Value</TableHead>
              <TableHead className="text-left p-4 font-semibold text-sm min-w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => {
              const leadActivities = activities.filter(activity => activity.leadId === lead.id);
              return (
                <React.Fragment key={lead.id}>
                  <TableRow className="border-b border-border/20 hover:bg-accent/50">
                    <TableCell className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full flex-shrink-0">
                          {getCustomerIcon(lead.customerType)}
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="font-medium truncate">{lead.customerName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            {getCustomerIcon(lead.customerType)}
                            <span className="truncate">{lead.customerType}</span>
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
                        <div className="font-medium text-sm line-clamp-2">{lead.serviceDetails}</div>
                        <div className="text-sm text-muted-foreground flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{lead.address}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{lead.lastContact}</div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">Website Form</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="text-sm flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">{lead.salesPerson || 'Unassigned'}</span>
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
                      <div className="flex flex-wrap gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(lead)}
                          className="p-2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onCreateQuotation(lead)}
                          className="p-2"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        {onAddActivity && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddActivity(lead)}
                            className="p-2"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {leadActivities.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-2 bg-accent/20">
                        <LeadActivities
                          activities={leadActivities}
                          isOpen={openActivities[lead.id] || false}
                          onToggle={() => toggleActivities(lead.id)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
