import { useRoute } from '@react-navigation/native';
import { useRecordPaymentScreen } from './useRecordPaymentScreen';

export const useRecordPaymentScreenUI = () => {
  const route = useRoute();
  const { orderId, orderCode, clientName, clientPhone, currentBalance, totalAmount } = route.params as {
    orderId: string;
    orderCode: string;
    clientName: string;
    clientPhone?: string;
    currentBalance: number;
    totalAmount: number;
  };

  const recordPaymentData = useRecordPaymentScreen({
    orderId,
    orderCode,
    clientName,
    clientPhone,
    currentBalance,
    totalAmount,
  });

  return {
    ...recordPaymentData,
    orderCode,
    clientName,
    totalAmount,
    currentBalance,
  };
};
