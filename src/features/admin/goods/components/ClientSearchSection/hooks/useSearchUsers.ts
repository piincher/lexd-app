import { useCallback, useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@src/features/admin/users/api/userApi';
import { userData } from '@src/shared/types/user';

const ALL_USERS_KEY = 'all-users-client-search-v2';
const SERVER_SEARCH_KEY = 'users-server-search';
const USERS_PER_PAGE = 200;
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

export const useSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch ALL users by paginating through all pages.
  // The backend caps each page at 200, so we loop until all pages are loaded.
  const {
    data: allUsers,
    isLoading: isLoadingAll,
    error: fetchAllError,
  } = useQuery({
    queryKey: [ALL_USERS_KEY],
    queryFn: async () => {
      const all: userData[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetchAllUsers({ limit: USERS_PER_PAGE, page });
        all.push(...response.data);
        hasMore = page < response.meta.totalPages;
        page++;

        // Safety break to prevent infinite loops
        if (page > 100) break;
      }

      return all;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: 'always',  // Always refetch to ensure we have all users (critical for search)
    retry: (failureCount, error: any) => {
      // Don't retry auth errors — let the interceptor handle refresh/logout once
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });

  // Fallback server-side search for cache-miss / freshly-created users not yet in the
  // local cache. We do NOT trust its filtering — see `matchesQuery` applied below.
  const {
    data: serverSearchResults,
    isLoading: isLoadingServer,
    error: fetchServerError,
  } = useQuery({
    queryKey: [SERVER_SEARCH_KEY, debouncedQuery],
    queryFn: async () => {
      const response = await fetchAllUsers({ search: debouncedQuery, limit: 50 });
      return response.data;
    },
    enabled: debouncedQuery.trim().length >= MIN_QUERY_LENGTH,
    staleTime: 30 * 1000, // 30 seconds
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });

  const predicate = useCallback(
    (user: userData) => matchesQuery(user, debouncedQuery),
    [debouncedQuery],
  );

  // Client-side filter — no API calls per keystroke. Returns [] for sub-threshold queries
  // and for queries that don't match any cached user.
  const localFilteredUsers = useMemo(() => {
    if (!allUsers || !Array.isArray(allUsers)) return [];
    if (debouncedQuery.trim().length < MIN_QUERY_LENGTH) return [];
    return allUsers.filter(predicate);
  }, [allUsers, debouncedQuery, predicate]);

  // Merge local + server. We re-apply the predicate to server results so a permissive
  // backend can't surface unrelated users, and we dedupe by _id so the same record from
  // both sources only shows once.
  const users = useMemo(() => {
    if (localFilteredUsers.length > 0) return localFilteredUsers;
    if (debouncedQuery.trim().length < MIN_QUERY_LENGTH) return [];
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
  }, [localFilteredUsers, serverSearchResults, debouncedQuery, predicate]);

  const isLoading = isLoadingAll || isLoadingServer;
  const fetchError = fetchAllError || fetchServerError;

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    users,
    isLoading,
    fetchError,
  };
};
