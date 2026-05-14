import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@src/features/admin/users/api/userApi';
import { userData } from '@src/shared/types/user';

const ALL_USERS_KEY = 'all-users-client-search';

export const useSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load users once upfront (backend max limit is 200)
  const {
    data: allUsers,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: [ALL_USERS_KEY],
    queryFn: async () => {
      const response = await fetchAllUsers({ limit: 200 });
      return response.data;
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
