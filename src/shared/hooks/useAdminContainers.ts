/**
 * Shared Container Hooks
 * Cross-feature container query hooks using direct API calls
 * to maintain cache compatibility with feature-local hooks
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiClientError } from '@src/api/client';

const BASE_URL = '/containers';

export const containerQueryKeys = {
  all: ['containers'] as const,
  lists: () => [...containerQueryKeys.all, 'list'] as const,
  list: (filters: any | undefined) =>
    [...containerQueryKeys.lists(), filters] as const,
};

export const useGetAllContainers = (
  filters?: any,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.list(filters),
    queryFn: () => apiRequest.get(apiClientV2, BASE_URL, { params: filters }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
