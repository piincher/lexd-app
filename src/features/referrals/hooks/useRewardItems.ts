import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getActiveRewardItems,
  getRewardItemById,
  type RewardCatalogSort,
} from '../api/rewardApi';

export interface RewardCatalogFilters {
  search?: string;
  category?: string;
  sort?: RewardCatalogSort;
  limit?: number;
}

export const rewardItemsQueryKeys = {
  all: ['rewards', 'items'] as const,
  list: () => [...rewardItemsQueryKeys.all, 'list'] as const,
  infinite: (filters: { search: string; category: string; sort: RewardCatalogSort }) =>
    [...rewardItemsQueryKeys.all, 'infinite', filters] as const,
  detail: (id: string) => [...rewardItemsQueryKeys.all, 'detail', id] as const,
};

/** Legacy single-page hook — returns just the items array. */
export const useActiveRewardItems = () =>
  useQuery({
    queryKey: rewardItemsQueryKeys.list(),
    queryFn: () => getActiveRewardItems(),
    select: (data) => data.items,
  });

/**
 * Paginated reward catalogue with server-side search / category / sort.
 * Keeps the previous page list visible while a new filter query resolves so the
 * grid doesn't flash empty as the user types or switches chips.
 */
export const useActiveRewardItemsInfinite = (filters: RewardCatalogFilters = {}) => {
  const { search = '', category = 'all', sort = 'points_asc', limit = 20 } = filters;

  return useInfiniteQuery({
    queryKey: rewardItemsQueryKeys.infinite({ search, category, sort }),
    queryFn: ({ pageParam }) =>
      getActiveRewardItems({ page: pageParam, limit, search, category, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.pages
        ? lastPage.pagination.page + 1
        : undefined,
    placeholderData: (previous) => previous,
  });
};

export const useRewardItemDetail = (id: string) =>
  useQuery({
    queryKey: rewardItemsQueryKeys.detail(id),
    queryFn: () => getRewardItemById(id),
    enabled: !!id,
  });
