import { useQuery } from '@tanstack/react-query';
import { getActiveRewardItems, getRewardItemById } from '../api/rewardApi';

export const rewardItemsQueryKeys = {
  all: ['rewards', 'items'] as const,
  list: () => [...rewardItemsQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...rewardItemsQueryKeys.all, 'detail', id] as const,
};

export const useActiveRewardItems = () =>
  useQuery({
    queryKey: rewardItemsQueryKeys.list(),
    queryFn: getActiveRewardItems,
  });

export const useRewardItemDetail = (id: string) =>
  useQuery({
    queryKey: rewardItemsQueryKeys.detail(id),
    queryFn: () => getRewardItemById(id),
    enabled: !!id,
  });
