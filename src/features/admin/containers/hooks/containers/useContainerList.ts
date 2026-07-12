/**
 * Container List & Detail Hooks
 */
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { containerService } from '../../services/ContainerService';
import { ContainerFilters } from '../../types';
import { ApiClientError } from '../../api';
import { containerQueryKeys } from './containerQueryKeys';

type ContainerListQueryData = Awaited<ReturnType<typeof containerService.getAll>>;
type ContainerDetailQueryData = Awaited<ReturnType<typeof containerService.getById>>;
type ContainerStatusQueryData = Awaited<ReturnType<typeof containerService.getByStatus>>;
type ReadyForDepartureQueryData = Awaited<ReturnType<typeof containerService.getReadyForDeparture>>;

export const useGetAllContainers = (
  filters?: ContainerFilters,
  options?: UseQueryOptions<ContainerListQueryData, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.list(filters),
    queryFn: () => containerService.getAll(filters),
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
};

export const useGetContainerById = (
  id: string | undefined,
  options?: UseQueryOptions<ContainerDetailQueryData, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.detail(id || ''),
    queryFn: () => containerService.getById(id!),
    enabled: !!id,
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
};

export const useGetContainersByStatus = (
  status: string,
  options?: UseQueryOptions<ContainerStatusQueryData, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.byStatus(status),
    queryFn: () => containerService.getByStatus(status),
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
};

export const useGetReadyForDeparture = (
  options?: UseQueryOptions<ReadyForDepartureQueryData, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.readyForDeparture(),
    queryFn: () => containerService.getReadyForDeparture(),
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
};
