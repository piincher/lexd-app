/**
 * Hook to fetch goods list with offline support
 */

import { useQuery } from '@tanstack/react-query';
import { CACHE_STRATEGIES } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import { GOODS_KEYS } from './goodsKeys';

export const useGoodsList = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: GOODS_KEYS.list(filters),
    queryFn: () => goodsApi.getGoodsList(filters),
    staleTime: CACHE_STRATEGIES.GOODS_LIST.staleTime,
    gcTime: CACHE_STRATEGIES.GOODS_LIST.gcTime,
    networkMode: 'offlineFirst',
  });
};
