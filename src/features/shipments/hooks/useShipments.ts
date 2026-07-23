/**
 * useShipments — the customer's unified shipment list.
 *
 * Composes the two existing queries rather than introducing a new endpoint.
 * Both reuse their original query keys, so this hook shares the React Query
 * cache with the screens that already read them: opening the shipments list
 * does not refetch what the dashboard already loaded.
 */

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@src/store/Auth';
import { customerContainerApi } from '@src/features/customer/containers/api';
import { QUERY_KEYS } from '@src/features/customer/containers/hooks/containers/useCustomerContainerKeys';
import { getOrdersBasedOnUserId } from '@src/shared/api/order';
import type { productType } from '@src/shared/api/order';
import type { CustomerContainer } from '@src/features/customer/containers/types/container';
import { buildShipments, type Shipment, type ShipmentStage } from '@src/entities/shipment';

/** Coarse buckets the customer actually filters by. */
export type ShipmentFilter = 'all' | 'active' | 'action' | 'delivered';

const IN_FLIGHT: ShipmentStage[] = [
  'REGISTERED',
  'AT_WAREHOUSE',
  'PREPARING',
  'CONSOLIDATED',
  'DEPARTED',
  'IN_TRANSIT',
  'ARRIVED',
];

/** Exported for tests — this is domain logic, not a rendering detail. */
export const matchesFilter = (s: Shipment, filter: ShipmentFilter): boolean => {
  switch (filter) {
    case 'action':
      return s.needsAction;
    case 'delivered':
      return s.stage === 'DELIVERED';
    case 'active':
      return !!s.stage && IN_FLIGHT.includes(s.stage) && !s.exception;
    case 'all':
    default:
      return true;
  }
};

export const matchesQuery = (s: Shipment, q: string): boolean => {
  if (!q) return true;
  const needle = q.toLowerCase().trim();
  return (
    s.reference.toLowerCase().includes(needle) ||
    (s.origin || '').toLowerCase().includes(needle) ||
    (s.destination || '').toLowerCase().includes(needle) ||
    (s.carrier || '').toLowerCase().includes(needle) ||
    s.contents.some(
      (i) =>
        i.reference.toLowerCase().includes(needle) ||
        i.description.toLowerCase().includes(needle),
    )
  );
};

/** Normalizes the containers payload, which arrives wrapped. */
const readContainers = (payload: unknown): CustomerContainer[] => {
  const data = payload as { containers?: CustomerContainer[] } | undefined;
  return Array.isArray(data?.containers) ? data!.containers : [];
};

export const useShipments = () => {
  const userId = useAuth((state) => state.user?._id);

  const containersQuery = useQuery({
    queryKey: QUERY_KEYS.containersList(undefined),
    queryFn: () => customerContainerApi.getMyContainers(),
    select: (response: any) => response?.data?.data,
    staleTime: 2 * 60 * 1000,
  });

  const ordersQuery = useQuery({
    // Same key the orders screen uses — shared cache, no duplicate request.
    queryKey: ['order', userId],
    queryFn: () => getOrdersBasedOnUserId(userId as string),
    enabled: !!userId,
  });

  const [filter, setFilter] = useState<ShipmentFilter>('all');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const shipments = useMemo(
    () =>
      buildShipments(
        readContainers(containersQuery.data),
        Array.isArray(ordersQuery.data) ? (ordersQuery.data as productType[]) : [],
      ),
    [containersQuery.data, ordersQuery.data],
  );

  const visible = useMemo(
    () => shipments.filter((s) => matchesFilter(s, filter) && matchesQuery(s, search)),
    [shipments, filter, search],
  );

  /** Counts are computed off the unfiltered list so the chips stay stable. */
  const counts = useMemo(
    () => ({
      all: shipments.length,
      active: shipments.filter((s) => matchesFilter(s, 'active')).length,
      action: shipments.filter((s) => matchesFilter(s, 'action')).length,
      delivered: shipments.filter((s) => matchesFilter(s, 'delivered')).length,
    }),
    [shipments],
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([containersQuery.refetch(), ordersQuery.refetch()]);
    } finally {
      setRefreshing(false);
    }
  }, [containersQuery, ordersQuery]);

  return {
    shipments: visible,
    allShipments: shipments,
    counts,
    filter,
    setFilter,
    search,
    setSearch,
    // Only a first load should show the skeleton; a background refetch keeps
    // the current list on screen.
    isLoading: containersQuery.isLoading || ordersQuery.isLoading,
    isError: containersQuery.isError && ordersQuery.isError,
    error: containersQuery.error || ordersQuery.error,
    refreshing,
    refresh,
  };
};
