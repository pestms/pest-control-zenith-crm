
import { useState } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lead } from '@/store/slices/leadsSlice';

interface LeadsTableProps {
  onViewDetails: (lead: Lead) => void;
}

export function LeadsTable({ onViewDetails }: LeadsTableProps) {
  const dispatch = useDispatch();
  const { filteredLeads } = useSelector((state: RootState) => state.leads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const salesPeople = ['Sarah Johnson', 'John Martinez', 'Mike Wilson', 'Lisa Chen'];

  const handleAssignSalesPerson = (leadId: string, salesPerson: string) => {
    dispatch(updateLead({ id: leadId, salesPerson }));
  };

  const handleConvertToQuotation = (leadId: string) => {
    dispatch(convertToQuotation(leadId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900/20 text-red-400 border-red-800';
      case 'medium': return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'low': return 'bg-green-900/20 text-green-400 border-green-800';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-blue-900/20 text-blue-400 border-blue-800';
      case 'quote': return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'contract': return 'bg-green-900/20 text-green-400 border-green-800';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  return (
    <Card className="bg-card border border-border/40">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left p-4 font-semibold text-sm">Customer</th>
              <th className="text-left p-4 font-semibold text-sm">Service Details</th>
              <th className="text-left p-4 font-semibold text-sm">Contact</th>
              <th className="text-left p-4 font-semibold text-sm">Status</th>
              <th className="text-left p-4 font-semibold text-sm">Value</th>
              <th className="text-left p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/20 hover:bg-accent/50">
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-medium">{lead.customerName}</div>
                    <div className="text-sm text-muted-foreground">{lead.customerType}</div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(lead.priority)}`}
                    >
                      {lead.priority} priority
                    </Badge>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{lead.serviceDetails}</div>
                    <div className="text-sm text-muted-foreground">{lead.address}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm">{lead.phone}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                    <div className="text-xs text-muted-foreground">{lead.lastContact}</div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(lead.status)}
                  >
                    {lead.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-green-400">
                    ${lead.estimatedValue.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(lead)}
                    >
                      View
                    </Button>
                    {lead.status === 'lead' && (
                      <>
                        <Select
                          value={lead.salesPerson || ''}
                          onValueChange={(value) => handleAssignSalesPerson(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border">
                            {salesPeople.map((person) => (
                              <SelectItem key={person} value={person}>
                                {person}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleConvertToQuotation(lead.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Quote
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
