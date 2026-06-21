import { apiClientV2, apiRequest, uploadFile } from '@src/shared/api/client';
import { ApiResponse } from '@src/shared/types/api';
import type { PromoCampaign } from '../types';

export interface PromoCampaignListFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface PromoCampaignListResult {
  campaigns: PromoCampaignAdmin[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface PromoCampaignAdmin extends PromoCampaign {
  _id: string;
  status: string;
  effectiveStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCampaignStats {
  campaignId: string;
  status: string;
  effectiveStatus: string;
  schedule: { startDate: string; endDate: string };
  counters: {
    impressions: number;
    clicks: number;
    dismissals: number;
    uniqueUsers: number;
  };
  rates: {
    ctr: number;
    dismissalRate: number;
  };
}

export interface CreatePromoCampaignInput {
  title: string;
  subtitle?: string;
  body?: string;
  slides: {
    imageUrl: string;
    title?: string;
    body?: string;
    ctaText?: string;
    ctaAction?: string;
    ctaTarget?: string;
    order?: number;
  }[];
  primaryCtaText?: string;
  primaryCtaAction?: string;
  primaryCtaTarget?: string;
  backgroundColor?: string;
  textColor?: string;
  startDate: string;
  endDate: string;
  targetCountries?: string[];
  targetLanguages?: string[];
  targetPlatforms?: string[];
  minAppVersion?: string;
  maxAppVersion?: string;
  dismissBehavior?: string;
  maxImpressionsPerUser?: number | null;
  priority?: number;
  status?: string;
}

const BASE_URL = '/admin/promo-campaigns';

export class PromoCampaignAdminService {
  private static instance: PromoCampaignAdminService;
  private readonly client = apiClientV2;

  private constructor() {}

  static getInstance(): PromoCampaignAdminService {
    if (!PromoCampaignAdminService.instance) {
      PromoCampaignAdminService.instance = new PromoCampaignAdminService();
    }
    return PromoCampaignAdminService.instance;
  }

  async getCampaigns(filters?: PromoCampaignListFilters): Promise<ApiResponse<PromoCampaignListResult>> {
    return apiRequest.get(this.client, BASE_URL, { params: filters });
  }

  async getCampaign(id: string): Promise<ApiResponse<PromoCampaignAdmin>> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}`);
  }

  async createCampaign(data: CreatePromoCampaignInput): Promise<ApiResponse<PromoCampaignAdmin>> {
    return apiRequest.post(this.client, BASE_URL, data);
  }

  async updateCampaign(id: string, data: Partial<CreatePromoCampaignInput>): Promise<ApiResponse<PromoCampaignAdmin>> {
    return apiRequest.put(this.client, `${BASE_URL}/${id}`, data);
  }

  async deleteCampaign(id: string): Promise<ApiResponse<void>> {
    return apiRequest.delete(this.client, `${BASE_URL}/${id}`);
  }

  async duplicateCampaign(id: string): Promise<ApiResponse<PromoCampaignAdmin>> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/duplicate`, {});
  }

  async toggleStatus(id: string, status: string): Promise<ApiResponse<PromoCampaignAdmin>> {
    return apiRequest.post(this.client, `${BASE_URL}/${id}/toggle-status`, { status });
  }

  async getStats(id: string): Promise<ApiResponse<PromoCampaignStats>> {
    return apiRequest.get(this.client, `${BASE_URL}/${id}/stats`);
  }

  async uploadImages(uris: string[]): Promise<ApiResponse<{ urls: string[] }>> {
    const formData = new FormData();
    uris.forEach((uri, index) => {
      formData.append('images', {
        uri,
        name: `promo_${index}_${Date.now()}.jpg`,
        type: 'image/jpeg',
      } as unknown as Blob);
    });
    return uploadFile<{ urls: string[] }>(this.client, '/admin/upload-images', formData);
  }

}

export const promoCampaignAdminService = PromoCampaignAdminService.getInstance();
