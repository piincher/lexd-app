import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFAQSearch } from './useFAQSearch';
import { useFAQBookmarks } from './useFAQBookmarks';
import { useSearchHistory } from './useSearchHistory';
import { useFAQFeedback } from './useFAQFeedback';
import { useMyTicketsPreview } from './useMyTicketsPreview';
import { useCreateTicketInline } from './useCreateTicketInline';
import { useFAQFallbackData } from './useFAQFallbackData';
import { getPopularFAQs, getFAQCategories, incrementFAQViews } from '../api/faqApi';

const POPULAR_KEY = 'faqs-popular';
const CATEGORIES_KEY = 'faqs-categories';

export function useHelpCenter() {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const search = useFAQSearch();
  const bookmarks = useFAQBookmarks();
  const searchHistory = useSearchHistory();
  const feedback = useFAQFeedback();
  const ticketsPreview = useMyTicketsPreview(3);
  const createTicket = useCreateTicketInline();

  const { data: popularApiData, isLoading: popularLoading } = useQuery({
    queryKey: [POPULAR_KEY],
    queryFn: () => getPopularFAQs(5),
    staleTime: 10 * 60 * 1000,
  });

  const { data: categoryApiData, isLoading: categoriesLoading } = useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => getFAQCategories(),
    staleTime: 10 * 60 * 1000,
  });

  const { popularFAQs, categoryCounts } = useFAQFallbackData(
    popularApiData,
    categoryApiData,
    search.usingFallback
  );

  const handleToggleFaq = useCallback((faqId: string) => {
    setExpandedFaqId((current) => {
      const next = current === faqId ? null : faqId;
      if (next && next !== current) incrementFAQViews(faqId).catch(() => {});
      return next;
    });
  }, []);

  const handleSearch = useCallback((query: string) => {
    search.setSearchQuery(query);
    if (query.trim()) searchHistory.addSearch(query);
  }, [search, searchHistory]);

  const handleSelectSuggestion = useCallback((query: string) => {
    search.setSearchQuery(query);
    searchHistory.addSearch(query);
  }, [search, searchHistory]);

  const handleSelectHistoryItem = useCallback((query: string) => {
    search.setSearchQuery(query);
  }, [search]);

  return {
    ...search,
    searchHistory: searchHistory.history,
    clearSearchHistory: searchHistory.clearHistory,
    handleSearch,
    handleSelectSuggestion,
    handleSelectHistoryItem,
    popularFAQs,
    popularLoading,
    categoryCounts,
    categoriesLoading,
    expandedFaqId,
    handleToggleFaq,
    bookmarks: bookmarks.bookmarks,
    isBookmarked: bookmarks.isBookmarked,
    toggleBookmark: bookmarks.toggleBookmark,
    submitFeedback: feedback.submitFeedback,
    feedbackPending: feedback.isPending,
    tickets: ticketsPreview.tickets,
    ticketsLoading: ticketsPreview.isLoading,
    showCreateTicket,
    setShowCreateTicket,
    createTicket: createTicket.createTicket,
    createTicketPending: createTicket.isPending,
    createTicketSuccess: createTicket.isSuccess,
    resetCreateTicket: createTicket.reset,
  };
}
