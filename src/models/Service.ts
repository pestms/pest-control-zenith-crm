
import { IService } from '../types/database';

export class Service implements IService {
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description?: string;
  basePrice: number;
  category?: string;
  isActive: boolean;

  constructor(data: Partial<IService>) {
    this.name = data.name || '';
    this.description = data.description;
    this.basePrice = data.basePrice || 0;
    this.category = data.category;
    this.isActive = data.isActive ?? true;
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
