/**
 * Goods Query Hooks - Read operations for goods management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { goodsService } from '../../services/GoodsService';
import { Goods, GoodsFilters } from '../../types';
import { ApiResponse, PaginatedResponse } from '@src/shared/types/api';
import { ApiClientError } from '@src/api/client';

export const goodsQueryKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsQueryKeys.all, 'list'] as const,
  list: (filters: GoodsFilters | undefined) => [...goodsQueryKeys.lists(), filters] as const,
  details: () => [...goodsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...goodsQueryKeys.details(), id] as const,
  byClient: (clientId: string) => [...goodsQueryKeys.all, 'client', clientId] as const,
};

export const useGetAllGoods = (
  filters?: GoodsFilters,
  options?: UseQueryOptions<ApiResponse<PaginatedResponse<Goods>>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.list(filters),
    queryFn: () => goodsService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGetGoodsById = (
  id: string | undefined,
  options?: UseQueryOptions<ApiResponse<Goods>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.detail(id || ''),
    queryFn: () => goodsService.getById(id!),
    enabled: !!id,
    staleTime: 0,
    ...options,
  });
};

export const useGetGoodsByClient = (
  clientId: string | undefined,
  options?: UseQueryOptions<ApiResponse<Goods[]>, ApiClientError>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.byClient(clientId || ''),
    queryFn: () => goodsService.getByClient(clientId!),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
