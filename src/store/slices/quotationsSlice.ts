
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
  // New versioning fields
  parentQuotationId?: string; // References the original quotation
  version: number; // 1 for original, 2+ for revisions
  isLatestVersion: boolean; // Only one version should be latest
  revisionReason?: string; // Why was this revision created
}

interface QuotationsState {
  quotations: Quotation[];
  filteredQuotations: Quotation[];
  searchTerm: string;
  statusFilter: string;
  showAllVersions: boolean; // Toggle to show all versions or just latest
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
      validUntil: '2024-06-27',
      version: 1,
      isLatestVersion: true
    }
  ],
  filteredQuotations: [],
  searchTerm: '',
  statusFilter: 'All',
  showAllVersions: false
};

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
    addQuotation: (state, action: PayloadAction<Omit<Quotation, 'id' | 'createdAt' | 'version' | 'isLatestVersion'>>) => {
      const newQuotation: Quotation = {
        ...action.payload,
        id: 'q' + Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        version: 1,
        isLatestVersion: true
      };
      state.quotations.push(newQuotation);
      quotationsSlice.caseReducers.filterQuotations(state);
    },
    createRevision: (state, action: PayloadAction<{ quotationId: string; reason?: string; changes: Partial<Quotation> }>) => {
      const { quotationId, reason, changes } = action.payload;
      const originalQuotation = state.quotations.find(q => q.id === quotationId);
      
      if (originalQuotation) {
        // Mark current version as not latest
        originalQuotation.isLatestVersion = false;
        
        // Find the root quotation ID
        const rootQuotationId = originalQuotation.parentQuotationId || originalQuotation.id;
        
        // Find the highest version number for this quotation family
        const maxVersion = Math.max(
          ...state.quotations
            .filter(q => q.id === rootQuotationId || q.parentQuotationId === rootQuotationId)
            .map(q => q.version)
        );
        
        // Create new revision
        const revision: Quotation = {
          ...originalQuotation,
          ...changes,
          id: 'q' + Date.now().toString(),
          parentQuotationId: rootQuotationId,
          version: maxVersion + 1,
          isLatestVersion: true,
          createdAt: new Date().toISOString().split('T')[0],
          revisionReason: reason,
          status: 'pending' // Reset status for new revision
        };
        
        state.quotations.push(revision);
        quotationsSlice.caseReducers.filterQuotations(state);
      }
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
    toggleShowAllVersions: (state) => {
      state.showAllVersions = !state.showAllVersions;
      quotationsSlice.caseReducers.filterQuotations(state);
    },
    filterQuotations: (state) => {
      let filtered = [...state.quotations];

      // Filter by versions first
      if (!state.showAllVersions) {
        filtered = filtered.filter(quotation => quotation.isLatestVersion);
      }

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
  createRevision,
  updateQuotation,
  convertToContract,
  setSearchTerm,
  setStatusFilter,
  toggleShowAllVersions,
  filterQuotations
} = quotationsSlice.actions;

export default quotationsSlice.reducer;
