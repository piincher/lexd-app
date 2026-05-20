import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFAQs, getFAQSearchSuggestions } from '../api/faqApi';
import { MOCK_FAQS } from '../api/faqMockData';
import type { FAQItem } from '../types';

const FAQ_QUERY_KEY = 'faqs';
const SUGGESTIONS_KEY = 'faq-suggestions';

function filterMockFAQs(query: string, category: string): FAQItem[] {
  let result = MOCK_FAQS.map((f) => ({ ...f, _id: f.id }));
  if (category !== 'all') {
    result = result.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
  const q = query.trim().toLowerCase();
  if (q) {
    result = result.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }
  return result;
}

export function useFAQSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [FAQ_QUERY_KEY, { category: activeCategory, search: debouncedQuery }],
    queryFn: () => getFAQs({
      category: activeCategory === 'all' ? undefined : activeCategory,
      search: debouncedQuery || undefined,
      page: 1,
      limit: 50,
    }),
    staleTime: 5 * 60 * 1000,
  });

  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: [SUGGESTIONS_KEY, debouncedQuery],
    queryFn: () => getFAQSearchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 60 * 1000,
  });

  const apiItems = useMemo(() => data?.items ?? [], [data]);
  const usingFallback = apiItems.length === 0 && !isLoading && !debouncedQuery;
  const faqs = useMemo(() => {
    if (usingFallback) return filterMockFAQs(debouncedQuery, activeCategory);
    return apiItems;
  }, [apiItems, usingFallback, debouncedQuery, activeCategory]);
  const totalCount = usingFallback ? faqs.length : (data?.pagination?.total ?? 0);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    activeCategory,
    setActiveCategory,
    faqs,
    totalCount,
    isLoading,
    isError,
    refetch,
    suggestions: suggestions ?? [],
    suggestionsLoading,
    clearSearch,
    usingFallback,
  };
}
