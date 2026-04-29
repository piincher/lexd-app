/**
 * Container List & Detail Hooks
 */
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { ContainerFilters } from '../../types';
import { ApiClientError } from '../../api';
import { containerQueryKeys } from './containerQueryKeys';

export const useGetAllContainers = (
  filters?: ContainerFilters,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.list(filters),
    queryFn: () => containerService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetContainerById = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.detail(id || ''),
    queryFn: () => containerService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetContainersByStatus = (
  status: string,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.byStatus(status),
    queryFn: () => containerService.getByStatus(status),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetReadyForDeparture = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: containerQueryKeys.readyForDeparture(),
    queryFn: () => containerService.getReadyForDeparture(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
