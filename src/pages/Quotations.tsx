import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setSearchTerm, 
  setStatusFilter, 
  addQuotation,
  updateQuotation,
  convertToContract,
  toggleShowAllVersions
} from '@/store/slices/quotationsSlice';
import { StatsContainer } from '@/components/StatsContainer';
import { useQuotationStats } from '@/hooks/useQuotationStats';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Search, Plus, FileText, CheckCircle, XCircle, Edit, Clock, History, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { QuotationVersions } from '@/components/QuotationVersions';
import { CreateRevisionModal } from '@/components/CreateRevisionModal';

export default function Quotations() {
  const dispatch = useDispatch();
  const { filteredQuotations, searchTerm, statusFilter, showAllVersions } = useSelector((state: RootState) => state.quotations);
  const { leads } = useSelector((state: RootState) => state.leads);
  const quotationStats = useQuotationStats();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

  const availableLeads = leads.filter(lead => lead.status === 'lead');

  const [newQuotation, setNewQuotation] = useState({
    leadId: '',
    customerName: '',
    customerType: 'Residential' as 'Residential' | 'Commercial',
    email: '',
    phone: '',
    address: '',
    problemDescription: '',
    salesPerson: '',
    estimatedValue: 0,
    status: 'pending' as 'pending' | 'approved' | 'rejected' | 'revised',
    services: [
      { name: 'Initial Inspection', price: 120, included: true },
      { name: 'Ant Treatment', price: 85, included: false },
      { name: 'Cockroach Control', price: 95, included: false },
      { name: 'Rodent Control', price: 150, included: false },
      { name: 'Termite Treatment', price: 350, included: false },
    ],
    validUntil: '',
    notes: ''
  });

  const getVersionDisplay = (quotation: any) => {
    if (quotation.version === 1 && !quotation.parentQuotationId) {
      return 'Original';
    }
    return `v${quotation.version}`;
  };

  const handleAddQuotation = () => {
    if (!newQuotation.customerName || !newQuotation.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const totalValue = newQuotation.services
      .filter(service => service.included)
      .reduce((sum, service) => sum + service.price, 0);

    dispatch(addQuotation({
      ...newQuotation,
      estimatedValue: totalValue,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    setIsAddModalOpen(false);
    setNewQuotation({
      leadId: '',
      customerName: '',
      customerType: 'Residential',
      email: '',
      phone: '',
      address: '',
      problemDescription: '',
      salesPerson: '',
      estimatedValue: 0,
      status: 'pending',
      services: [
        { name: 'Initial Inspection', price: 120, included: true },
        { name: 'Ant Treatment', price: 85, included: false },
        { name: 'Cockroach Control', price: 95, included: false },
        { name: 'Rodent Control', price: 150, included: false },
        { name: 'Termite Treatment', price: 350, included: false },
      ],
      validUntil: '',
      notes: ''
    });

    toast({
      title: "Quotation Created",
      description: "New quotation has been successfully created.",
    });
  };

  const handleConvertToContract = (quotationId: string) => {
    dispatch(convertToContract(quotationId));
    toast({
      title: "Contract Created",
      description: "Quotation has been converted to a contract.",
    });
  };

  const handleUpdateStatus = (quotationId: string, status: 'pending' | 'approved' | 'rejected' | 'revised') => {
    dispatch(updateQuotation({ id: quotationId, status }));
    toast({
      title: "Status Updated",
      description: `Quotation status has been updated to ${status}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'approved': return 'bg-green-900/20 text-green-400 border-green-800';
      case 'rejected': return 'bg-red-900/20 text-red-400 border-red-800';
      case 'revised': return 'bg-blue-900/20 text-blue-400 border-blue-800';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const toggleService = (index: number) => {
    const updatedServices = [...newQuotation.services];
    updatedServices[index].included = !updatedServices[index].included;
    setNewQuotation({ ...newQuotation, services: updatedServices });
  };

  const statsData = [
    {
      title: "Total Quotations",
      value: quotationStats.totalQuotations,
      change: "+18% from last month",
      icon: <FileText className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: "In Progress",
      value: quotationStats.pendingQuotations,
      change: "+10% from last month",
      icon: <Clock className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: "Rejected",
      value: quotationStats.rejectedQuotations,
      change: "-12% from last month",
      icon: <XCircle className="w-6 h-6" />,
      trend: 'down' as const
    },
    {
      title: "Converted to Contracts",
      value: quotationStats.convertedToContract,
      change: "+25% from last month",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: 'up' as const
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground">({filteredQuotations.length})</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => dispatch(toggleShowAllVersions())}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            {showAllVersions ? 'Show Latest Only' : 'Show All Versions'}
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Quotation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
              <DialogHeader>
                <DialogTitle>Create New Quotation</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={newQuotation.customerName}
                      onChange={(e) => setNewQuotation({...newQuotation, customerName: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newQuotation.email}
                      onChange={(e) => setNewQuotation({...newQuotation, email: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newQuotation.phone}
                      onChange={(e) => setNewQuotation({...newQuotation, phone: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newQuotation.address}
                      onChange={(e) => setNewQuotation({...newQuotation, address: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salesPerson">Sales Person</Label>
                    <Select
                      value={newQuotation.salesPerson}
                      onValueChange={(value) => setNewQuotation({...newQuotation, salesPerson: value})}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select sales person" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="John Martinez">John Martinez</SelectItem>
                        <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                        <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="problemDescription">Problem Description</Label>
                    <Textarea
                      id="problemDescription"
                      value={newQuotation.problemDescription}
                      onChange={(e) => setNewQuotation({...newQuotation, problemDescription: e.target.value})}
                      className="bg-background border-border"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Service Pricing</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between items-center font-medium border-b border-border pb-2">
                        <span>Service</span>
                        <div className="flex gap-8">
                          <span>Price</span>
                          <span>Include</span>
                        </div>
                      </div>
                      {newQuotation.services.map((service, index) => (
                        <div key={service.name} className="flex justify-between items-center py-2">
                          <span className="text-sm">{service.name}</span>
                          <div className="flex gap-8 items-center">
                            <span className="text-sm font-medium">${service.price}</span>
                            <input
                              type="checkbox"
                              checked={service.included}
                              onChange={() => toggleService(index)}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between items-center font-semibold">
                          <span>Total:</span>
                          <span className="text-green-400">
                            ${newQuotation.services
                              .filter(service => service.included)
                              .reduce((sum, service) => sum + service.price, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newQuotation.notes}
                      onChange={(e) => setNewQuotation({...newQuotation, notes: e.target.value})}
                      className="bg-background border-border"
                      rows={3}
                      placeholder="Additional notes or terms..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddQuotation} className="bg-blue-600 hover:bg-blue-700">
                  Create Quotation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <StatsContainer stats={statsData} />

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
          <SelectTrigger className="w-40 bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border">
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Revised">Revised</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredQuotations.map((quotation) => (
          <Card key={quotation.id} className="p-6 bg-card border border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{quotation.customerName}</h3>
                  <Badge variant="outline" className="text-xs">
                    {getVersionDisplay(quotation)}
                  </Badge>
                  {quotation.isLatestVersion && (
                    <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-800">
                      Latest
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{quotation.customerType} Service</p>
                <p className="text-sm text-muted-foreground">ID: {quotation.id}</p>
                {quotation.revisionReason && (
                  <p className="text-xs text-muted-foreground italic mt-1">
                    Revision reason: {quotation.revisionReason}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={getStatusColor(quotation.status)}
                >
                  {quotation.status}
                </Badge>
                <span className="text-lg font-bold text-green-400">
                  ${quotation.estimatedValue.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{quotation.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm">{quotation.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sales Person</p>
                <p className="text-sm">{quotation.salesPerson}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valid Until</p>
                <p className="text-sm">{quotation.validUntil}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Problem Description</p>
              <p className="text-sm">{quotation.problemDescription}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Included Services</p>
              <div className="flex flex-wrap gap-2">
                {quotation.services
                  .filter(service => service.included)
                  .map((service) => (
                    <Badge key={service.name} variant="secondary" className="text-xs">
                      {service.name} - ${service.price}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Select
                  value={quotation.status}
                  onValueChange={(value) => handleUpdateStatus(quotation.id, value as any)}
                >
                  <SelectTrigger className="w-32 bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="revised">Revised</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                {quotation.isLatestVersion && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedQuotation(quotation);
                      setIsRevisionModalOpen(true);
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Create Revision
                  </Button>
                )}
                {quotation.status === 'approved' && (
                  <Button
                    size="sm"
                    onClick={() => handleConvertToContract(quotation.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Convert to Contract
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedQuotation(quotation);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Version History Component */}
            <QuotationVersions quotation={quotation} />
          </Card>
        ))}
      </div>

      {/* Revision Modal */}
      <CreateRevisionModal
        quotation={selectedQuotation}
        isOpen={isRevisionModalOpen}
        onClose={() => {
          setIsRevisionModalOpen(false);
          setSelectedQuotation(null);
        }}
      />
    </div>
  );
}
