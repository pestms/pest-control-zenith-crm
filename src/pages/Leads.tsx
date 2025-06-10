import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setSearchTerm, 
  setStatusFilter, 
  setPriorityFilter, 
  setSortBy,
  addLead,
  Lead 
} from '@/store/slices/leadsSlice';
import { addActivity } from '@/store/slices/leadActivitiesSlice';
import { LeadsTable } from '@/components/LeadsTable';
import { LeadDetailsModal } from '@/components/LeadDetailsModal';
import { QuotationModal } from '@/components/QuotationModal';
import { LeadActivityModal } from '@/components/LeadActivityModal';
import { StatsContainer } from '@/components/StatsContainer';
import { useLeadStats } from '@/hooks/useLeadStats';
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
import { Search, Plus, Filter, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Leads() {
  const dispatch = useDispatch();
  const { filteredLeads, searchTerm, statusFilter, priorityFilter } = useSelector((state: RootState) => state.leads);
  const leadStats = useLeadStats();
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newLead, setNewLead] = useState({
    customerName: '',
    customerType: 'Residential' as 'Residential' | 'Commercial',
    email: '',
    phone: '',
    address: '',
    serviceDetails: '',
    problemDescription: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    estimatedValue: 0,
    status: 'lead' as 'lead' | 'quote' | 'contract',
    lastContact: 'Just now',
    services: [] as string[]
  });

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  const handleCreateQuotation = (lead: Lead) => {
    setSelectedLead(lead);
    setIsQuotationModalOpen(true);
  };

  const handleAddActivity = (lead: Lead) => {
    setSelectedLead(lead);
    setIsActivityModalOpen(true);
  };

  const handleActivityAdded = (activity: any) => {
    dispatch(addActivity(activity));
  };

  const handleAddLead = () => {
    if (!newLead.customerName || !newLead.email || !newLead.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    dispatch(addLead(newLead));
    setIsAddModalOpen(false);
    setNewLead({
      customerName: '',
      customerType: 'Residential',
      email: '',
      phone: '',
      address: '',
      serviceDetails: '',
      problemDescription: '',
      priority: 'medium',
      estimatedValue: 0,
      status: 'lead',
      lastContact: 'Just now',
      services: []
    });
    
    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to the system.",
    });
  };

  const serviceOptions = [
    'Initial Inspection',
    'Ant Treatment',
    'Cockroach Control',
    'Rodent Control',
    'Termite Treatment',
    'Bee Removal',
    'Fly Control',
    'Spider Control',
    'Preventive Treatment'
  ];

  const statsData = [
    {
      title: "Total Leads",
      value: leadStats.totalLeads,
      change: "+12% from last month",
      icon: <Users className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: "Hot Leads",
      value: leadStats.hotLeads,
      change: "+8% from last month",
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: "Closed Deals",
      value: leadStats.closedLeads,
      change: "+15% from last month",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: "Lost Leads",
      value: leadStats.lostLeads,
      change: "-5% from last month",
      icon: <XCircle className="w-6 h-6" />,
      trend: 'down' as const
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pest Control Leads</h1>
          <p className="text-muted-foreground">({filteredLeads.length})</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border border-border mx-4">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newLead.address}
                  onChange={(e) => setNewLead({...newLead, address: e.target.value})}
                  className="bg-background border-border"
                />
              </div>
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
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label htmlFor="problemDescription">Problem Description</Label>
                <Textarea
                  id="problemDescription"
                  value={newLead.problemDescription}
                  onChange={(e) => setNewLead({...newLead, problemDescription: e.target.value, serviceDetails: e.target.value})}
                  className="bg-background border-border"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLead} className="bg-blue-600 hover:bg-blue-700">
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <StatsContainer stats={statsData} />

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
            <SelectTrigger className="w-full sm:w-40 bg-background border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="All">Status: All</SelectItem>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Quote">Quote</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={(value) => dispatch(setPriorityFilter(value))}>
            <SelectTrigger className="w-full sm:w-40 bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="All">Priority: All</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => dispatch(setSortBy(value))}>
            <SelectTrigger className="w-full sm:w-32 bg-background border-border">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <LeadsTable 
          onViewDetails={handleViewDetails} 
          onCreateQuotation={handleCreateQuotation}
          onAddActivity={handleAddActivity}
        />
      </div>

      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <QuotationModal
        lead={selectedLead}
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
      />

      <LeadActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        leadId={selectedLead?.id || ''}
        leadName={selectedLead?.customerName || ''}
        type="lead"
        onActivityAdded={handleActivityAdded}
      />
    </div>
  );
}
