import { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useOrderDetail } from './useOrderDetail';
import { useRoutes } from './useRoutes';
import { useUpdateOrder } from './useOrderManagement';

const parseNum = (val: any): number => {
  if (val === null || val === undefined || val === '') return 0;
  const num = parseFloat(String(val));
  return isNaN(num) ? 0 : num;
};

export const useOrderDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };

  const { data: order, isLoading, refetch } = useOrderDetail(id);
  const { data: routes } = useRoutes();
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();

  const computeTotalFromGoods = (): number => {
    if (!order?.goodsIds || !Array.isArray(order.goodsIds) || order.goodsIds.length === 0) {
      return 0;
    }
    return order.goodsIds.reduce((sum: number, g: any) => {
      if (typeof g === 'object' && g !== null) {
        return sum + (parseNum(g.totalCost) || 0);
      }
      return sum;
    }, 0);
  };

  const resolvedTotal = parseNum(order?.calculatedTotal)
    || parseNum(order?.priceTotal)
    || computeTotalFromGoods();

  const normalizedOrder = useMemo(() => {
    if (!order) return null;
    return {
      ...order,
      quantity: order?.quantity || 1,
      packageWeight: order?.packageWeight || '0',
      packageCBM: order?.packageCBM || String(order?.calculatedCBM || '0'),
      unitPrice: parseNum(order?.unitPrice),
      priceTotal: resolvedTotal,
      calculatedTotal: resolvedTotal,
    };
  }, [order, resolvedTotal]);

  const handleUpdateStatus = () => {
    navigation.navigate('EditOrder' as never, {
      id: order?._id,
      orderId: order?.code,
    } as never);
  };

  return {
    order,
    normalizedOrder,
    isLoading,
    isUpdating,
    refetch,
    routes,
    handleUpdateStatus,
  };
};
