
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MapPin, Phone, Mail, DollarSign, Calendar, Building, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock leads data for agent
const mockAgentLeads = [
  {
    id: '1',
    customerName: 'Johnson Family',
    customerType: 'Residential',
    email: 'johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, Suburbia',
    serviceDetails: 'Ant infestation in kitchen',
    priority: 'high',
    status: 'lead',
    estimatedValue: 350,
    createdAt: '2024-05-28'
  },
  {
    id: '2',
    customerName: 'Local Cafe',
    customerType: 'Commercial',
    email: 'owner@localcafe.com',
    phone: '(555) 234-5678',
    address: '456 Main Street, Downtown',
    serviceDetails: 'Cockroach control needed',
    priority: 'medium',
    status: 'quote',
    estimatedValue: 750,
    createdAt: '2024-05-27'
  }
];

export default function AgentLeads() {
  const [leads, setLeads] = useState(mockAgentLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    customerName: '',
    customerType: 'Residential' as 'Residential' | 'Commercial',
    email: '',
    phone: '',
    address: '',
    serviceDetails: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    estimatedValue: 0,
  });

  const handleAddLead = () => {
    if (!newLead.customerName || !newLead.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const lead = {
      ...newLead,
      id: Date.now().toString(),
      status: 'lead' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeads([lead, ...leads]);
    setIsAddModalOpen(false);
    setNewLead({
      customerName: '',
      customerType: 'Residential',
      email: '',
      phone: '',
      address: '',
      serviceDetails: '',
      priority: 'medium',
      estimatedValue: 0,
    });
    
    toast({
      title: "Lead Added",
      description: "New lead has been successfully created.",
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.serviceDetails.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Leads</h1>
          <p className="text-muted-foreground">({filteredLeads.length} leads)</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 max-w-2xl bg-card border border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={newLead.customerName}
                    onChange={(e) => setNewLead({...newLead, customerName: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select
                    value={newLead.customerType}
                    onValueChange={(value: 'Residential' | 'Commercial') => 
                      setNewLead({...newLead, customerType: value})
                    }
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newLead.address}
                  onChange={(e) => setNewLead({...newLead, address: e.target.value})}
                  className="bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newLead.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high') => 
                      setNewLead({...newLead, priority: value})
                    }
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    value={newLead.estimatedValue}
                    onChange={(e) => setNewLead({...newLead, estimatedValue: Number(e.target.value)})}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDetails">Service Details</Label>
                <Textarea
                  id="serviceDetails"
                  value={newLead.serviceDetails}
                  onChange={(e) => setNewLead({...newLead, serviceDetails: e.target.value})}
                  className="bg-background border-border"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="w-full md:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAddLead} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-3 md:flex-row md:gap-4 md:items-center md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40 bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border">
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Quote">Quote</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile-First Leads Cards */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {lead.customerType === 'Commercial' ? 
                      <Building className="w-4 h-4 text-muted-foreground" /> : 
                      <Home className="w-4 h-4 text-muted-foreground" />
                    }
                    <h3 className="font-semibold">{lead.customerName}</h3>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(lead.status)}
                  >
                    {lead.status}
                  </Badge>
                </div>

                {/* Service Details */}
                <p className="text-sm text-muted-foreground">{lead.serviceDetails}</p>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span>{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span>{lead.email}</span>
                    </div>
                  )}
                  {lead.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span>{lead.address}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(lead.priority)}`}
                    >
                      {lead.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>${lead.estimatedValue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{lead.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leads found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
