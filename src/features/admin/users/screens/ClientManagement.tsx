import React, { useState, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useBlockandUnblockUser, useDeleteUser, useGetUsers } from "../hooks/useUserManagement";
import { ClientHeader } from "../components/ClientHeader";
import { SearchBar } from "../components/SearchBar";
import { ResultsBar } from "../components/ResultsBar";
import { RoleFilterChips } from "../components/RoleFilterChips";
import { ClientList } from "../components/ClientList";
import { ROLE_LABELS, RoleFilter } from "../constants/roleFilters";
import { styles } from "./ClientManagement.styles";

const SEARCH_PLACEHOLDER = "Rechercher par nom, téléphone ou email...";

export default function ClientManagement({ navigation }: RootStackScreenProps<"ClientManagement">) {
  const { isDark } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState<RoleFilter>("user");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filters = useMemo(() => ({
    role: activeRole === "all" ? undefined : activeRole,
    search: searchQuery.trim() || undefined,
    limit: 50,
  }), [activeRole, searchQuery]);

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetUsers(filters);
  const { mutate: blockMutate } = useBlockandUnblockUser();
  const { mutate: deleteMutate } = useDeleteUser();

  const clients = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);
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
    setActiveRole(role);
    setSearchQuery("");
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const handleClear = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <ClientHeader
        totalClients={meta?.total ?? clients.length}
        activeCount={meta?.totalActive ?? 0}
        blockedCount={meta?.totalBlocked ?? 0}
        navigation={navigation}
      />

      <SearchBar value={searchQuery} onChangeText={handleSearch} placeholder={SEARCH_PLACEHOLDER} />
      <RoleFilterChips options={ROLE_LABELS} active={activeRole} onChange={handleRoleChange} />
      {searchQuery && <ResultsBar count={clients.length} />}

      <ClientList
        clients={clients}
        pendingId={pendingId}
        searchQuery={searchQuery}
        hasMore={!!hasNextPage}
        isFetching={isFetching}
        onToggleBlock={handleToggleBlock}
        onDelete={handleDelete}
        onLoadMore={handleLoadMore}
        onClearSearch={handleClear}
      />
    </SafeAreaView>
  );
}
