import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { promoCampaignAdminService } from '../api/promoCampaignAdminApi';
import type { PromoCampaignListFilters } from '../api/promoCampaignAdminApi';

export const promoCampaignAdminQueryKeys = {
  all: ['promoCampaignsAdmin'] as const,
  lists: () => [...promoCampaignAdminQueryKeys.all, 'list'] as const,
  list: (filters?: PromoCampaignListFilters) =>
    [...promoCampaignAdminQueryKeys.lists(), filters] as const,
  detail: (id: string) => [...promoCampaignAdminQueryKeys.all, 'detail', id] as const,
  stats: (id: string) => [...promoCampaignAdminQueryKeys.all, 'stats', id] as const,
};

export const usePromoCampaignsAdmin = (filters?: PromoCampaignListFilters) =>
  useQuery({
    queryKey: promoCampaignAdminQueryKeys.list(filters),
    queryFn: async () => {
      const response = await promoCampaignAdminService.getCampaigns(filters);
      return response.data;
    },
    staleTime: DEFAULT_STALE_TIME,
  });

export const usePromoCampaignAdmin = (id?: string) =>
  useQuery({
    queryKey: promoCampaignAdminQueryKeys.detail(id || ''),
    queryFn: async () => {
      const response = await promoCampaignAdminService.getCampaign(id || '');
      return response.data;
    },
    enabled: Boolean(id),
    staleTime: DEFAULT_STALE_TIME,
  });

export const usePromoCampaignStats = (id?: string) =>
  useQuery({
    queryKey: promoCampaignAdminQueryKeys.stats(id || ''),
    queryFn: async () => {
      const response = await promoCampaignAdminService.getStats(id || '');
      return response.data;
    },
    enabled: Boolean(id),
    staleTime: DEFAULT_STALE_TIME,
  });

export const useInvalidatePromoCampaignsAdmin = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: promoCampaignAdminQueryKeys.lists() });
  };
};
