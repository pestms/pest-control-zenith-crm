
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function useQuotationStats() {
  const { quotations } = useSelector((state: RootState) => state.quotations);

  const totalQuotations = quotations.length;
  const pendingQuotations = quotations.filter(q => q.status === 'pending').length;
  const rejectedQuotations = quotations.filter(q => q.status === 'rejected').length;
  const convertedToContract = quotations.filter(q => q.status === 'approved').length;

  return {
    totalQuotations,
    pendingQuotations,
    rejectedQuotations,
    convertedToContract
  };
}
