import { apiClient, apiClientV2 } from '@src/shared/api/client';

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pointsRequired: number;
  stock: number;
  pickupMethod: 'PICKUP' | 'DELIVERY';
  status: 'ACTIVE' | 'INACTIVE';
  category: string;
  createdAt: string;
}

export interface ProductRedemption {
  id: string;
  userId: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    name: string;
    rewardPoints: number;
  };
  status: 'PENDING' | 'APPROVED' | 'READY_FOR_PICKUP' | 'COLLECTED' | 'REJECTED' | 'CANCELLED';
  requestedPoints: number;
  pointValueFCFA: number;
  requestedValueFCFA: number;
  approvedPoints: number;
  approvedValueFCFA: number;
  restoredPoints: number;
  rewardItemId: string | null;
  quantity: number;
  pickupMethod: string | null;
  phoneVerification: string;
  customerRemarks: string;
  adminRemarks: string;
  rejectionReason: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
}

export interface RewardSettingsV2 {
  enabled: boolean;
  cbmPointsRate: number;
  kgPointsRate: number;
  autoAwardEnabled: boolean;
  autoAwardTriggerStatus: string;
  pointExpiryMonths: number | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string | null;
}

const BASE_URL = '/rewards/admin';

// ── Reward Items ──────────────────────────────────────────────────────────

export const getAdminRewardItems = async (): Promise<RewardItem[]> => {
  const response = await apiClientV2.get<ApiResponse<RewardItem[]>>(`${BASE_URL}/items`);
  return response.data.data;
};

export const createRewardItem = async (data: Omit<RewardItem, 'id' | 'createdAt'>): Promise<RewardItem> => {
  const response = await apiClientV2.post<ApiResponse<RewardItem>>(`${BASE_URL}/items`, data);
  return response.data.data;
};

export const updateRewardItem = async (id: string, data: Partial<Omit<RewardItem, 'id' | 'createdAt'>>): Promise<RewardItem> => {
  const response = await apiClientV2.put<ApiResponse<RewardItem>>(`${BASE_URL}/items/${id}`, data);
  return response.data.data;
};

export const deleteRewardItem = async (id: string): Promise<void> => {
  await apiClientV2.delete<ApiResponse<void>>(`${BASE_URL}/items/${id}`);
};

// ── Product Redemptions ───────────────────────────────────────────────────

export interface ProductRedemptionList {
  items: ProductRedemption[];
  pagination: PaginationInfo;
}

export const getAdminProductRedemptions = async (
  status?: string,
  search?: string,
  page = 1,
  limit = 20
): Promise<ProductRedemptionList> => {
  const params: Record<string, string | number> = { page, limit };
  if (status && status !== 'all') params.status = status;
  if (search?.trim()) params.search = search.trim();

  const response = await apiClientV2.get<ApiResponse<ProductRedemptionList>>(
    `${BASE_URL}/redemptions`,
    { params }
  );
  return response.data.data;
};

export const approveProductRedemption = async (id: string): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    `${BASE_URL}/redemptions/${id}/approve`
  );
  return response.data.data;
};

export const rejectProductRedemption = async (id: string, reason: string, adminRemarks?: string): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    `${BASE_URL}/redemptions/${id}/reject`,
    { reason, adminRemarks }
  );
  return response.data.data;
};

export const readyProductRedemption = async (id: string): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    `${BASE_URL}/redemptions/${id}/ready`
  );
  return response.data.data;
};

export const collectProductRedemption = async (id: string): Promise<ProductRedemption> => {
  const response = await apiClientV2.post<ApiResponse<ProductRedemption>>(
    `${BASE_URL}/redemptions/${id}/collected`
  );
  return response.data.data;
};

// ── User Search ───────────────────────────────────────────────────────────

export interface UserSearchResult {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  rewardPoints?: number;
}

export const searchAdminUsers = async (query: string): Promise<UserSearchResult[]> => {
  const response = await apiClient.get<{
    success: boolean;
    data: UserSearchResult[];
  }>(`/user/allUsers?search=${encodeURIComponent(query)}&limit=50`);
  return response.data.data;
};

// ── User Points ───────────────────────────────────────────────────────────

export interface UserPointsResult {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  rewardPoints: number;
  ledger: {
    id: string;
    type: string;
    pointsDelta: number;
    balanceAfter: number;
    note: string;
    createdAt: string;
  }[];
}

export const getAdminUserPoints = async (userId: string): Promise<UserPointsResult> => {
  const response = await apiClientV2.get<ApiResponse<UserPointsResult>>(
    `${BASE_URL}/users/${userId}/points`
  );
  return response.data.data;
};

export const adjustUserPoints = async (
  userId: string,
  pointsDelta: number,
  reason: string
): Promise<UserPointsResult> => {
  const response = await apiClientV2.post<ApiResponse<UserPointsResult>>(
    `${BASE_URL}/users/${userId}/adjust`,
    { pointsDelta, reason }
  );
  return response.data.data;
};

// ── Settings V2 ────────────────────────────────────────────────────────────

export const getAdminRewardSettingsV2 = async (): Promise<RewardSettingsV2> => {
  const response = await apiClientV2.get<ApiResponse<RewardSettingsV2>>(`${BASE_URL}/settings-v2`);
  return response.data.data;
};

export const updateAdminRewardSettingsV2 = async (
  settings: Partial<RewardSettingsV2>
): Promise<RewardSettingsV2> => {
  const response = await apiClientV2.put<ApiResponse<RewardSettingsV2>>(
    `${BASE_URL}/settings-v2`,
    settings
  );
  return response.data.data;
};
