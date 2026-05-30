import { useCallback, useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@src/features/admin/users/api/userApi';
import { userData } from '@src/shared/types/user';

const SERVER_SEARCH_KEY = 'users-server-search';
const MIN_QUERY_LENGTH = 2;
const MIN_PHONE_QUERY_DIGITS = 2;

/**
 * One source of truth for "does this user match this query?". We apply it on BOTH the
 * local user cache AND the server-search fallback so a permissive backend `search` param
 * (which historically returned the full user list when the query didn't match anything)
 * can't pollute the dropdown. Single pass per user, O(n) per filter.
 */
const matchesQuery = (user: userData, rawQuery: string): boolean => {
  const query = rawQuery.toLowerCase().trim();
  if (query.length < MIN_QUERY_LENGTH) return false;

  const first = user.firstName?.toLowerCase() || '';
  const last = user.lastName?.toLowerCase() || '';
  const fullName = `${first} ${last}`.trim();
  const nameMatch =
    (!!first && first.includes(query)) ||
    (!!last && last.includes(query)) ||
    (!!fullName && fullName.includes(query));

  // Phone branch: only fires when the query actually carries digits — fixes the original
  // bug where a pure-name query reduced to '' digits and matched every phone via
  // `''.includes('') === true`, and the symmetric one where a non-matching phone query
  // fell through to the permissive server fallback.
  const queryDigits = query.replace(/\D/g, '');
  const phoneDigits = user.phoneNumber?.replace(/\D/g, '') || '';
  const phoneMatch =
    queryDigits.length >= MIN_PHONE_QUERY_DIGITS &&
    phoneDigits.length > 0 &&
    phoneDigits.includes(queryDigits);

  return nameMatch || phoneMatch;
};

const hasSearchIntent = (rawQuery: string): boolean => {
  const query = rawQuery.trim();
  const digitCount = query.replace(/\D/g, '').length;
  return query.length >= MIN_QUERY_LENGTH || digitCount >= MIN_PHONE_QUERY_DIGITS;
};

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
      const response = await fetchAllUsers({ search: normalizedQuery, limit: 50 });
      return response.data;
    },
    enabled: canSearch,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });

  const predicate = useCallback(
    (user: userData) => matchesQuery(user, debouncedQuery),
    [debouncedQuery],
  );

  // Re-apply the predicate so a permissive backend can't surface unrelated users.
  const users = useMemo(() => {
    if (!canSearch) return [];
    if (!serverSearchResults || serverSearchResults.length === 0) return [];

    const filteredServer = serverSearchResults.filter(predicate);
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
