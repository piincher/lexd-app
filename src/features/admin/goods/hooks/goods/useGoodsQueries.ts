/**
 * Goods Query Hooks - Read operations for goods management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { goodsService, GoodsSummary } from '../../services/GoodsService';
import { Goods, GoodsFilters } from '../../types';
import { ApiResponse, PaginatedResponse } from '@src/shared/types/api';
import { ApiClientError } from '@src/api/client';

type GoodsQueryOptions<TData> = Omit<
  UseQueryOptions<TData, ApiClientError>,
  'queryKey' | 'queryFn'
>;

export const goodsQueryKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsQueryKeys.all, 'list'] as const,
  list: (filters: GoodsFilters | undefined) => [...goodsQueryKeys.lists(), filters] as const,
  summaries: () => [...goodsQueryKeys.all, 'summary'] as const,
  summary: (filters: GoodsFilters | undefined) => [...goodsQueryKeys.summaries(), filters] as const,
  details: () => [...goodsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...goodsQueryKeys.details(), id] as const,
  byClient: (clientId: string) => [...goodsQueryKeys.all, 'client', clientId] as const,
};

export const useGetAllGoods = (
  filters?: GoodsFilters,
  options?: GoodsQueryOptions<ApiResponse<PaginatedResponse<Goods>>>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.list(filters),
    queryFn: () => goodsService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

/**
 * Aggregated totals (count / weight / CBM) for the current filter set.
 * Used by the goods list stats bottom sheet.
 *
 * `enabled` defaults to false — callers opt in when the sheet opens so we
 * don't fire the aggregate query for every list visit. The query key uses
 * the same filter shape as the list, but with its own namespace so a list
 * refetch doesn't invalidate this and vice versa.
 */
export const useGetGoodsSummary = (
  filters?: GoodsFilters,
  options?: GoodsQueryOptions<ApiResponse<GoodsSummary>>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.summary(filters),
    queryFn: () => goodsService.getSummary(filters),
    staleTime: 30 * 1000,
    ...options,
  });
};

export const useGetGoodsById = (
  id: string | undefined,
  options?: GoodsQueryOptions<ApiResponse<Goods>>
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
  options?: GoodsQueryOptions<ApiResponse<Goods[]>>
) => {
  return useQuery({
    queryKey: goodsQueryKeys.byClient(clientId || ''),
    queryFn: () => goodsService.getByClient(clientId!),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
