import { apiClientV2 } from '@src/shared/api/client';
import type { ReferralSummary, ReferralValidation } from '../types';

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
