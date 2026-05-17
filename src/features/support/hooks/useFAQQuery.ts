/**
 * useFAQQuery Hook - Data fetching for FAQ feature
 */

import { useQuery } from '@tanstack/react-query';
import { FAQItem } from '../types';
import { fetchMockFAQs } from '../api/faqMockData';

const FAQ_QUERY_KEY = 'faqs';

export const useFAQQuery = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<FAQItem[], Error>({
    queryKey: [FAQ_QUERY_KEY],
    queryFn: fetchMockFAQs,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return { data: data || [], isLoading, isError, error, refetch };
};
