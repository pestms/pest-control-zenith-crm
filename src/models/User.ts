
import { IUser } from '../types/database';

export class User implements IUser {
  _id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'sales' | 'agent';
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin?: Date;

  constructor(data: Partial<IUser>) {
    this.email = data.email || '';
    this.passwordHash = data.passwordHash || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.role = data.role || 'agent';
    this.isActive = data.isActive ?? true;
    this.phone = data.phone;
    this.avatarUrl = data.avatarUrl;
    this.lastLogin = data.lastLogin;
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
