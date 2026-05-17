import { useCallback } from 'react';
import { usePaymentHistory } from '../../hooks/usePaymentHistory';

export const usePaymentHistoryScreen = () => {
  const paymentHistory = usePaymentHistory();

  const handleCloseImageModal = useCallback(() => {
    paymentHistory.setSelectedImage(null);
  }, [paymentHistory.setSelectedImage]);

  return {
    ...paymentHistory,
    handlers: {
      handleCloseImageModal,
    },
  };
};
