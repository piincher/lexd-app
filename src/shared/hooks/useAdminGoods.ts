/**
 * Shared Goods Hooks
 * Cross-feature goods query hooks using direct API calls
 * to maintain cache compatibility with feature-local hooks
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiClientError } from '@src/api/client';

const BASE_URL = '/goods';

export const goodsQueryKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsQueryKeys.all, 'list'] as const,
  list: (filters: any | undefined) =>
    [...goodsQueryKeys.lists(), filters] as const,
};

export const useGetAllGoods = (
  filters?: any,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.list(filters),
    queryFn: () => apiRequest.get(apiClientV2, BASE_URL, { params: filters }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
