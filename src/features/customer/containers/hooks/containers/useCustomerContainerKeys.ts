/**
 * Customer Container Query Keys
 * Centralized TanStack Query keys for customer container data fetching
 */

import { CustomerContainerFilters } from '../../types';

export const QUERY_KEYS = {
  myContainers: 'customer-containers',
  containersList: (filters?: CustomerContainerFilters) =>
    [QUERY_KEYS.myContainers, 'list', filters],
  containerDetail: (id: string) => [QUERY_KEYS.myContainers, 'detail', id],
  containerForGoods: (goodsId: string) => [QUERY_KEYS.myContainers, 'for-goods', goodsId],
  packingList: (containerId: string) => [QUERY_KEYS.myContainers, 'packing-list', containerId],
} as const;
