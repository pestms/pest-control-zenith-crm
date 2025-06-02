
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, History, FileText } from 'lucide-react';
import { Quotation } from '@/store/slices/quotationsSlice';

interface QuotationVersionsProps {
  quotation: Quotation;
}

export function QuotationVersions({ quotation }: QuotationVersionsProps) {
  const { quotations } = useSelector((state: RootState) => state.quotations);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Quotation | null>(null);

  // Get all versions of this quotation
  const rootId = quotation.parentQuotationId || quotation.id;
  const allVersions = quotations
    .filter(q => q.id === rootId || q.parentQuotationId === rootId)
    .sort((a, b) => b.version - a.version); // Sort by version descending (newest first)

  if (allVersions.length <= 1) {
    return null; // Don't show if only one version
  }

  const getVersionTitle = (version: Quotation) => {
    if (version.version === 1) return 'Original Quotation';
    return `Revision ${version.version - 1}`;
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

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <History className="w-4 h-4" />
            View Version History ({allVersions.length} versions)
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {allVersions.map((version) => (
            <Card key={version.id} className="p-3 bg-accent/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <div>
                    <h4 className="text-sm font-medium">{getVersionTitle(version)}</h4>
                    <p className="text-xs text-muted-foreground">
                      Created: {version.createdAt} • ${version.estimatedValue}
                    </p>
                    {version.revisionReason && (
                      <p className="text-xs text-muted-foreground italic">
                        Reason: {version.revisionReason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {version.isLatestVersion && (
                    <Badge variant="outline" className="text-xs">Latest</Badge>
                  )}
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(version.status)}`}
                  >
                    {version.status}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedVersion(version)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{getVersionTitle(version)} - {version.customerName}</DialogTitle>
                      </DialogHeader>
                      {selectedVersion && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge className={getStatusColor(selectedVersion.status)}>
                                {selectedVersion.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Value</p>
                              <p className="text-lg font-semibold text-green-400">
                                ${selectedVersion.estimatedValue}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Created</p>
                              <p className="text-sm">{selectedVersion.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Valid Until</p>
                              <p className="text-sm">{selectedVersion.validUntil}</p>
                            </div>
                          </div>
                          
                          {selectedVersion.revisionReason && (
                            <div>
                              <p className="text-sm text-muted-foreground">Revision Reason</p>
                              <p className="text-sm">{selectedVersion.revisionReason}</p>
                            </div>
                          )}

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Services</p>
                            <div className="space-y-2">
                              {selectedVersion.services
                                .filter(service => service.included)
                                .map((service, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 bg-accent/20 rounded">
                                    <span className="text-sm">{service.name}</span>
                                    <span className="text-sm font-medium">${service.price}</span>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {selectedVersion.notes && (
                            <div>
                              <p className="text-sm text-muted-foreground">Notes</p>
                              <p className="text-sm">{selectedVersion.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
