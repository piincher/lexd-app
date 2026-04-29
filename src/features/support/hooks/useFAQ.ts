/**
 * useFAQ Hook - Data fetching and filtering for FAQ feature
 * Following SRP: Single purpose - fetch and filter FAQ data (< 100 lines)
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FAQItem, FAQCategory, FAQFilter } from '../types';
import { fetchMockFAQs } from '../api/faqMockData';

const FAQ_QUERY_KEY = 'faqs';
const DEBOUNCE_MS = 300;

export interface UseFAQReturn {
  filteredData: FAQItem[];
  allData: FAQItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  filter: FAQFilter;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  categories: { id: string; label: string; icon: string }[];
  resultCount: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  all: 'apps',
  general: 'information-circle',
  shipping: 'boat',
  payment: 'card',
  account: 'person',
  tracking: 'location',
  customs: 'shield-checkmark',
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

export const useFAQ = (): UseFAQReturn => {
  const [filter, setFilter] = useState<FAQFilter>({ searchQuery: '', category: 'all' });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filter.searchQuery), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filter.searchQuery]);

  const { data, isLoading, isError, error, refetch } = useQuery<FAQItem[], Error>({
    queryKey: [FAQ_QUERY_KEY],
    queryFn: fetchMockFAQs,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    // Use global retry config
  });

  const allData = useMemo(() => data || [], [data]);

  const filteredData = useMemo(() => {
    const search = debouncedSearch.toLowerCase().trim();
    return allData.filter((item) => {
      const matchesCategory = filter.category === 'all' || item.category.toLowerCase() === filter.category;
      const matchesSearch = !search || item.question.toLowerCase().includes(search) || item.answer.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [allData, filter.category, debouncedSearch]);

  const setSearchQuery = useCallback((query: string) => setFilter((p) => ({ ...p, searchQuery: query })), []);
  const setCategory = useCallback((category: string) => setFilter((p) => ({ ...p, category })), []);
  const clearFilters = useCallback(() => setFilter({ searchQuery: '', category: 'all' }), []);

  const categories = useMemo(() => {
    const unique = [...new Set(allData.map((i) => i.category.toLowerCase()))];
    return [{ id: 'all', label: CATEGORY_LABELS.all, icon: CATEGORY_ICONS.all }, ...unique.map((c) => ({ id: c, label: CATEGORY_LABELS[c] || c, icon: CATEGORY_ICONS[c] || 'help-circle' }))];
  }, [allData]);

  const hasActiveFilters = filter.searchQuery !== '' || filter.category !== 'all';

  return {
    filteredData,
    allData,
    isLoading,
    isError,
    error,
    refetch,
    filter,
    setSearchQuery,
    setCategory,
    categories,
    resultCount: filteredData.length,
    hasActiveFilters,
    clearFilters,
  };
};
