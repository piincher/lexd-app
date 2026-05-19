import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClientManagement } from "../hooks/useClientManagement";
import { ClientHeader } from "../components/ClientHeader";
import { SearchBar } from "../components/SearchBar";
import { RecentSearchesBar } from "../components/RecentSearchesBar";
import { SortSelector } from "../components/SortSelector";
import { RoleFilterChips } from "../components/RoleFilterChips";
import { ClientList } from "../components/ClientList";
import { BulkActionBar } from "../components/BulkActionBar";
import { ClientFAB } from "../components/ClientFAB";
import { AlphabetIndex } from "../components/AlphabetIndex";
import { ClientPreviewModal } from "../components/ClientPreviewModal";
import { ROLE_LABELS } from "../constants/roleFilters";
import { createStyles } from "./ClientManagement.styles";

const SEARCH_PLACEHOLDER = "Rechercher par nom, téléphone ou email...";

export default function ClientManagement({ navigation }: RootStackScreenProps<"ClientManagement">) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const s = useClientManagement();
  const activeLetter = !s.searchQuery && s.clients.length > 20
    ? (s.clients[0]?.lastName?.[0] || s.clients[0]?.firstName?.[0] || null)?.toUpperCase() || null : null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ClientHeader totalClients={s.meta?.total ?? s.clients.length} activeCount={s.meta?.totalActive ?? 0}
        blockedCount={s.meta?.totalBlocked ?? 0} navigation={navigation} clients={s.clients}
        selectionMode={s.selectionMode} onToggleSelection={s.toggleSelectionMode} />
      <SearchBar value={s.searchQuery} onChangeText={s.setSearchQuery} placeholder={SEARCH_PLACEHOLDER}
        isDebouncing={s.isSearchDebouncing} onFocus={s.handleSearchFocus} onBlur={s.handleSearchBlur} onVoiceSearch={() => {}} />
      <RecentSearchesBar recents={s.recents} visible={s.showRecents} onSelect={s.setSearchQuery}
        onRemove={s.removeRecent} onClear={s.clearRecents} />
      <RoleFilterChips options={ROLE_LABELS} active={s.activeRole} onChange={s.handleRoleChange} />
      <SortSelector value={s.sortBy} onChange={s.setSortBy} />
      <View style={styles.flex}>
        <ClientList clients={s.clients} pendingId={s.pendingId} searchQuery={s.searchQuery} hasMore={s.hasNextPage}
          isFetching={s.isFetching} isRefetching={s.isRefetching} error={s.error} selectedIds={s.selectedIds}
          selectionMode={s.selectionMode} onToggleBlock={s.handleToggleBlock} onDelete={s.handleDelete}
          onNavigate={(id) => navigation.navigate("ClientDetails", { id })} onSelect={s.toggleSelect}
          onPreview={(c) => s.setPreviewClient(c)} onLoadMore={s.handleLoadMore} onRefresh={s.handleRefresh}
          onClearSearch={() => s.setSearchQuery("")} />
        {!s.selectionMode && !s.searchQuery && s.clients.length > 20 && (
          <AlphabetIndex activeLetter={activeLetter} onSelect={() => {}} />
        )}
      </View>
      {s.selectionMode && s.selectedIds.size > 0 && (
        <BulkActionBar selectedCount={s.selectedIds.size} onBlock={s.handleBulkBlock}
          onDelete={s.handleBulkDelete} onClear={s.clearSelection} />
      )}
      {!s.selectionMode && <ClientFAB onPress={() => navigation.navigate("UserAdd")} />}
      <ClientPreviewModal client={s.previewClient} visible={!!s.previewClient}
        onClose={() => s.setPreviewClient(null)} onNavigate={(id) => { s.setPreviewClient(null); navigation.navigate("ClientDetails", { id }); }} />
    </SafeAreaView>
  );
}
