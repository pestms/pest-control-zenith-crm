
import { ILead } from '../types/database';

export class Lead implements ILead {
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  customerName: string;
  customerType: 'Residential' | 'Commercial';
  email: string;
  phone?: string;
  address: string;
  serviceDetails: string;
  problemDescription: string;
  priority: 'low' | 'medium' | 'high';
  status: 'lead' | 'quote' | 'contract';
  estimatedValue: number;
  salesPersonId?: any;
  leadSource: 'Website Form' | 'Phone Call' | 'Referral' | 'Advertisement' | 'Other';
  lastContact?: Date;
  services: any[];
  notes?: string;

  constructor(data: Partial<ILead>) {
    this.customerName = data.customerName || '';
    this.customerType = data.customerType || 'Residential';
    this.email = data.email || '';
    this.phone = data.phone;
    this.address = data.address || '';
    this.serviceDetails = data.serviceDetails || '';
    this.problemDescription = data.problemDescription || '';
    this.priority = data.priority || 'medium';
    this.status = data.status || 'lead';
    this.estimatedValue = data.estimatedValue || 0;
    this.salesPersonId = data.salesPersonId;
    this.leadSource = data.leadSource || 'Website Form';
    this.lastContact = data.lastContact;
    this.services = data.services || [];
    this.notes = data.notes;
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
