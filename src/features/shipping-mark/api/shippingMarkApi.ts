import { apiClientV2 } from '@src/shared/api/client';
import type { ApiResponse } from '@src/shared/api/types';

export interface ShippingMarkPopupConfig {
  enabled: boolean;
  showOnLogin: boolean;
  title: string;
  message: string;
  actionLabel: string;
  dismissLabel: string;
}

export interface ShippingMarkData {
  userId: string;
  clientId: string;
  shippingMarkImageUrl: string;
  shippingMarkGeneratedAt: string | null;
}

export interface ShippingMarkResponse {
  success: boolean;
  data: ShippingMarkData;
  message: string;
}

export const fetchMyShippingMark = async (): Promise<ShippingMarkResponse> => {
  const response = await apiClientV2.get<ShippingMarkResponse>('/shipping-mark/my');
  return response.data;
};

export const fetchShippingMarkPopupConfig = async (): Promise<ShippingMarkPopupConfig> => {
  const response = await apiClientV2.get<ApiResponse<ShippingMarkPopupConfig>>('/shipping-mark/popup-config');
  return response.data.data;
};
