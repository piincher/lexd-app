import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { transitStatusService } from '../../services/TransitStatusService';
import { TransitStatus, TransitHistoryEntry, TransitValidationResponse } from '../../types/transitStatus';
import { ApiClientError } from '../../api';

export const transitStatusQueryKeys = {
  all: ['transitStatus'] as const,
  detail: (id: string) => [...transitStatusQueryKeys.all, id] as const,
  history: (id: string) => [...transitStatusQueryKeys.detail(id), 'history'] as const,
  current: (id: string) => [...transitStatusQueryKeys.detail(id), 'current'] as const,
};

export const useGetTransitStatus = (
  containerId: string | undefined,
  options?: UseQueryOptions<TransitStatus, ApiClientError>,
) =>
  useQuery({
    queryKey: transitStatusQueryKeys.current(containerId || ''),
    queryFn: async () => { const response = await transitStatusService.getCurrentTransitStatus(containerId!); return response.data; },
    enabled: !!containerId,
    staleTime: 1 * 60 * 1000,
    ...options,
  });

export const useGetTransitHistory = (
  containerId: string | undefined,
  options?: UseQueryOptions<TransitHistoryEntry[], ApiClientError>,
) =>
  useQuery({
    queryKey: transitStatusQueryKeys.history(containerId || ''),
    queryFn: async () => { const response = await transitStatusService.getTransitHistory(containerId!); return response.data; },
    enabled: !!containerId,
    ...options,
  });

export const useValidateTransitTransition = (
  containerId: string | undefined,
  newStatus: string | undefined,
  options?: UseQueryOptions<TransitValidationResponse, ApiClientError>,
) =>
  useQuery({
    queryKey: [...transitStatusQueryKeys.detail(containerId || ''), 'validate', newStatus] as const,
    queryFn: async () => { const response = await transitStatusService.validateTransitTransition(containerId!, newStatus!); return response.data; },
    enabled: !!containerId && !!newStatus,
    ...options,
  });
