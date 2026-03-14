/**
 * useGoodsDetail Hook
 * React Query hook for fetching goods detail data
 * Extracted from GoodsDetailScreen during Phase 3 refactoring
 */

import { useQuery } from '@tanstack/react-query';
import { goodsService } from '../services/GoodsService';
import { goodsQueryKeys } from './useGoods';
import { Goods } from '@src/shared/types/goods';
import { ApiResponse } from '@src/api/types';
import { ApiClientError } from '@src/api/client';

/**
 * Hook to fetch goods details by ID
 * Used by GoodsDetailScreen for data fetching
 * 
 * @param goodsId - The goods ID to fetch
 * @returns React Query result with Goods data
 */
export const useGoodsDetail = (goodsId: string) => {
  return useQuery<ApiResponse<Goods>, ApiClientError>({
    queryKey: goodsQueryKeys.detail(goodsId),
    queryFn: () => goodsService.getById(goodsId),
    enabled: !!goodsId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
