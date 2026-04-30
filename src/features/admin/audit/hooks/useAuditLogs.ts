import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../api';
import type { AuditLogFilters } from '../types';

export const auditQueryKeys = {
  all: ['admin', 'audit'] as const,
  list: (filters: AuditLogFilters) => [...auditQueryKeys.all, 'list', filters] as const,
  detail: (id: string) => [...auditQueryKeys.all, 'detail', id] as const,
};

export const useAuditLogs = (filters: AuditLogFilters) => {
  return useQuery({
    queryKey: auditQueryKeys.list(filters),
    queryFn: () => auditApi.list(filters),
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export const useAuditLogDetail = (id: string) => {
  return useQuery({
    queryKey: auditQueryKeys.detail(id),
    queryFn: () => auditApi.getById(id),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};
