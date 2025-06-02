
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { createRevision, QuotationService } from '@/store/slices/quotationsSlice';
import { Quotation } from '@/store/slices/quotationsSlice';
import { toast } from '@/hooks/use-toast';
import { Edit, Plus, X } from 'lucide-react';

interface CreateRevisionModalProps {
  quotation: Quotation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRevisionModal({ quotation, isOpen, onClose }: CreateRevisionModalProps) {
  const dispatch = useDispatch();
  const [revisionReason, setRevisionReason] = useState('');
  const [services, setServices] = useState<QuotationService[]>([]);
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [validUntil, setValidUntil] = useState('');
  const [notes, setNotes] = useState('');

  // Initialize form when quotation changes
  React.useEffect(() => {
    if (quotation) {
      setServices([...quotation.services]);
      setEstimatedValue(quotation.estimatedValue);
      setValidUntil(quotation.validUntil);
      setNotes(quotation.notes || '');
    }
  }, [quotation]);

  if (!quotation) return null;

  const addService = () => {
    const newService: QuotationService = {
      name: '',
      price: 0,
      included: false
    };
    setServices([...services, newService]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof QuotationService, value: string | number | boolean) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
    
    // Recalculate total
    const total = updatedServices
      .filter(service => service.included)
      .reduce((sum, service) => sum + service.price, 0);
    setEstimatedValue(total);
  };

  const handleCreateRevision = () => {
    if (!revisionReason.trim()) {
      toast({
        title: "Revision Reason Required",
        description: "Please provide a reason for creating this revision.",
        variant: "destructive"
      });
      return;
    }

    dispatch(createRevision({
      quotationId: quotation.id,
      reason: revisionReason,
      changes: {
        services,
        estimatedValue,
        validUntil,
        notes
      }
    }));

    toast({
      title: "Revision Created",
      description: `Revision ${quotation.version + 1} has been created for ${quotation.customerName}.`,
    });

    // Reset form
    setRevisionReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Edit className="w-6 h-6" />
            Create Revision - {quotation.customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Revision Reason */}
          <Card className="p-4">
            <div className="space-y-2">
              <Label htmlFor="revisionReason">Reason for Revision *</Label>
              <Textarea
                id="revisionReason"
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
                placeholder="e.g., Customer requested additional services, pricing adjustment needed..."
                rows={2}
              />
            </div>
          </Card>

          {/* Services */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Services & Pricing</h3>
              <Button onClick={addService} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4 items-end">
                    <div>
                      <Label className="text-sm font-medium">Service Name</Label>
                      <Input
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                        placeholder="Enter service name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Price ($)</Label>
                      <Input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateService(index, 'price', Number(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={service.included}
                        onChange={(e) => updateService(index, 'included', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label className="text-sm">Include in quotation</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">${estimatedValue.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Valid Until</Label>
                <Input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
              <div></div>
              <div className="col-span-2">
                <Label className="text-sm font-medium">Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes or terms..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateRevision} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Create Revision
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
