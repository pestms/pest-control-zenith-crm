
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Activity {
  id: string;
  leadId: string;
  activityType: string;
  description: string;
  scheduledDate?: string;
  agenda?: string;
  completedDate?: string;
  isCompleted: boolean;
  createdAt: string;
  userId: string;
  userName: string;
}

interface LeadActivitiesState {
  activities: Activity[];
}

const initialState: LeadActivitiesState = {
  activities: [
    {
      id: '1',
      leadId: '1',
      activityType: 'call',
      description: 'Initial contact call. Customer described ant infestation in kitchen area. Scheduled inspection for next Tuesday.',
      scheduledDate: '2024-01-16T10:00:00.000Z',
      agenda: 'site_visit',
      isCompleted: true,
      completedDate: '2024-01-15T14:30:00.000Z',
      createdAt: '2024-01-15T14:30:00.000Z',
      userId: 'user1',
      userName: 'Alex Thompson'
    },
    {
      id: '2',
      leadId: '1',
      activityType: 'meeting',
      description: 'On-site inspection completed. Found entry points near back door. Explained treatment process and pricing.',
      isCompleted: true,
      completedDate: '2024-01-16T10:00:00.000Z',
      createdAt: '2024-01-16T10:00:00.000Z',
      userId: 'user1',
      userName: 'Alex Thompson'
    },
    {
      id: '3',
      leadId: '1',
      activityType: 'quote_sent',
      description: 'Sent detailed quotation via email including ant treatment and preventive measures.',
      isCompleted: true,
      completedDate: '2024-01-16T15:00:00.000Z',
      createdAt: '2024-01-16T15:00:00.000Z',
      userId: 'user1',
      userName: 'Alex Thompson'
    },
    {
      id: '4',
      leadId: '2',
      activityType: 'call',
      description: 'Customer reported cockroach problem in restaurant kitchen. Urgent treatment needed.',
      isCompleted: true,
      completedDate: '2024-01-17T09:00:00.000Z',
      createdAt: '2024-01-17T09:00:00.000Z',
      userId: 'user1',
      userName: 'Alex Thompson'
    },
    {
      id: '5',
      leadId: '3',
      activityType: 'follow_up',
      description: 'Customer requested to call back next week as they are traveling.',
      scheduledDate: '2024-01-22T14:00:00.000Z',
      agenda: 'call',
      isCompleted: false,
      createdAt: '2024-01-17T11:00:00.000Z',
      userId: 'user1',
      userName: 'Alex Thompson'
    }
  ]
};

const leadActivitiesSlice = createSlice({
  name: 'leadActivities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.unshift(action.payload);
    },
    updateActivity: (state, action: PayloadAction<{ id: string; updates: Partial<Activity> }>) => {
      const { id, updates } = action.payload;
      const index = state.activities.findIndex(activity => activity.id === id);
      if (index !== -1) {
        state.activities[index] = { ...state.activities[index], ...updates };
      }
    },
    markActivityCompleted: (state, action: PayloadAction<string>) => {
      const index = state.activities.findIndex(activity => activity.id === action.payload);
      if (index !== -1) {
        state.activities[index].isCompleted = true;
        state.activities[index].completedDate = new Date().toISOString();
      }
    }
  }
});

export const { addActivity, updateActivity, markActivityCompleted } = leadActivitiesSlice.actions;
export default leadActivitiesSlice.reducer;
