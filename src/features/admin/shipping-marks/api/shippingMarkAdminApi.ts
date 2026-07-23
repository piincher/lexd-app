import { apiClientV2 } from '@src/shared/api/client';
import type { ApiResponse, PaginatedResponse } from '@src/shared/api/types';

export interface ShippingMarkConfig {
  shippingMarkWarehouseCode: string;
  shippingMarkDestination: string;
  shippingMarkChineseNotice: string;
  shippingMarkCountryCode: string;
  shippingMarkEnabled: boolean;
  shippingClientIdPrefix: string;
  shippingMarkPopupEnabled: boolean;
  shippingMarkPopupShowOnLogin: boolean;
  shippingMarkPopupTitle: string;
  shippingMarkPopupMessage: string;
  shippingMarkPopupActionLabel: string;
  shippingMarkPopupDismissLabel: string;
}

export interface ShippingMarkClient {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  clientId: string;
  shippingMarkImageUrl?: string;
  shippingMarkGeneratedAt?: string;
  isActive: boolean;
}

export interface AdminShippingMark {
  userId: string;
  clientId: string;
  shippingMarkImageUrl: string;
  shippingMarkGeneratedAt?: string;
}

export interface BulkWhatsAppResult {
  total: number;
  sent: number;
  failed: number;
  skipped: number;
  results: {
    phone: string;
    name?: string;
    success: boolean;
    skipped?: boolean;
    messageId?: string;
    error?: string;
  }[];
}

export interface ShippingMarkDeliveryJob {
  id: string;
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'PARTIAL' | 'FAILED';
  total: number;
}

export type ShippingMarkGenerationStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'PARTIAL' | 'FAILED';

export interface ShippingMarkGenerationJob {
  id: string;
  status: ShippingMarkGenerationStatus;
  total: number;
  generated: number;
  failed: number;
  force: boolean;
  createdAt?: string | null;
  completedAt?: string | null;
}

export interface BulkGenerateShippingMarksPayload {
  userIds?: string[];
  all?: boolean;
  q?: string;
  force?: boolean;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const fetchShippingMarkConfig = async (): Promise<ShippingMarkConfig> => {
  const response = await apiClientV2.get<ApiEnvelope<ShippingMarkConfig>>('/admin/shipping-marks/config');
  return response.data.data;
};

export const updateShippingMarkConfig = async (config: Partial<ShippingMarkConfig>): Promise<ShippingMarkConfig> => {
  const response = await apiClientV2.put<ApiEnvelope<ShippingMarkConfig>>('/admin/shipping-marks/config', config);
  return response.data.data;
};

export interface ClientListFilters {
  q?: string;
  page?: number;
  limit?: number;
}

interface BackendPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginatedClientEnvelope {
  success: boolean;
  data: ShippingMarkClient[];
  pagination: BackendPagination;
  message?: string;
}

export const fetchShippingMarkClients = async (
  filters: ClientListFilters = {},
): Promise<ApiResponse<PaginatedResponse<ShippingMarkClient>>> => {
  const params = new URLSearchParams();
  if (filters.q) params.append('q', filters.q);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const response = await apiClientV2.get<PaginatedClientEnvelope>(
    `/admin/shipping-marks/clients?${params.toString()}`,
  );

  return {
    ...response.data,
    message: response.data.message || 'Clients récupérés',
    data: {
      data: response.data.data,
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.total,
        pages: response.data.pagination.totalPages,
        hasNext: response.data.pagination.hasNextPage,
        hasPrev: response.data.pagination.hasPrevPage,
      },
    },
  };
};

export const sendBulkShippingMarkWhatsApp = async (payload: {
  userIds?: string[];
  all?: boolean;
  q?: string;
  caption?: string;
}): Promise<ShippingMarkDeliveryJob> => {
  const response = await apiClientV2.post<ApiEnvelope<ShippingMarkDeliveryJob>>(
    '/admin/shipping-marks/send-bulk-whatsapp',
    payload,
  );
  return response.data.data;
};

export const regenerateClientShippingMark = async (userId: string): Promise<{ shippingMarkImageUrl: string }> => {
  const response = await apiClientV2.post<ApiEnvelope<{ shippingMarkImageUrl: string }>>(
    `/shipping-mark/admin/${userId}/regenerate`,
  );
  return response.data.data;
};

export const fetchClientShippingMark = async (userId: string): Promise<AdminShippingMark> => {
  const response = await apiClientV2.get<ApiEnvelope<AdminShippingMark>>(
    `/shipping-mark/admin/${userId}`,
  );
  return response.data.data;
};

export const generateBulkShippingMarks = async (
  payload: BulkGenerateShippingMarksPayload,
): Promise<ShippingMarkGenerationJob> => {
  const response = await apiClientV2.post<ApiEnvelope<ShippingMarkGenerationJob>>(
    '/admin/shipping-marks/generate-bulk',
    payload,
  );
  return response.data.data;
};

export const fetchShippingMarkGenerationJob = async (jobId: string): Promise<ShippingMarkGenerationJob> => {
  const response = await apiClientV2.get<ApiEnvelope<ShippingMarkGenerationJob>>(
    `/admin/shipping-marks/generation-jobs/${jobId}`,
  );
  return response.data.data;
};
