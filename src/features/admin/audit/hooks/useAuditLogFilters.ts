import { useEffect, useMemo, useState } from 'react';
import type { AuditDatePreset, AuditLogFilters, AuditStatus } from '../types';

const toIsoStartOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value.toISOString();
};

const toIsoEndOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value.toISOString();
};

const getDateRange = (preset?: AuditDatePreset) => {
  if (!preset) return {};
  const end = new Date();
  const start = new Date();

  if (preset === '7d') start.setDate(end.getDate() - 7);
  if (preset === '30d') start.setDate(end.getDate() - 30);

  return {
    startDate: toIsoStartOfDay(start),
    endDate: toIsoEndOfDay(end),
  };
};

export const useAuditLogFilters = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState<AuditStatus | undefined>();
  const [action, setAction] = useState('');
  const [datePreset, setDatePreset] = useState<AuditDatePreset | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filters = useMemo<AuditLogFilters>(
    () => ({
      action: action.trim() || undefined,
      status,
      ...getDateRange(datePreset),
      search: debouncedSearch.trim() || undefined,
      limit: 50,
    }),
    [action, datePreset, debouncedSearch, status]
  );

  return { action, datePreset, filters, search, status, setAction, setDatePreset, setSearch, setStatus };
};
