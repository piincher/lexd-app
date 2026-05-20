import { apiClientV2 } from '@src/shared/api/client';
import type { RewardLedgerList, RewardSettings, RewardSummary } from '../types';

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
