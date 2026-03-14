import { useState, useCallback } from 'react';

export interface WhatsAppFilters {
  status: string | null;
  startDate: Date | null;
  endDate: Date | null;
  search: string;
}

export const useWhatsAppFilters = () => {
  const [filters, setFilters] = useState<WhatsAppFilters>({
    status: null,
    startDate: null,
    endDate: null,
    search: '',
  });

  const updateFilter = useCallback(<K extends keyof WhatsAppFilters>(
    key: K,
    value: WhatsAppFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: null,
      startDate: null,
      endDate: null,
      search: '',
    });
  }, []);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return { filters, updateFilter, resetFilters, activeFiltersCount };
};
