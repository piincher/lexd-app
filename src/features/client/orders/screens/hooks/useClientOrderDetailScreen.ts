import { useRoute } from '@react-navigation/native';
import { useClientOrder } from '../../hooks/useClientOrder';

export const useClientOrderDetailScreen = () => {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const { data, isLoading, isError } = useClientOrder(orderId);

  return {
    orderId,
    data,
    isLoading,
    isError,
  };
};
