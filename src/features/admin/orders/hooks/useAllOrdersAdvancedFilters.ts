import { useCallback, useMemo, useState } from 'react';
import type { OrderListFilters } from '@src/api/order';

export type AdvancedOrderFilters = Required<
  Pick<OrderListFilters, 'shippingMethod' | 'paymentStatus' | 'linkState' | 'sortBy' | 'sortOrder'>
> &
  Pick<OrderListFilters, 'container' | 'startDate' | 'endDate' | 'minTotal' | 'maxTotal'>;

export const DEFAULT_ORDER_FILTERS: AdvancedOrderFilters = {
  container: '',
  shippingMethod: 'all',
  paymentStatus: 'all',
  linkState: 'all',
  startDate: '',
  endDate: '',
  minTotal: undefined,
  maxTotal: undefined,
  sortBy: 'updatedAt',
  sortOrder: 'desc',
};

export const useAllOrdersAdvancedFilters = () => {
  const [filters, setFilters] = useState<AdvancedOrderFilters>(DEFAULT_ORDER_FILTERS);

  const setFilter = useCallback(
    <K extends keyof AdvancedOrderFilters>(key: K, value: AdvancedOrderFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_ORDER_FILTERS);
  }, []);

  const apiFilters = useMemo<OrderListFilters>(
    () => ({
      container: filters.container?.trim() || undefined,
      shippingMethod: filters.shippingMethod,
      paymentStatus: filters.paymentStatus,
      linkState: filters.linkState,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      minTotal: filters.minTotal,
      maxTotal: filters.maxTotal,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }),
    [filters]
  );

  const activeCount = useMemo(
    () =>
      Object.entries(apiFilters).filter(([key, value]) => {
        if (key === 'sortBy' || key === 'sortOrder') return false;
        return value !== undefined && value !== 'all' && value !== '';
      }).length,
    [apiFilters]
  );

  return { filters, apiFilters, activeCount, setFilter, resetFilters };
};
