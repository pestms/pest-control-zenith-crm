
import mongoose, { Schema, Document } from 'mongoose';
import { IQuotation, IQuotationService, CustomerType, QuotationStatus } from '../types/database';

const quotationServiceSchema = new Schema<IQuotationService>({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  included: {
    type: Boolean,
    required: true,
    default: true
  }
}, { _id: false });

interface IQuotationDocument extends Omit<IQuotation, '_id'>, Document {}

const quotationSchema = new Schema<IQuotationDocument>({
  quotationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerType: {
    type: String,
    enum: ['Residential', 'Commercial'] as CustomerType[],
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  problemDescription: {
    type: String,
    required: true,
    trim: true
  },
  salesPersonId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estimatedValue: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'revised'] as QuotationStatus[],
    required: true,
    default: 'pending'
  },
  validUntil: {
    type: Date,
    required: true
  },
  services: [quotationServiceSchema],
  notes: {
    type: String,
    maxlength: 2000
  },
  
  // Version control
  parentQuotationId: {
    type: Schema.Types.ObjectId,
    ref: 'Quotation'
  },
  version: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  isLatestVersion: {
    type: Boolean,
    required: true,
    default: true
  },
  revisionReason: {
    type: String,
    maxlength: 500
  },
  
  // Financial details
  paymentTerms: {
    type: String,
    maxlength: 200
  },
  taxRate: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.1 // 10%
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  taxAmount: {
    type: Number,
    required: true,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to generate quotation number
quotationSchema.pre('save', async function(this: IQuotationDocument, next) {
  if (this.isNew && !this.quotationNumber) {
    const count = await mongoose.model('Quotation').countDocuments();
    this.quotationNumber = `Q-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to calculate totals
quotationSchema.pre('save', function(this: IQuotationDocument, next) {
  const includedServices = this.services.filter(service => service.included);
  this.subtotal = includedServices.reduce((sum, service) => sum + service.totalPrice, 0);
  this.taxAmount = this.subtotal * this.taxRate;
  this.totalAmount = this.subtotal + this.taxAmount;
  this.estimatedValue = this.totalAmount;
  next();
});

// Indexes
quotationSchema.index({ quotationNumber: 1 });
quotationSchema.index({ leadId: 1 });
quotationSchema.index({ salesPersonId: 1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ isLatestVersion: 1 });
quotationSchema.index({ parentQuotationId: 1 });
quotationSchema.index({ createdAt: -1 });
quotationSchema.index({ validUntil: 1 });

export const Quotation = mongoose.model<IQuotationDocument>('Quotation', quotationSchema);
