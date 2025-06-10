
import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  documentUrl?: string;
  isActive: boolean;
  createdAt: string;
}

// Mock data - in real app this would come from API
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Residential Pest Control',
    description: 'Comprehensive pest control for homes including ants, roaches, spiders',
    basePrice: 150,
    category: 'Residential',
    documentUrl: '/docs/residential-service.pdf',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Commercial Fumigation',
    description: 'Industrial-grade fumigation services for commercial properties',
    basePrice: 500,
    category: 'Commercial',
    documentUrl: '/docs/commercial-fumigation.pdf',
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Termite Inspection',
    description: 'Professional termite inspection and treatment services',
    basePrice: 200,
    category: 'Inspection',
    isActive: false,
    createdAt: '2024-01-05'
  }
];

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    category: '',
    document: null as File | null
  });
  const { toast } = useToast();

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      category: '',
      document: null
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      basePrice: service.basePrice.toString(),
      category: service.category,
      document: null
    });
    setIsDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: "Service deleted",
      description: "The service has been successfully deleted.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Update existing service
      setServices(services.map(s => 
        s.id === editingService.id 
          ? {
              ...s,
              name: formData.name,
              description: formData.description,
              basePrice: parseFloat(formData.basePrice),
              category: formData.category,
              documentUrl: formData.document ? `/docs/${formData.document.name}` : s.documentUrl
            }
          : s
      ));
      toast({
        title: "Service updated",
        description: "The service has been successfully updated.",
      });
    } else {
      // Add new service
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice),
        category: formData.category,
        documentUrl: formData.document ? `/docs/${formData.document.name}` : undefined,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setServices([...services, newService]);
      toast({
        title: "Service added",
        description: "The new service has been successfully added.",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, document: file });
  };

  const toggleServiceStatus = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage pest control services, pricing, and documentation
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddService} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService 
                  ? 'Update the service details below.' 
                  : 'Fill in the details for the new pest control service.'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Residential Pest Control"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Residential, Commercial"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price ($) *</Label>
                <Input
                  id="basePrice"
                  type="number"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the service details..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document">Service Document (PDF)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </div>
                {formData.document && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formData.document.name}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingService ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service List</CardTitle>
          <CardDescription>
            All pest control services with pricing and status information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      {service.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {service.description.length > 50 
                            ? `${service.description.substring(0, 50)}...` 
                            : service.description
                          }
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{service.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${service.basePrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      <Badge variant={service.isActive ? "default" : "destructive"}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {service.documentUrl ? (
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" />
                        View
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">No document</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {service.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
