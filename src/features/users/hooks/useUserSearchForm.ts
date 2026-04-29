import { useState, useCallback } from "react";
import { useSearchUsers } from "./useSearchUsers";
import { User } from "../api/searchUsers";

interface UseUserSearchFormOptions {
  onSelectUser: (user: User) => void;
}

export const useUserSearchForm = ({ onSelectUser }: UseUserSearchFormOptions) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching } = useSearchUsers(
    { query: searchQuery, limit: 10 },
    { enabled: searchQuery.length >= 3, debounceMs: 500 }
  );
  const users = data?.data || [];
  const hasSearched = searchQuery.length >= 3 && !isLoading;

  const handleSelect = useCallback((user: User) => {
    console.log(`[UserSearch] Selected user: ${user._id} - ${user.firstName} ${user.lastName}`);
    onSelectUser(user);
    setSearchQuery("");
  }, [onSelectUser]);

  return {
    searchQuery,
    setSearchQuery,
    users,
    isLoading,
    isFetching,
    hasSearched,
    handleSelect,
  };
};
