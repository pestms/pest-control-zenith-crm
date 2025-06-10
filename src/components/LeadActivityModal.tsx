
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface LeadActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  type: 'lead' | 'quotation';
  onActivityAdded: (activity: any) => void;
}

export function LeadActivityModal({ 
  isOpen, 
  onClose, 
  leadId, 
  leadName, 
  type,
  onActivityAdded 
}: LeadActivityModalProps) {
  const [activityType, setActivityType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [agenda, setAgenda] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const activityTypes = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'quote_sent', label: 'Quote Sent' },
    { value: 'follow_up', label: 'Follow Up' },
    { value: 'note', label: 'Note' }
  ];

  const agendaOptions = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'site_visit', label: 'Site Visit' },
    { value: 'quote_review', label: 'Quote Review' },
    { value: 'contract_signing', label: 'Contract Signing' }
  ];

  const handleSubmit = () => {
    if (!activityType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in activity type and description.",
        variant: "destructive"
      });
      return;
    }

    if (scheduledDate && !agenda) {
      toast({
        title: "Missing Agenda",
        description: "Please select an agenda for the scheduled activity.",
        variant: "destructive"
      });
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      leadId,
      activityType,
      description,
      scheduledDate: scheduledDate?.toISOString(),
      agenda: scheduledDate ? agenda : undefined,
      completedDate: isCompleted ? new Date().toISOString() : undefined,
      isCompleted,
      createdAt: new Date().toISOString(),
      userId: 'current-user',
      userName: 'Alex Thompson'
    };

    onActivityAdded(newActivity);
    
    // Reset form
    setActivityType('');
    setDescription('');
    setScheduledDate(undefined);
    setAgenda('');
    setIsCompleted(false);
    onClose();

    toast({
      title: "Activity Added",
      description: `Activity has been logged for ${leadName}.`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border border-border mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Activity - {leadName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activityType">Activity Type *</Label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened during this interaction..."
              className="bg-background border-border"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Scheduled Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-background border-border"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover border border-border">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {scheduledDate && (
            <div className="space-y-2">
              <Label htmlFor="agenda">Agenda *</Label>
              <Select value={agenda} onValueChange={setAgenda}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select agenda" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border">
                  {agendaOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isCompleted"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="isCompleted">Mark as completed</Label>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Add Activity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
