import { useMutation } from '@tanstack/react-query';
import { promoCampaignApi } from '../api/promoCampaignApi';
import type { TrackPromoCampaignEventInput } from '../api/promoCampaignApi';

export const usePromoCampaignTrack = () =>
  useMutation({
    mutationFn: ({ campaignId, input }: { campaignId: string; input: TrackPromoCampaignEventInput }) =>
      promoCampaignApi.trackEvent(campaignId, input),
  });
