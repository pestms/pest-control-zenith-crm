
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Lead } from '@/store/slices/leadsSlice';

export function useLeadStats() {
  const { leads } = useSelector((state: RootState) => state.leads);

  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.priority === 'high').length;
  const closedLeads = leads.filter(lead => lead.status === 'contract').length;
  const lostLeads = leads.filter(lead => lead.status === 'lead' && 
    new Date(lead.createdAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  return {
    totalLeads,
    hotLeads,
    closedLeads,
    lostLeads
  };
}
