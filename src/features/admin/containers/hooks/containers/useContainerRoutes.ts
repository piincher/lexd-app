/**
 * Container Route Hooks (Phase 3)
 */
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { ShippingMode, Route } from '../../types';
import { ApiClientError, ApiResponse } from '../../api';
import { containerQueryKeys } from './containerQueryKeys';

export const useGetActiveRoutesForMode = (
  mode: ShippingMode | undefined,
  options?: UseQueryOptions<ApiResponse<{ routes: Route[] }>, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.routesByMode(mode || ''),
    queryFn: () => containerService.getActiveRoutesByMode(mode!),
    enabled: !!mode,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
