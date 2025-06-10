
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead, convertToQuotation } from '@/store/slices/leadsSlice';
import { Plus, X, DollarSign, Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuotationModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export function QuotationModal({ lead, isOpen, onClose }: QuotationModalProps) {
  const dispatch = useDispatch();
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: '1',
      name: 'Initial Inspection',
      description: 'Comprehensive property inspection',
      quantity: 1,
      price: 120,
      total: 120
    }
  ]);
  const [quotationNotes, setQuotationNotes] = useState('');
  const [validUntil, setValidUntil] = useState('');

  if (!lead) return null;

  const addService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateService = (id: string, field: keyof ServiceItem, value: string | number) => {
    setServices(services.map(service => {
      if (service.id === id) {
        const updated = { ...service, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updated.total = updated.quantity * updated.price;
        }
        return updated;
      }
      return service;
    }));
  };

  const subtotal = services.reduce((sum, service) => sum + service.total, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleConvertToQuotation = () => {
    if (!lead) return;
    
    dispatch(convertToQuotation(lead.id));
    toast({
      title: "Quotation Created",
      description: `Quotation for ${lead.customerName} has been created successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-2 w-[calc(100vw-1rem)] max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="truncate">Create Quotation - {lead.customerName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Customer Information */}
          <Card className="p-3 sm:p-4 bg-accent/30">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Customer Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer Name</Label>
                <Input value={lead.customerName} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Customer Type</Label>
                <Input value={lead.customerType} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input value={lead.email} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone</Label>
                <Input value={lead.phone} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Address</Label>
                <Input value={lead.address} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Problem Description</Label>
                <Textarea value={lead.problemDescription} readOnly className="bg-muted" />
              </div>
            </div>
          </Card>

          {/* Services */}
          <Card className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Services & Pricing</h3>
              <Button onClick={addService} size="sm" variant="outline" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
            
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border border-border rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 mr-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Service Name</Label>
                          <Input
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                            placeholder="Enter service name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Description</Label>
                          <Input
                            value={service.description}
                            onChange={(e) => updateService(service.id, 'description', e.target.value)}
                            placeholder="Enter description"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Quantity</Label>
                      <Input
                        type="number"
                        value={service.quantity}
                        onChange={(e) => updateService(service.id, 'quantity', Number(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Unit Price ($)</Label>
                      <Input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateService(service.id, 'price', Number(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Total</Label>
                      <Input
                        value={`$${service.total.toFixed(2)}`}
                        readOnly
                        className="bg-muted font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t border-border pt-4">
              <div className="space-y-2 w-full sm:max-w-sm sm:ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valid Until</Label>
                <Input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Payment Terms</Label>
                <Input placeholder="e.g., Net 30 days" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Notes</Label>
                <Textarea
                  value={quotationNotes}
                  onChange={(e) => setQuotationNotes(e.target.value)}
                  placeholder="Additional notes or terms..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-border sm:flex-row sm:justify-end sm:gap-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleConvertToQuotation} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <DollarSign className="w-4 h-4 mr-2" />
            Convert to Quotation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
