import { apiClientV2 } from '@src/shared/api/client';
import type {
  AdminRedemptionList,
  ApproveRedemptionPayload,
  EligibleGoodsResult,
  RedemptionAnalytics,
  ReferralSummary,
  ReferralValidation,
  RewardRedemption,
  RewardRedemptionStatus,
  UserRedemptionList,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

export const getReferralSummary = async (): Promise<ReferralSummary> => {
  const response = await apiClientV2.get<ApiResponse<ReferralSummary>>('/referrals/me');
  return response.data.data;
};

export const validateReferralCode = async (code: string): Promise<ReferralValidation> => {
  const response = await apiClientV2.get<ApiResponse<ReferralValidation>>(
    `/referrals/validate/${encodeURIComponent(code.trim())}`,
    { headers: { skipAuth: 'true' } }
  );
  return response.data.data;
};

export const applyReferralCode = async (referralCode: string) => {
  const response = await apiClientV2.post<ApiResponse<unknown>>('/referrals/me/apply', {
    referralCode,
  });
  return response.data.data;
};

export const createRedemptionRequest = async (
  points: number,
  note?: string,
  idempotencyKey?: string
): Promise<RewardRedemption> => {
  const response = await apiClientV2.post<ApiResponse<RewardRedemption>>('/referrals/redemptions', {
    points,
    note,
    idempotencyKey,
  });
  return response.data.data;
};

export const getMyRedemptions = async (page = 1, limit = 20): Promise<UserRedemptionList> => {
  const response = await apiClientV2.get<ApiResponse<UserRedemptionList>>('/referrals/redemptions/me', {
    params: { page, limit },
  });
  return response.data.data;
};

export const getRedemptionById = async (id: string): Promise<RewardRedemption> => {
  const response = await apiClientV2.get<ApiResponse<RewardRedemption>>(`/referrals/redemptions/${id}`);
  return response.data.data;
};

export const cancelRedemption = async (id: string): Promise<RewardRedemption> => {
  const response = await apiClientV2.post<ApiResponse<RewardRedemption>>(
    `/referrals/redemptions/${id}/cancel`
  );
  return response.data.data;
};

export const getAdminRedemptions = async (
  status: RewardRedemptionStatus | 'ALL' = 'PENDING',
  search?: string,
  page = 1,
  limit = 20
): Promise<AdminRedemptionList> => {
  const params: Record<string, string | number> = { page, limit };
  if (status !== 'ALL') params.status = status;
  if (search?.trim()) params.search = search.trim();

  const response = await apiClientV2.get<ApiResponse<AdminRedemptionList>>(
    '/referrals/redemptions/admin',
    { params }
  );
  return response.data.data;
};

export const getEligibleRedemptionGoods = async (id: string): Promise<EligibleGoodsResult> => {
  const response = await apiClientV2.get<ApiResponse<EligibleGoodsResult>>(
    `/referrals/redemptions/${id}/eligible-goods`
  );
  return response.data.data;
};

export const approveRedemption = async (
  id: string,
  payload: ApproveRedemptionPayload
): Promise<unknown> => {
  const response = await apiClientV2.post<ApiResponse<unknown>>(
    `/referrals/redemptions/${id}/approve`,
    payload
  );
  return response.data.data;
};

export const rejectRedemption = async (id: string, reason: string): Promise<RewardRedemption> => {
  const response = await apiClientV2.post<ApiResponse<RewardRedemption>>(
    `/referrals/redemptions/${id}/reject`,
    { reason }
  );
  return response.data.data;
};

export const getRedemptionAnalytics = async (
  startDate?: string,
  endDate?: string
): Promise<RedemptionAnalytics> => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await apiClientV2.get<ApiResponse<RedemptionAnalytics>>(
    '/referrals/redemptions/admin/analytics',
    { params }
  );
  return response.data.data;
};
