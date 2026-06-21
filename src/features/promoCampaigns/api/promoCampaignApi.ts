import { apiClientV2, apiRequest } from '@src/shared/api/client';
import type { ApiResponse } from '@src/shared/api/types';
import type { PromoCampaign, PromoCampaignEventType } from '../types';

const BASE_URL = '/promo-campaigns';

export interface ActivePromoCampaignsParams {
  platform?: 'ios' | 'android' | 'web';
  country?: string;
  language?: string;
  appVersion?: string;
}

export interface TrackPromoCampaignEventInput {
  eventType: PromoCampaignEventType;
  slideIndex?: number;
  metadata?: Record<string, unknown>;
}

export const promoCampaignApi = {
  getActive: async (params?: ActivePromoCampaignsParams): Promise<PromoCampaign[]> => {
    const response = await apiRequest.get<PromoCampaign[]>(apiClientV2, `${BASE_URL}/active`, { params });
    return response.data ?? [];
  },

  trackEvent: async (campaignId: string, input: TrackPromoCampaignEventInput): Promise<void> => {
    await apiRequest.post(apiClientV2, `${BASE_URL}/${campaignId}/track`, input);
  },
};
