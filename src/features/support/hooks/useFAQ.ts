/**
 * useFAQ Hook - Data fetching and filtering for FAQ feature
 * Following SRP: Single purpose - fetch and filter FAQ data (< 100 lines)
 */

import { useFAQQuery } from './useFAQQuery';
import { useFAQFilter } from './useFAQFilter';

export interface UseFAQReturn {
  filteredData: import('../types').FAQItem[];
  allData: import('../types').FAQItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  filter: import('../types').FAQFilter;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  categories: { id: string; label: string; icon: string }[];
  resultCount: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export const useFAQ = (): UseFAQReturn => {
  const { data: allData, isLoading, isError, error, refetch } = useFAQQuery();
  const {
    filter, filteredData, setSearchQuery, setCategory, clearFilters,
    categories, hasActiveFilters, resultCount,
  } = useFAQFilter(allData);

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
    resultCount,
    hasActiveFilters,
    clearFilters,
  };
};
