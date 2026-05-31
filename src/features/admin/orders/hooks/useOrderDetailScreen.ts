import { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrderDetail } from './useOrderDetail';
import { useRoutes } from './useRoutes';
import { useUpdateOrder } from './useOrderManagement';
import { LEGACY_MANUAL_ORDERS_ENABLED } from '../legacyOrders';

type GoodsLike = {
  _id?: string;
  totalCost?: unknown;
  actualCBM?: unknown;
  cbm?: unknown;
  weight?: unknown;
  isVoid?: boolean;
  status?: string;
};

type GoodsTotals = { count: number; cbm: number; weight: number };
type Nav = NativeStackNavigationProp<{ AdminGoodsDetail: { goodsId: string }; EditOrder: { id?: string; orderId?: string } }>;

const parseNum = (val: unknown): number => {
  if (val === null || val === undefined || val === '') return 0;
  const num = parseFloat(String(val));
  return isNaN(num) ? 0 : num;
};

export const useOrderDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<Nav>();
  const { id } = route.params as { id: string };

  const { data: order, isLoading, refetch } = useOrderDetail(id);
  const { data: routes } = useRoutes();
  const { isPending: isUpdating } = useUpdateOrder();

  const computeTotalFromGoods = (): number => {
    if (!order?.goodsIds || !Array.isArray(order.goodsIds) || order.goodsIds.length === 0) {
      return 0;
    }
    return order.goodsIds.reduce((sum: number, g: unknown) => {
      if (typeof g === 'object' && g !== null) {
        return sum + (parseNum((g as GoodsLike).totalCost) || 0);
      }
      return sum;
    }, 0);
  };

  const goodsTotals = useMemo(() => {
    const goods = Array.isArray(order?.goodsIds) ? (order.goodsIds as GoodsLike[]) : [];
    const activeGoods = goods.filter((item) => !item.isVoid && item.status !== 'VOID');
    return activeGoods.reduce<GoodsTotals>(
      (acc, item) => ({
        count: acc.count + 1,
        cbm: acc.cbm + (parseNum(item.actualCBM) || parseNum(item.cbm)),
        weight: acc.weight + parseNum(item.weight),
      }),
      { count: 0, cbm: 0, weight: 0 }
    );
  }, [order?.goodsIds]);

  const resolvedTotal = parseNum(order?.calculatedTotal)
    || parseNum(order?.priceTotal)
    || computeTotalFromGoods();

  const normalizedOrder = useMemo(() => {
    if (!order) return null;
    return {
      ...order,
      quantity: goodsTotals.count || order?.quantity || 1,
      packageWeight: goodsTotals.weight || parseNum(order?.packageWeight),
      packageCBM: goodsTotals.cbm ? goodsTotals.cbm.toFixed(3) : order?.packageCBM || String(order?.calculatedCBM || '0'),
      unitPrice: parseNum(order?.unitPrice),
      priceTotal: resolvedTotal,
      calculatedTotal: resolvedTotal,
    };
  }, [goodsTotals, order, resolvedTotal]);

  const handleUpdateStatus = () => {
    if (!LEGACY_MANUAL_ORDERS_ENABLED) return;
    navigation.navigate('EditOrder', { id: order?._id, orderId: order?.code });
  };

  const handleOpenGoods = (goodsId: string) => navigation.navigate('AdminGoodsDetail', { goodsId });

  return {
    normalizedOrder,
    isLoading,
    isUpdating,
    refetch,
    routes,
    handleUpdateStatus,
    handleOpenGoods,
  };
};
