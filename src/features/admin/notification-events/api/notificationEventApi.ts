import { apiClientV2 } from '@src/api/client';
import type {
  NotificationEventFilters,
  NotificationEventListResult,
  NotificationEventLog,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const BASE_URL = '/notification-events';

const cleanParams = (filters: NotificationEventFilters) => {
  const params: Record<string, unknown> = {
    page: filters.page || 1,
    limit: filters.limit || 50,
  };

  if (filters.q?.trim()) params.q = filters.q.trim();
  if (filters.type?.trim()) params.type = filters.type.trim();
  if (filters.status && filters.status !== 'ALL') params.status = filters.status;
  if (filters.pushStatus && filters.pushStatus !== 'ALL') params.pushStatus = filters.pushStatus;
  if (filters.inAppStatus && filters.inAppStatus !== 'ALL') params.inAppStatus = filters.inAppStatus;
  if (filters.whatsappStatus && filters.whatsappStatus !== 'ALL') {
    params.whatsappStatus = filters.whatsappStatus;
  }

  return params;
};

export const notificationEventApi = {
  list: async (filters: NotificationEventFilters = {}): Promise<NotificationEventListResult> => {
    const response = await apiClientV2.get<ApiResponse<NotificationEventListResult>>(BASE_URL, {
      params: cleanParams(filters),
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<NotificationEventLog> => {
    const response = await apiClientV2.get<ApiResponse<NotificationEventLog>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },
};
