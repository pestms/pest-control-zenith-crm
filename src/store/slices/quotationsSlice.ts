
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuotationService {
  name: string;
  price: number;
  included: boolean;
}

export interface Quotation {
  id: string;
  leadId: string;
  customerName: string;
  customerType: 'Residential' | 'Commercial';
  email: string;
  phone: string;
  address: string;
  problemDescription: string;
  salesPerson: string;
  estimatedValue: number;
  status: 'pending' | 'approved' | 'rejected' | 'revised';
  services: QuotationService[];
  createdAt: string;
  validUntil: string;
  notes?: string;
}

interface QuotationsState {
  quotations: Quotation[];
  filteredQuotations: Quotation[];
  searchTerm: string;
  statusFilter: string;
}

const initialState: QuotationsState = {
  quotations: [
    {
      id: 'q1',
      leadId: '3',
      customerName: 'Davis Family Home',
      customerType: 'Residential',
      email: 'davis.family@email.com',
      phone: '(555) 456-7890',
      address: '321 Pine Avenue, Suburban Area',
      problemDescription: 'Termite inspection and treatment needed',
      salesPerson: 'Mike Wilson',
      estimatedValue: 650,
      status: 'pending',
      services: [
        { name: 'Initial Inspection', price: 120, included: true },
        { name: 'Termite Treatment', price: 350, included: true },
        { name: 'Follow-up Visit', price: 80, included: true }
      ],
      createdAt: '2024-05-27',
      validUntil: '2024-06-27'
    }
  ],
  filteredQuotations: [],
  searchTerm: '',
  statusFilter: 'All'
};

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
    addQuotation: (state, action: PayloadAction<Omit<Quotation, 'id' | 'createdAt'>>) => {
      const newQuotation: Quotation = {
        ...action.payload,
        id: 'q' + Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      state.quotations.push(newQuotation);
      quotationsSlice.caseReducers.filterQuotations(state);
    },
    updateQuotation: (state, action: PayloadAction<Partial<Quotation> & { id: string }>) => {
      const index = state.quotations.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.quotations[index] = { ...state.quotations[index], ...action.payload };
        quotationsSlice.caseReducers.filterQuotations(state);
      }
    },
    convertToContract: (state, action: PayloadAction<string>) => {
      const quotation = state.quotations.find(q => q.id === action.payload);
      if (quotation) {
        quotation.status = 'approved';
        quotationsSlice.caseReducers.filterQuotations(state);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      quotationsSlice.caseReducers.filterQuotations(state);
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      quotationsSlice.caseReducers.filterQuotations(state);
    },
    filterQuotations: (state) => {
      let filtered = [...state.quotations];

      if (state.searchTerm) {
        filtered = filtered.filter(quotation =>
          quotation.customerName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          quotation.problemDescription.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.statusFilter !== 'All') {
        filtered = filtered.filter(quotation => quotation.status === state.statusFilter.toLowerCase());
      }

      state.filteredQuotations = filtered;
    }
  }
});

export const {
  addQuotation,
  updateQuotation,
  convertToContract,
  setSearchTerm,
  setStatusFilter,
  filterQuotations
} = quotationsSlice.actions;

export default quotationsSlice.reducer;
