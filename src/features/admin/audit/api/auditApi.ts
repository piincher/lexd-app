import { apiClientV2 } from '@src/api/client';
import type { AuditLog, AuditLogFilters, AuditLogListResult } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const BASE_URL = '/audit/logs';

const cleanParams = (filters: AuditLogFilters) => {
  const params: Record<string, unknown> = {
    page: filters.page || 1,
    limit: filters.limit || 25,
  };

  if (filters.q?.trim()) params.q = filters.q.trim();
  if (filters.action?.trim()) params.action = filters.action.trim();
  if (filters.resourceType?.trim()) params.resourceType = filters.resourceType.trim();
  if (filters.status && filters.status !== 'ALL') params.status = filters.status;
  if (filters.severity && filters.severity !== 'ALL') params.severity = filters.severity;

  return params;
};

export const auditApi = {
  list: async (filters: AuditLogFilters = {}): Promise<AuditLogListResult> => {
    const response = await apiClientV2.get<ApiResponse<AuditLogListResult>>(BASE_URL, {
      params: cleanParams(filters),
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<AuditLog> => {
    const response = await apiClientV2.get<ApiResponse<AuditLog>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },
};
