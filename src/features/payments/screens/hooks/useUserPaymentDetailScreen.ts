import { useCallback } from 'react';
import { useUserPaymentDetail } from '../../hooks/useUserPaymentDetail';

export const useUserPaymentDetailScreen = () => {
  const {
    payment,
    navigation,
    methodConfig,
    statusConfig,
    receiptUrl,
    formattedDate,
    handleOpenReceipt,
  } = useUserPaymentDetail();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    payment,
    methodConfig,
    statusConfig,
    receiptUrl,
    formattedDate,
    handlers: {
      handleBack,
      handleOpenReceipt,
    },
  };
};
