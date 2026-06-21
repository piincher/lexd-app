import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { promoCampaignApi } from '../api/promoCampaignApi';
import type { ActivePromoCampaignsParams } from '../api/promoCampaignApi';

export const promoCampaignQueryKeys = {
  all: ['promoCampaigns'] as const,
  active: (params?: ActivePromoCampaignsParams) =>
    [...promoCampaignQueryKeys.all, 'active', params] as const,
};

export const useActivePromoCampaigns = (params?: ActivePromoCampaignsParams) =>
  useQuery({
    queryKey: promoCampaignQueryKeys.active(params),
    queryFn: () => promoCampaignApi.getActive(params),
    staleTime: DEFAULT_STALE_TIME,
  });
