/**
 * useShipmentDetail — one shipment, whatever it was built from.
 *
 * The list hands over `sourceId` and `source`. A container-backed shipment
 * refetches its own detail (richer than the list payload); an order-backed
 * one is resolved from the orders list already in cache, because a
 * pre-consolidation order has no detail endpoint of its own.
 *
 * Reuses existing query keys throughout — no new API surface.
 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@src/store/Auth';
import { customerContainerApi } from '@src/features/customer/containers/api';
import { QUERY_KEYS } from '@src/features/customer/containers/hooks/containers/useCustomerContainerKeys';
import { getOrdersBasedOnUserId } from '@src/shared/api/order';
import type { productType } from '@src/shared/api/order';
import type { CustomerContainer } from '@src/features/customer/containers/types/container';
import { fromContainer, fromOrder, type Shipment } from '@src/entities/shipment';

export type ShipmentSource = 'container' | 'order';

export const useShipmentDetail = (shipmentId: string, source: ShipmentSource) => {
  const userId = useAuth((state) => state.user?._id);
  const isContainer = source === 'container';

  const containerQuery = useQuery({
    queryKey: QUERY_KEYS.containerDetail(shipmentId),
    queryFn: () => customerContainerApi.getContainerDetails(shipmentId),
    select: (response: any) => {
      const container = response?.data?.data?.container;
      if (!container) return undefined;
      const routeData = container.routeId || container.route;
      return {
        ...container,
        myGoods: container.customerGoods?.items || [],
        route: routeData
          ? {
              name: routeData.name || '',
              origin:
                typeof routeData.origin === 'string'
                  ? routeData.origin
                  : routeData.origin?.city || '',
              destination:
                typeof routeData.destination === 'string'
                  ? routeData.destination
                  : routeData.destination?.city || '',
              estimatedTransitDays: routeData.estimatedTransitDays || 0,
            }
          : { name: '', origin: '', destination: '', estimatedTransitDays: 0 },
      } as CustomerContainer;
    },
    enabled: isContainer && !!shipmentId,
    staleTime: 30 * 1000,
  });

  const ordersQuery = useQuery({
    queryKey: ['order', userId],
    queryFn: () => getOrdersBasedOnUserId(userId as string),
    enabled: !isContainer && !!userId,
  });

  const shipment: Shipment | undefined = useMemo(() => {
    if (isContainer) {
      return containerQuery.data ? fromContainer(containerQuery.data) : undefined;
    }
    const orders = Array.isArray(ordersQuery.data) ? (ordersQuery.data as productType[]) : [];
    const match = orders.find(
      (o) => o._id === shipmentId || o.orderId === shipmentId || o.code === shipmentId,
    );
    return match ? fromOrder(match) : undefined;
  }, [isContainer, containerQuery.data, ordersQuery.data, shipmentId]);

  const active = isContainer ? containerQuery : ordersQuery;

  return {
    shipment,
    /** The raw container, for surfaces that still need container-only fields. */
    container: isContainer ? containerQuery.data : undefined,
    isLoading: active.isLoading,
    isError: active.isError,
    // A resolved query that yields no shipment is a real "not found", which the
    // screen must distinguish from a network failure.
    notFound: !active.isLoading && !active.isError && !shipment,
    refetch: active.refetch,
    isRefetching: active.isRefetching,
  };
};
