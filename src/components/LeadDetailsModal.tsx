
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lead, updateLead } from '@/store/slices/leadsSlice';
import { Phone, Mail, MapPin, User, Calendar, DollarSign, UserCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailsModal({ lead, isOpen, onClose }: LeadDetailsModalProps) {
  const dispatch = useDispatch();
  const [selectedSalesPerson, setSelectedSalesPerson] = useState(lead?.salesPerson || '');

  const salesPeople = ['Sarah Johnson', 'John Martinez', 'Mike Wilson', 'Lisa Chen'];

  if (!lead) return null;

  const handleAssignSalesPerson = () => {
    if (selectedSalesPerson && lead) {
      dispatch(updateLead({ id: lead.id, salesPerson: selectedSalesPerson }));
      toast({
        title: "Sales Person Assigned",
        description: `${lead.customerName} has been assigned to ${selectedSalesPerson}.`,
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900/20 text-red-400 border-red-800';
      case 'medium': return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'low': return 'bg-green-900/20 text-green-400 border-green-800';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const servicesPricing = [
    { name: 'Initial Inspection', price: 120, included: lead.services.includes('Initial Inspection') },
    { name: 'Ant Treatment', price: 85, included: lead.services.includes('Ant Treatment') },
    { name: 'Cockroach Control', price: 95, included: lead.services.includes('Cockroach Control') },
    { name: 'Rodent Control', price: 150, included: lead.services.includes('Rodent Control') },
    { name: 'Termite Treatment', price: 350, included: lead.services.includes('Termite Treatment') },
    { name: 'Bee Removal', price: 200, included: lead.services.includes('Bee Removal') }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{lead.customerName}</DialogTitle>
            <Badge 
              variant="outline" 
              className={`${getPriorityColor(lead.priority)} uppercase`}
            >
              {lead.priority} Priority
            </Badge>
          </div>
          <p className="text-muted-foreground">{lead.customerType} Service</p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6 bg-accent/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Last Contact: {lead.lastContact}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/30">
              <h3 className="text-lg font-semibold mb-4">Service Requirements</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Problem Description:</span>
                  <p className="mt-1">{lead.problemDescription}</p>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>Estimated Value: <span className="font-semibold text-green-400">${lead.estimatedValue}</span></span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Assignment
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Currently Assigned:</span>
                  <p className="mt-1 font-medium">{lead.salesPerson || 'Unassigned'}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Assign to Sales Person:</span>
                  <div className="flex gap-2">
                    <Select
                      value={selectedSalesPerson}
                      onValueChange={setSelectedSalesPerson}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select sales person" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {salesPeople.map((person) => (
                          <SelectItem key={person} value={person}>
                            {person}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAssignSalesPerson} size="sm">
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-accent/30">
            <h3 className="text-lg font-semibold mb-4">Service Pricing</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center font-medium border-b border-border pb-2">
                <span>Service</span>
                <div className="flex gap-8">
                  <span>Price</span>
                  <span>Included</span>
                </div>
              </div>
              {servicesPricing.map((service) => (
                <div key={service.name} className="flex justify-between items-center py-2">
                  <span className="text-sm">{service.name}</span>
                  <div className="flex gap-8 items-center">
                    <span className="text-sm font-medium">${service.price}</span>
                    <div className="w-4 h-4 flex items-center justify-center">
                      {service.included && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
