/**
 * Hook to fetch single goods with offline support
 */

import { useQuery } from '@tanstack/react-query';
import { CACHE_STRATEGIES } from '../../../../shared';
import { goodsApi } from '../../api/goodsApi';
import { GOODS_KEYS } from './goodsKeys';

export const useGoodsDetail = (id: string) => {
  return useQuery({
    queryKey: GOODS_KEYS.detail(id),
    queryFn: () => goodsApi.getGoodsById(id),
    staleTime: CACHE_STRATEGIES.GOODS_LIST.staleTime,
    gcTime: CACHE_STRATEGIES.GOODS_LIST.gcTime,
    enabled: !!id,
    networkMode: 'offlineFirst',
  });
};
