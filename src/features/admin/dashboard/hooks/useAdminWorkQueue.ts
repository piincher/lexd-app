import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import type { navigationProps } from '@src/app/navigation/type';
import { DASHBOARD_STALE_TIME } from '@src/shared/constants/queryConfig';
import { getWorkQueueGoods, getWorkQueuePayments } from '../api/dashboardApi';
import type { WorkQueueFilter } from '../types';
import { buildAdminWorkQueue } from '../utils/workQueue';

export const useAdminWorkQueue = () => {
  const navigation = useNavigation<navigationProps>();
  const [filter, setFilter] = useState<WorkQueueFilter>('all');
  const goodsQuery = useQuery({
    queryKey: ['admin', 'work-queue', 'goods'],
    queryFn: getWorkQueueGoods,
    staleTime: DASHBOARD_STALE_TIME,
  });
  const paymentQuery = useQuery({
    queryKey: ['admin', 'work-queue', 'payments'],
    queryFn: getWorkQueuePayments,
    staleTime: DASHBOARD_STALE_TIME,
  });

  const items = useMemo(
    () => buildAdminWorkQueue(goodsQuery.data?.items || [], paymentQuery.data?.items || []),
    [goodsQuery.data, paymentQuery.data],
  );
  const visibleItems = useMemo(() => items.filter((item) => {
    if (filter === 'critical') return item.severity === 'critical';
    if (filter === 'goods') return item.kind !== 'payment';
    if (filter === 'payment') return item.kind === 'payment';
    return true;
  }), [filter, items]);
  const counts = useMemo(() => ({
    all: items.length,
    critical: items.filter((item) => item.severity === 'critical').length,
    goods: items.filter((item) => item.kind !== 'payment').length,
    payment: paymentQuery.data?.total || 0,
  }), [items, paymentQuery.data]);

  const refresh = useCallback(async () => {
    await Promise.all([goodsQuery.refetch(), paymentQuery.refetch()]);
  }, [goodsQuery, paymentQuery]);
  const openItem = useCallback((goodsId: string) => {
    navigation.navigate('AdminGoodsDetail', { goodsId });
  }, [navigation]);

  return {
    items: visibleItems, filter, setFilter, counts, refresh, openItem,
    isLoading: goodsQuery.isLoading && paymentQuery.isLoading,
    isRefreshing: goodsQuery.isRefetching || paymentQuery.isRefetching,
    isPartialError: !!goodsQuery.error !== !!paymentQuery.error,
    isError: !!goodsQuery.error && !!paymentQuery.error,
    isTruncated: !!goodsQuery.data?.truncated || !!paymentQuery.data?.truncated,
    openAssignments: () => navigation.navigate('UnassignedGoods'),
    openPayments: () => navigation.navigate('OutstandingPaymentsList'),
    goBack: () => navigation.goBack(),
  };
};
