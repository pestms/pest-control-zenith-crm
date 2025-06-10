
import { IContract } from '../types/database';

export class Contract implements IContract {
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  contractNumber: string;
  quotationId: any;
  leadId: any;
  customerName: string;
  customerType: 'Residential' | 'Commercial';
  email: string;
  phone?: string;
  address: string;
  salesPersonId: any;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  startDate: Date;
  endDate?: Date;
  totalValue: number;
  services: any[];
  paymentTerms: string;
  notes?: string;

  constructor(data: Partial<IContract>) {
    this.contractNumber = data.contractNumber || '';
    this.quotationId = data.quotationId;
    this.leadId = data.leadId;
    this.customerName = data.customerName || '';
    this.customerType = data.customerType || 'Residential';
    this.email = data.email || '';
    this.phone = data.phone;
    this.address = data.address || '';
    this.salesPersonId = data.salesPersonId;
    this.status = data.status || 'active';
    this.startDate = data.startDate || new Date();
    this.endDate = data.endDate;
    this.totalValue = data.totalValue || 0;
    this.services = data.services || [];
    this.paymentTerms = data.paymentTerms || '';
    this.notes = data.notes;
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
