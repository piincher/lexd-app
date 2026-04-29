/**
 * Container Query Keys
 */
import { ContainerFilters } from '../../types';

export const containerQueryKeys = {
  all: ['containers'] as const,
  lists: () => [...containerQueryKeys.all, 'list'] as const,
  list: (filters: ContainerFilters | undefined) =>
    [...containerQueryKeys.lists(), filters] as const,
  details: () => [...containerQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...containerQueryKeys.details(), id] as const,
  byStatus: (status: string) =>
    [...containerQueryKeys.all, 'status', status] as const,
  readyForDeparture: () =>
    [...containerQueryKeys.all, 'ready-for-departure'] as const,
  packingList: (id: string) =>
    [...containerQueryKeys.detail(id), 'packing-list'] as const,
  unassignedGoods: (shippingMode?: string) =>
    [...containerQueryKeys.all, 'unassigned-goods', shippingMode] as const,
  routes: () => [...containerQueryKeys.all, 'routes'] as const,
  routesByMode: (mode: string) =>
    [...containerQueryKeys.routes(), 'mode', mode] as const,
};
