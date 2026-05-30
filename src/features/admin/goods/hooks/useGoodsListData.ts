/**
 * useGoodsListData - Data fetching for goods list
 */

import { useMemo, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllGoods, goodsQueryKeys } from './useGoods';
import { GoodsFilters } from '../types';
import { ApiClientError } from '@src/api/client';
import type { Goods } from '../types';

const extractGoodsList = (payload: unknown): Goods[] => {
  const root = payload as {
    data?: unknown;
    goods?: unknown;
  } | null | undefined;

  if (Array.isArray(root?.data)) return root.data as Goods[];
  if (Array.isArray(root?.goods)) return root.goods as Goods[];

  const nested = root?.data as { goods?: unknown; data?: unknown } | null | undefined;
  if (Array.isArray(nested?.goods)) return nested.goods as Goods[];
  if (Array.isArray(nested?.data)) return nested.data as Goods[];

  return [];
};

const extractGoodsTotal = (payload: unknown, fallbackCount: number): number => {
  const root = payload as {
    data?: unknown;
    pagination?: { total?: number };
  } | null | undefined;
  const nested = root?.data as { pagination?: { total?: number } } | null | undefined;

  return nested?.pagination?.total ?? root?.pagination?.total ?? fallbackCount;
};

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

  const goods = useMemo(() => extractGoodsList(data), [data]);
  const total = useMemo(() => extractGoodsTotal(data, goods.length), [data, goods.length]);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    await refetch();
  }, [queryClient, refetch]);

  return { goods, total, isLoading, isRefetching, error: error || null, refetch, handleRefresh };
};
