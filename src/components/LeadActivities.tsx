
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  Users, 
  FileText, 
  Clock, 
  StickyNote,
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  Target
} from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  activityType: string;
  description: string;
  scheduledDate?: string;
  agenda?: string;
  completedDate?: string;
  isCompleted: boolean;
  createdAt: string;
  userName: string;
}

interface LeadActivitiesProps {
  activities: Activity[];
  isOpen: boolean;
  onToggle: () => void;
}

export function LeadActivities({ activities, isOpen, onToggle }: LeadActivitiesProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-3 h-3" />;
      case 'email': return <Mail className="w-3 h-3" />;
      case 'meeting': return <Users className="w-3 h-3" />;
      case 'quote_sent': return <FileText className="w-3 h-3" />;
      case 'follow_up': return <Clock className="w-3 h-3" />;
      case 'note': return <StickyNote className="w-3 h-3" />;
      default: return <StickyNote className="w-3 h-3" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'email': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'quote_sent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'follow_up': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'note': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'call': return 'Phone Call';
      case 'email': return 'Email';
      case 'meeting': return 'Meeting';
      case 'quote_sent': return 'Quote Sent';
      case 'follow_up': return 'Follow Up';
      case 'note': return 'Note';
      default: return type;
    }
  };

  const getAgendaLabel = (agenda: string) => {
    switch (agenda) {
      case 'call': return 'Phone Call';
      case 'email': return 'Email';
      case 'meeting': return 'Meeting';
      case 'site_visit': return 'Site Visit';
      case 'quote_review': return 'Quote Review';
      case 'contract_signing': return 'Contract Signing';
      default: return agenda;
    }
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-xs p-1 h-auto"
        >
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          Activity History ({activities.length})
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <Card className="border border-border/60">
          <CardContent className="p-3">
            <div className="space-y-3">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex gap-3 text-xs">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`p-1.5 rounded-full ${getActivityColor(activity.activityType)} bg-opacity-20`}>
                      {getActivityIcon(activity.activityType)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getActivityColor(activity.activityType)}`}
                      >
                        {getActivityLabel(activity.activityType)}
                      </Badge>
                      {activity.isCompleted && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          Completed
                        </Badge>
                      )}
                      {activity.agenda && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 flex items-center gap-1">
                          <Target className="w-2 h-2" />
                          {getAgendaLabel(activity.agenda)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-1 line-clamp-2 break-words">{activity.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">{activity.userName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(activity.createdAt), 'MMM d, HH:mm')}</span>
                      </div>
                    </div>
                    {activity.scheduledDate && (
                      <div className="flex items-center gap-1 text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>Scheduled: {format(new Date(activity.scheduledDate), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {activities.length > 5 && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all {activities.length} activities
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
