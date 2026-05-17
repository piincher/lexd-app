import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { usePastOrders } from '../../hooks/usePastOrders';
import { useOrderFilters } from '../../hooks/useOrderFilters';
import { Order } from '../../types';

export const usePastOrdersScreenV2 = () => {
  const navigation = useNavigation();
  const { filters, setStatus, setDateRange, setSearchQuery } = useOrderFilters();
  const { data, isLoading, refetch, isRefetching } = usePastOrders(filters);

  const handleOrderPress = useCallback(
    (order: Order) => {
      navigation.navigate('OrderDetail' as never, { orderId: order._id } as never);
    },
    [navigation]
  );

  const orders = data?.orders ?? [];

  return {
    orders,
    filters,
    setStatus,
    setDateRange,
    setSearchQuery,
    data,
    isLoading,
    refetch,
    isRefetching,
    handlers: {
      handleOrderPress,
    },
  };
};
