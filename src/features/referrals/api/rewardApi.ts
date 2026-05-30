import { apiClientV2 } from '@src/shared/api/client';
import type {
  CreateProductRedemptionPayload,
  ProductRedemption,
  ProductRedemptionList,
  RewardItem,
  RewardLedgerList,
  RewardLedgerListV2,
  RewardSettings,
  RewardSummary,
  RewardSummaryV2,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

export const getMyRewards = async (): Promise<RewardSummary> => {
  const response = await apiClientV2.get<ApiResponse<RewardSummary>>('/rewards/me');
  return response.data.data;
};

export const getRewardSettings = async (): Promise<RewardSettings> => {
  const response = await apiClientV2.get<ApiResponse<RewardSettings>>('/rewards/admin/settings');
  return response.data.data;
};

export const updateRewardSettings = async (
  settings: Partial<RewardSettings>
): Promise<RewardSettings> => {
  const response = await apiClientV2.put<ApiResponse<RewardSettings>>(
    '/rewards/admin/settings',
    settings
  );
  return response.data.data;
};

export const getRewardLedger = async (): Promise<RewardLedgerList> => {
  const response = await apiClientV2.get<ApiResponse<RewardLedgerList>>('/rewards/admin/ledger');
  return response.data.data;
};

export const applyRewardToInvoice = async (
  invoiceId: string,
  points: number,
  note?: string
): Promise<unknown> => {
  const response = await apiClientV2.post<ApiResponse<unknown>>(
    `/invoices/${invoiceId}/reward`,
    { points, note }
  );
  return response.data.data;
};

export const getActiveRewardItems = async (): Promise<RewardItem[]> => {
  const response = await apiClientV2.get<ApiResponse<{ items: RewardItem[]; pagination: unknown }>>('/rewards/items');
  return response.data.data?.items || [];
};

export const getRewardItemById = async (id: string): Promise<RewardItem> => {
  const response = await apiClientV2.get<ApiResponse<RewardItem>>(`/rewards/items/${id}`);
  return response.data.data;
};

export const createProductRedemption = async (
  payload: CreateProductRedemptionPayload
): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    '/rewards/redemptions/product',
    payload
  );
  return response.data.data;
};

export const getMyProductRedemptions = async (
  page = 1,
  limit = 20
): Promise<ProductRedemptionList> => {
  const response = await apiClientV2.get<ApiResponse<ProductRedemptionList>>(
    '/rewards/redemptions/me',
    { params: { page, limit } }
  );
  return response.data.data;
};

export const cancelMyProductRedemption = async (id: string): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    `/rewards/redemptions/${id}/cancel`
  );
  return response.data.data;
};

export const getMyPointLedger = async (page = 1, limit = 20): Promise<RewardLedgerListV2> => {
  const response = await apiClientV2.get<ApiResponse<RewardLedgerListV2>>('/rewards/ledger/me', {
    params: { page, limit },
  });
  return response.data.data;
};

export const getMyRewardSummaryV2 = async (): Promise<RewardSummaryV2> => {
  const response = await apiClientV2.get<ApiResponse<RewardSummaryV2>>('/rewards/summary');
  return response.data.data;
};
