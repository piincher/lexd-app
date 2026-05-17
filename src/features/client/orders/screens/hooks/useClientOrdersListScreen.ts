import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMyOrders } from '../../hooks/useMyOrders';
import { Order } from '../../types';

export const useClientOrdersListScreen = () => {
  const navigation = useNavigation();
  const { data: orders, isLoading, isRefetching, refetch } = useMyOrders();

  const handleOrderPress = useCallback(
    (order: Order) => {
      navigation.navigate('ClientOrderDetail' as never, { orderId: order._id } as never);
    },
    [navigation]
  );

  return {
    orders,
    isLoading,
    isRefetching,
    refetch,
    handlers: {
      handleOrderPress,
    },
  };
};
