import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setSearchTerm, 
  setStatusFilter, 
  setPriorityFilter,
  addLead,
  Lead 
} from '@/store/slices/leadsSlice';
import { addActivity } from '@/store/slices/leadActivitiesSlice';
import { LeadDetailsModal } from '@/components/LeadDetailsModal';
import { QuotationModal } from '@/components/QuotationModal';
import { LeadActivityModal } from '@/components/LeadActivityModal';
import { LeadActivities } from '@/components/LeadActivities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Home, 
  DollarSign,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SalesLeads() {
  const dispatch = useDispatch();
  const { filteredLeads, searchTerm, statusFilter, priorityFilter } = useSelector((state: RootState) => state.leads);
  const { activities } = useSelector((state: RootState) => state.leadActivities);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [activityLeadId, setActivityLeadId] = useState<string>('');
  const [activityLeadName, setActivityLeadName] = useState<string>('');
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());
  
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

  const handleAddActivity = (leadId: string, leadName: string) => {
    setActivityLeadId(leadId);
    setActivityLeadName(leadName);
    setIsActivityModalOpen(true);
  };

  const handleActivityAdded = (activity: any) => {
    dispatch(addActivity(activity));
  };

  const toggleActivityExpansion = (leadId: string) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    setExpandedActivities(newExpanded);
  };

  const getLeadActivities = (leadId: string) => {
    return activities.filter(activity => activity.leadId === leadId);
  };

  return (
    <div className="space-y-4 p-2 sm:p-4 md:space-y-6 md:p-6 animate-fade-in max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">My Leads</h1>
          <p className="text-muted-foreground text-sm">({filteredLeads.length} leads)</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-2 w-[calc(100vw-1rem)] max-w-2xl bg-card border border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-4">
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
              
              <div className="space-y-4">
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
                  <Label htmlFor="email">Email *</Label>
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

              <div className="space-y-4">
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
                  onChange={(e) => setNewLead({...newLead, serviceDetails: e.target.value, problemDescription: e.target.value})}
                  className="bg-background border-border"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAddLead} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:gap-4 sm:items-center sm:space-y-0">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
            <SelectTrigger className="flex-1 sm:w-32 bg-background border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Quote">Quote</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={(value) => dispatch(setPriorityFilter(value))}>
            <SelectTrigger className="flex-1 sm:w-32 bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="All">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Leads Cards */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => {
          const leadActivities = getLeadActivities(lead.id);
          const isExpanded = expandedActivities.has(lead.id);
          
          return (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {lead.customerType === 'Commercial' ? 
                        <Building className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : 
                        <Home className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                      <h3 className="font-semibold text-sm sm:text-base truncate">{lead.customerName}</h3>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(lead.priority)}`}
                      >
                        {lead.priority}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(lead.status)}`}
                      >
                        {lead.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Service Details */}
                  <p className="text-sm text-muted-foreground line-clamp-2">{lead.serviceDetails || lead.problemDescription}</p>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{lead.address}</span>
                    </div>
                  </div>

                  {/* Activity History */}
                  {leadActivities.length > 0 && (
                    <LeadActivities
                      activities={leadActivities}
                      isOpen={isExpanded}
                      onToggle={() => toggleActivityExpansion(lead.id)}
                    />
                  )}

                  {/* Footer */}
                  <div className="flex flex-col gap-3 pt-2 border-t sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>${lead.estimatedValue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="truncate">{lead.lastContact}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddActivity(lead.id, lead.customerName)}
                        className="flex-1 sm:flex-initial"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Add Activity</span>
                        <span className="sm:hidden">Activity</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(lead)}
                        className="flex-1 sm:flex-initial"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleCreateQuotation(lead)}
                        className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Create Quote</span>
                        <span className="sm:hidden">Quote</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leads found matching your criteria.</p>
        </div>
      )}

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
        leadId={activityLeadId}
        leadName={activityLeadName}
        type="lead"
        onActivityAdded={handleActivityAdded}
      />
    </div>
  );
}
