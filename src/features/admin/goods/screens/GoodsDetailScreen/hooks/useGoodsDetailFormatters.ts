import { useCallback } from 'react';

export const useGoodsDetailFormatters = (goods: any) => {
  const formatCurrency = (amount: number): string => amount?.toLocaleString('fr-FR') || '0';

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  const getPaymentStatusColor = useCallback(() => {
    if (!goods) return '#757575';
    if (goods.paymentStatus === 'PAID') return '#4CAF50';
    if (goods.paymentStatus === 'PARTIAL') return '#FF9800';
    return '#F44336';
  }, [goods]);

  return { formatCurrency, formatDate, getPaymentStatusColor };
};
