import { useRoute } from '@react-navigation/native';
import { usePaymentHistoryQuery } from './usePaymentHistoryQuery';
import { usePaymentHistoryActions } from './usePaymentHistoryActions';

export const usePaymentHistory = () => {
  const route = useRoute();
  const { orderId, orderCode, clientName, clientPhone } = route.params as {
    orderId: string;
    orderCode: string;
    clientName?: string;
    clientPhone?: string;
  };

  const {
    payments, isLoading, error, refetch,
    runBackfill, isBackfilling, hasMissingReceipts, totalPaid,
  } = usePaymentHistoryQuery(orderId);

  const {
    selectedImage, setSelectedImage, sharingPaymentId,
    handleViewReceipt, handleShareOnWhatsApp,
  } = usePaymentHistoryActions(orderCode, clientName, clientPhone);

  return {
    orderId,
    orderCode,
    clientName,
    clientPhone,
    payments,
    isLoading,
    error,
    refetch,
    runBackfill,
    isBackfilling,
    hasMissingReceipts,
    totalPaid,
    selectedImage,
    setSelectedImage,
    sharingPaymentId,
    handleViewReceipt,
    handleShareOnWhatsApp,
  };
};
