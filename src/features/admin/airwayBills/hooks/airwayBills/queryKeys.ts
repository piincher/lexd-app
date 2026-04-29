import type { AirwayBillFilters } from '../../types';

export const airwayBillQueryKeys = {
  all: ['airwayBills'] as const,
  lists: () => [...airwayBillQueryKeys.all, 'list'] as const,
  list: (filters: AirwayBillFilters | undefined) =>
    [...airwayBillQueryKeys.lists(), filters] as const,
  details: () => [...airwayBillQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...airwayBillQueryKeys.details(), id] as const,
  waypoints: (id: string) => [...airwayBillQueryKeys.detail(id), 'waypoints'] as const,
  routes: () => [...airwayBillQueryKeys.all, 'routes'] as const,
  unassignedGoods: () => [...airwayBillQueryKeys.all, 'unassigned-goods'] as const,
  consignees: (search: string) => [...airwayBillQueryKeys.all, 'consignees', search] as const,
};
