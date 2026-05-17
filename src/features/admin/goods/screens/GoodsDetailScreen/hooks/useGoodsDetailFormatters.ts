import { useCallback } from 'react';
import { Theme } from '@src/constants/Theme';

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
    if (!goods) return Theme.colors.text.disabled;
    if (goods.paymentStatus === 'PAID') return Theme.colors.status.success;
    if (goods.paymentStatus === 'PARTIAL') return Theme.colors.status.warning;
    return Theme.colors.status.error;
  }, [goods]);

  return { formatCurrency, formatDate, getPaymentStatusColor };
};
