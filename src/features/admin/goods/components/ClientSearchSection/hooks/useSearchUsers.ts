import { useCallback, useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { userData } from '@src/shared/types/user';
import { searchReceiveGoodsClients } from '../../../api/clientSearchApi';
import { hasSearchIntent, matchesUserQuery } from '../lib/searchUsersUtils';

const SERVER_SEARCH_KEY = 'users-server-search';

export const useSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const normalizedQuery = debouncedQuery.trim();
  const canSearch = hasSearchIntent(normalizedQuery);

  const {
    data: serverSearchResults,
    isLoading: isLoadingServer,
    error: fetchServerError,
  } = useQuery({
    queryKey: [SERVER_SEARCH_KEY, normalizedQuery],
    queryFn: async () => {
      return searchReceiveGoodsClients({ query: normalizedQuery, limit: 50 });
    },
    enabled: canSearch,
    staleTime: DEFAULT_STALE_TIME,
    retry: (failureCount, error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 401) return false;
      return failureCount < 2;
    },
  });

  const predicate = useCallback(
    (user: userData) => matchesUserQuery(user, debouncedQuery),
    [debouncedQuery],
  );

  // Re-apply the predicate so a permissive backend can't surface unrelated users.
  const users = useMemo(() => {
    if (!canSearch) return [];
    if (!serverSearchResults || serverSearchResults.length === 0) return [];

    const resultList = Array.isArray(serverSearchResults) ? serverSearchResults : [];
    const filteredServer = resultList.filter(predicate);
    if (filteredServer.length === 0) return [];

    // Dedupe defensively in case both sources somehow overlap.
    const seen = new Set<string>();
    const merged: userData[] = [];
    for (const u of filteredServer) {
      if (u?._id && !seen.has(u._id)) {
        seen.add(u._id);
        merged.push(u);
      }
    }
    return merged;
  }, [canSearch, serverSearchResults, predicate]);

  const isLoading = canSearch && isLoadingServer;

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    users,
    isLoading,
    fetchError: fetchServerError,
  };
};
