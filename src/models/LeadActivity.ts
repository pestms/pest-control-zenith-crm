
import { ILeadActivity } from '../types/database';

export class LeadActivity implements ILeadActivity {
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  leadId: any;
  userId: any;
  activityType: 'call' | 'email' | 'meeting' | 'quote_sent' | 'follow_up' | 'note';
  description: string;
  scheduledDate?: Date;
  completedDate?: Date;
  isCompleted: boolean;

  constructor(data: Partial<ILeadActivity>) {
    this.leadId = data.leadId;
    this.userId = data.userId;
    this.activityType = data.activityType || 'note';
    this.description = data.description || '';
    this.scheduledDate = data.scheduledDate;
    this.completedDate = data.completedDate;
    this.isCompleted = data.isCompleted ?? false;
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
