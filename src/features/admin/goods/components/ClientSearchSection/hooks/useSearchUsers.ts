import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@src/features/admin/users/api/userApi';
import { userData } from '@src/shared/types/user';

const ALL_USERS_KEY = 'all-users-client-search';
const USERS_PER_PAGE = 200;

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
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: [ALL_USERS_KEY],
    queryFn: async () => {
      const allUsers: userData[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetchAllUsers({ limit: USERS_PER_PAGE, page });
        allUsers.push(...response.data);
        hasMore = page < response.meta.totalPages;
        page++;

        // Safety break to prevent infinite loops
        if (page > 100) break;
      }

      return allUsers;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry auth errors — let the interceptor handle refresh/logout once
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });

  // Filter client-side so no extra API calls per keystroke
  const filteredUsers = useMemo(() => {
    if (!allUsers || !Array.isArray(allUsers) || debouncedQuery.trim().length < 2) {
      return [];
    }
    const query = debouncedQuery.toLowerCase();
    const queryDigits = query.replace(/\D/g, '');

    return allUsers.filter((user: userData) => {
      const nameMatch =
        user.firstName?.toLowerCase().includes(query) ||
        user.lastName?.toLowerCase().includes(query);
      const phoneDigits = user.phoneNumber?.replace(/\D/g, '') || '';
      const phoneMatch = phoneDigits.includes(queryDigits);
      return nameMatch || phoneMatch;
    });
  }, [allUsers, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    users: filteredUsers,
    isLoading,
    fetchError,
  };
};
