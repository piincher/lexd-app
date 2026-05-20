import { apiV2, apiRequest } from "@src/api/client";

const client = apiV2;
const BASE_URL = "/customer/certificate";

export interface TrustBadge {
  id: string;
  label: string;
  icon: string;
}

export interface TrustProfile {
  userId: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  memberSince: string;
  accountAgeDays: number;
  totalShipments: number;
  totalCBM: number;
  successfulRate: number;
  trustScore: number;
  isCertified: boolean;
  certificate: {
    certificateId: string;
    verificationCode: string;
    issuedAt: string;
    certificateUrl: string;
  } | null;
  badges: {
    earned: TrustBadge[];
    locked: TrustBadge[];
  };
}

export interface ShareTrustProfileResponse {
  shareUrl: string;
  expiresAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const trustProfileApi = {
  getTrustProfile: (): Promise<ApiResponse<TrustProfile>> =>
    apiRequest.get<TrustProfile>(client, `${BASE_URL}/trust-profile`),

  shareTrustProfile: (): Promise<ApiResponse<ShareTrustProfileResponse>> =>
    apiRequest.post<ShareTrustProfileResponse>(client, `${BASE_URL}/trust-profile/share`),
};
