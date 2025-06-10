
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Phone, Mail, Users, FileText, Target, MapPin, User } from 'lucide-react';
import { format, isToday, isSameDay } from 'date-fns';

export default function Schedule() {
  const { activities } = useSelector((state: RootState) => state.leadActivities);
  const { leads } = useSelector((state: RootState) => state.leads);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter activities that are scheduled and not completed
  const scheduledActivities = activities.filter(activity => 
    activity.scheduledDate && !activity.isCompleted
  );

  // Filter activities for selected date
  const dayActivities = scheduledActivities.filter(activity =>
    activity.scheduledDate && isSameDay(new Date(activity.scheduledDate), selectedDate)
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'quote_sent': return <FileText className="w-4 h-4" />;
      case 'follow_up': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'email': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'quote_sent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'follow_up': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getLeadDetails = (leadId: string) => {
    return leads.find(lead => lead.id === leadId);
  };

  const todayActivities = scheduledActivities.filter(activity =>
    activity.scheduledDate && isToday(new Date(activity.scheduledDate))
  );

  return (
    <div className="space-y-6 animate-fade-in p-4 sm:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">
            {todayActivities.length} activities scheduled for today
          </p>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border border-border" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="bg-card border border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {isToday(selectedDate) ? "Today's Schedule" : `Schedule for ${format(selectedDate, 'MMM d, yyyy')}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayActivities.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No activities scheduled for this date
                  </p>
                </div>
              ) : (
                dayActivities.map((activity) => {
                  const lead = getLeadDetails(activity.leadId);
                  return (
                    <Card key={activity.id} className="bg-background border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className={`p-2 rounded-full ${getActivityColor(activity.activityType)} bg-opacity-20`}>
                              {getActivityIcon(activity.activityType)}
                            </div>
                            <div className="text-sm font-medium">
                              {format(new Date(activity.scheduledDate!), 'HH:mm')}
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getActivityColor(activity.activityType)}`}
                              >
                                {activity.activityType.replace('_', ' ')}
                              </Badge>
                              {activity.agenda && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 flex items-center gap-1">
                                  <Target className="w-2 h-2" />
                                  {getAgendaLabel(activity.agenda)}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              <p className="font-medium text-sm">{lead?.customerName || 'Unknown Lead'}</p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {activity.description}
                              </p>
                              
                              {lead && (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span>{lead.phone}</span>
                                  </div>
                                  {lead.address && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span className="truncate">{lead.address}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span>Assigned to: {activity.userName}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Stats */}
        <div className="space-y-6">
          <Card className="bg-card border border-border/40">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="p-3 pointer-events-auto w-full"
                modifiers={{
                  scheduled: (date) => scheduledActivities.some(activity => 
                    activity.scheduledDate && isSameDay(new Date(activity.scheduledDate), date)
                  )
                }}
                modifiersClassNames={{
                  scheduled: "bg-primary/20 text-primary font-medium"
                }}
              />
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/40">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Today's Activities</span>
                <span className="font-semibold">{todayActivities.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Scheduled</span>
                <span className="font-semibold">{scheduledActivities.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Selected Date</span>
                <span className="font-semibold">{dayActivities.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
