import { useEffect, useMemo, useState } from 'react';
import type { AdminTicketFilters, AdminTicketStatus } from '../types';

export const useAdminTicketFilters = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState<AdminTicketStatus | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filters = useMemo<AdminTicketFilters>(
    () => ({
      status,
      search: debouncedSearch.trim() || undefined,
      limit: 50,
    }),
    [debouncedSearch, status]
  );

  return {
    search,
    status,
    filters,
    setSearch,
    setStatus,
  };
};
