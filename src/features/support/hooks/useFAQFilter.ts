/**
 * useFAQFilter Hook - Search and category filtering for FAQ feature
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { FAQItem, FAQFilter } from '../types';

const DEBOUNCE_MS = 300;
const CATEGORY_ICONS: Record<string, string> = {
  all: 'view-grid-outline',
  general: 'information-outline',
  shipping: 'ferry',
  payment: 'credit-card-outline',
  account: 'account-outline',
  tracking: 'map-marker-outline',
  customs: 'shield-check-outline',
};

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Toutes',
  general: 'Général',
  shipping: 'Expédition',
  payment: 'Paiement',
  account: 'Compte',
  tracking: 'Suivi',
  customs: 'Douane',
};

export const useFAQFilter = (allData: FAQItem[]) => {
  const [filter, setFilter] = useState<FAQFilter>({ searchQuery: '', category: 'all' });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filter.searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filter.searchQuery]);

  const filteredData = useMemo(() => {
    const search = debouncedSearch.toLowerCase().trim();
    return allData.filter((item) => {
      const matchesCategory = filter.category === 'all' || item.category.toLowerCase() === filter.category;
      const matchesSearch = !search || item.question.toLowerCase().includes(search) || item.answer.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [allData, filter.category, debouncedSearch]);

  const setSearchQuery = useCallback((query: string) => setFilter((p) => ({ ...p, searchQuery: query })), []);
  const setCategory = useCallback((category: string) => {
    setFilter((p) => ({ ...p, category: category as FAQFilter['category'] }));
  }, []);
  const clearFilters = useCallback(() => setFilter({ searchQuery: '', category: 'all' }), []);

  const categories = useMemo(() => {
    const unique = [...new Set(allData.map((i) => i.category.toLowerCase()))];
    return [{ id: 'all', label: CATEGORY_LABELS.all, icon: CATEGORY_ICONS.all }, ...unique.map((c) => ({ id: c, label: CATEGORY_LABELS[c] || c, icon: CATEGORY_ICONS[c] || 'help-circle-outline' }))];
  }, [allData]);

  const hasActiveFilters = filter.searchQuery !== '' || filter.category !== 'all';

  return {
    filter,
    filteredData,
    setSearchQuery,
    setCategory,
    clearFilters,
    categories,
    hasActiveFilters,
    resultCount: filteredData.length,
  };
};
