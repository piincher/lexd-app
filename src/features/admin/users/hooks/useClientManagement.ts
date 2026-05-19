import { useState, useMemo, useCallback } from "react";
import { useGetUsers, useBlockandUnblockUser, useDeleteUser } from "./useUserManagement";
import { useDebouncedValue } from "./useDebouncedValue";
import { useSortedClients } from "./useSortedClients";
import { useRecentSearches } from "./useRecentSearches";
import { useBulkSelection } from "./useBulkSelection";
import { RoleFilter } from "../constants/roleFilters";
import { userData } from "@src/shared/types/user";

export type SortOption = "name_asc" | "name_desc" | "newest" | "oldest" | "status";

export const useClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState<RoleFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [showRecents, setShowRecents] = useState(false);
  const [previewClient, setPreviewClient] = useState<userData | null>(null);

  const { debouncedValue: debouncedSearch, isPending: isSearchDebouncing } =
    useDebouncedValue(searchQuery.trim(), 400);
  const { recents, addRecent, removeRecent, clearRecents } = useRecentSearches();
  const { selectionMode, selectedIds, toggleSelectionMode, toggleSelect, clearSelection, selectAll } = useBulkSelection();

  const filters = useMemo(() => ({
    role: activeRole === "all" ? undefined : activeRole,
    search: debouncedSearch || undefined, limit: 50,
  }), [activeRole, debouncedSearch]);

  const { data, isFetching, hasNextPage, fetchNextPage, refetch, isRefetching, error } =
    useGetUsers(filters);

  const { mutate: blockMutate } = useBlockandUnblockUser();
  const { mutate: deleteMutate } = useDeleteUser();

  const rawClients = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);
  const clients = useSortedClients(rawClients, sortBy);
  const meta = data?.pages[data.pages.length - 1]?.meta;

  const handleToggleBlock = useCallback((id: string) => {
    setPendingId(id);
    blockMutate(id, { onSettled: () => setPendingId(null) });
  }, [blockMutate]);

  const handleDelete = useCallback((id: string) => {
    setPendingId(id);
    deleteMutate(id, { onSettled: () => setPendingId(null) });
  }, [deleteMutate]);

  const handleRoleChange = useCallback((role: RoleFilter) => {
    setActiveRole(role); setSearchQuery("");
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
    setShowRecents(text.length === 0 && recents.length > 0);
    if (text.trim()) setTimeout(() => addRecent(text.trim()), 500);
  }, [recents.length, addRecent]);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.length === 0 && recents.length > 0) setShowRecents(true);
  }, [searchQuery, recents.length]);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => setShowRecents(false), 200);
  }, []);

  const handleBulkBlock = useCallback(() => {
    selectedIds.forEach((id) => blockMutate(id));
    clearSelection();
  }, [selectedIds, blockMutate, clearSelection]);

  const handleBulkDelete = useCallback(() => {
    selectedIds.forEach((id) => deleteMutate(id));
    clearSelection();
  }, [selectedIds, deleteMutate, clearSelection]);

  const handleSelectAll = useCallback(() => {
    selectAll(clients.map((c) => c._id));
  }, [clients, selectAll]);

  return {
    clients, meta, searchQuery, setSearchQuery: handleSearchChange,
    isSearchDebouncing, showRecents, recents, handleSearchFocus, handleSearchBlur,
    removeRecent, clearRecents, activeRole, handleRoleChange, sortBy, setSortBy,
    pendingId, isFetching, isRefetching, hasNextPage: !!hasNextPage, error,
    selectionMode, selectedIds, toggleSelectionMode, toggleSelect,
    handleBulkBlock, handleBulkDelete, clearSelection, handleSelectAll,
    previewClient, setPreviewClient,
    handleToggleBlock, handleDelete, handleLoadMore, handleRefresh,
  };
};
