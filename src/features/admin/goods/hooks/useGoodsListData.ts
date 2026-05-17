/**
 * useGoodsListData - Data fetching for goods list
 */

import { useMemo, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllGoods, goodsQueryKeys } from './useGoods';
import { GoodsFilters } from '../types';
import { ApiClientError } from '@src/api/client';

export const useGoodsListData = (
  filters: GoodsFilters,
  onError?: (error: ApiClientError) => void,
) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching, error, refetch } = useGetAllGoods(filters);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const goods = useMemo(() => data?.data?.goods || [], [data]);
  const total = useMemo(() => data?.data?.pagination?.total || 0, [data]);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    await refetch();
  }, [queryClient, refetch]);

  return { goods, total, isLoading, isRefetching, error: error || null, refetch, handleRefresh };
};
