
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  customerName: string;
  customerType: 'Residential' | 'Commercial';
  email: string;
  phone: string;
  address: string;
  serviceDetails: string;
  priority: 'low' | 'medium' | 'high';
  status: 'lead' | 'quote' | 'contract';
  estimatedValue: number;
  salesPerson?: string;
  lastContact: string;
  createdAt: string;
  problemDescription: string;
  services: string[];
}

interface LeadsState {
  leads: Lead[];
  filteredLeads: Lead[];
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  sortBy: string;
}

const initialState: LeadsState = {
  leads: [
    {
      id: '1',
      customerName: 'City Hospital',
      customerType: 'Commercial',
      email: 'facilities@cityhospital.org',
      phone: '(555) 567-8901',
      address: '555 Health Boulevard, Medical District',
      serviceDetails: 'Monthly pest prevention service',
      priority: 'low',
      status: 'contract',
      estimatedValue: 2400,
      salesPerson: 'Sarah Johnson',
      lastContact: '1 week ago',
      createdAt: '2024-05-15',
      problemDescription: 'Monthly pest prevention service',
      services: ['Initial Inspection', 'Ant Treatment', 'Cockroach Control']
    },
    {
      id: '2',
      customerName: 'Corner Grocery Store',
      customerType: 'Commercial',
      email: 'owner@cornerstore.com',
      phone: '(555) 789-0123',
      address: '202 Commerce Street, Shopping Area',
      serviceDetails: 'Fly control in produce section',
      priority: 'medium',
      status: 'lead',
      estimatedValue: 450,
      salesPerson: 'John Martinez',
      lastContact: '6 hours ago',
      createdAt: '2024-05-28',
      problemDescription: 'Fly control in produce section',
      services: ['Initial Inspection', 'Fly Control']
    },
    {
      id: '3',
      customerName: 'Davis Family Home',
      customerType: 'Residential',
      email: 'davis.family@email.com',
      phone: '(555) 456-7890',
      address: '321 Pine Avenue, Suburban Area',
      serviceDetails: 'Termite inspection and treatment needed',
      priority: 'high',
      status: 'quote',
      estimatedValue: 650,
      salesPerson: 'Mike Wilson',
      lastContact: '1 day ago',
      createdAt: '2024-05-27',
      problemDescription: 'Termite inspection and treatment needed',
      services: ['Initial Inspection', 'Termite Treatment']
    }
  ],
  filteredLeads: [],
  searchTerm: '',
  statusFilter: 'All',
  priorityFilter: 'All',
  sortBy: 'createdAt'
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Omit<Lead, 'id' | 'createdAt'>>) => {
      const newLead: Lead = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      state.leads.push(newLead);
      leadsSlice.caseReducers.filterLeads(state);
    },
    updateLead: (state, action: PayloadAction<Partial<Lead> & { id: string }>) => {
      const index = state.leads.findIndex(lead => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = { ...state.leads[index], ...action.payload };
        leadsSlice.caseReducers.filterLeads(state);
      }
    },
    convertToQuotation: (state, action: PayloadAction<string>) => {
      const lead = state.leads.find(l => l.id === action.payload);
      if (lead) {
        lead.status = 'quote';
        leadsSlice.caseReducers.filterLeads(state);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      leadsSlice.caseReducers.filterLeads(state);
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      leadsSlice.caseReducers.filterLeads(state);
    },
    setPriorityFilter: (state, action: PayloadAction<string>) => {
      state.priorityFilter = action.payload;
      leadsSlice.caseReducers.filterLeads(state);
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      leadsSlice.caseReducers.filterLeads(state);
    },
    filterLeads: (state) => {
      let filtered = [...state.leads];

      if (state.searchTerm) {
        filtered = filtered.filter(lead =>
          lead.customerName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          lead.serviceDetails.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.statusFilter !== 'All') {
        filtered = filtered.filter(lead => lead.status === state.statusFilter.toLowerCase());
      }

      if (state.priorityFilter !== 'All') {
        filtered = filtered.filter(lead => lead.priority === state.priorityFilter.toLowerCase());
      }

      // Sort
      filtered.sort((a, b) => {
        switch (state.sortBy) {
          case 'value':
            return b.estimatedValue - a.estimatedValue;
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });

      state.filteredLeads = filtered;
    }
  }
});

export const {
  addLead,
  updateLead,
  convertToQuotation,
  setSearchTerm,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  filterLeads
} = leadsSlice.actions;

export default leadsSlice.reducer;
