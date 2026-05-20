import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useAnnouncementListScreen } from "./hooks";
import { AnnouncementSummaryStats } from "../components/AnnouncementSummaryStats";
import { AnnouncementCard } from "../components/AnnouncementCard";
import { AnnouncementFilters } from "../components/AnnouncementFilters";
import { AnnouncementStatsModal } from "../components/AnnouncementStatsModal";
import { createStyles } from "./AnnouncementListScreen.styles";

const AnnouncementListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    stats,
    statsLoading,
    announcements,
    isLoading,
    page,
    totalPages,
    search,
    statusFilter,
    typeFilter,
    placementFilter,
    statsAnnouncementId,
    setStatsAnnouncementId,
    handlers,
  } = useAnnouncementListScreen();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlers.handleBack} style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Annonces</Text>
          <Text style={styles.headerSubtitle}>Gestion des communications</Text>
        </View>
        <TouchableOpacity onPress={handlers.handleCreate} style={styles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <AnnouncementSummaryStats stats={stats} isLoading={statsLoading} />

        {/* Filters */}
        <AnnouncementFilters
          search={search}
          onSearchChange={handlers.handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handlers.handleStatusFilterChange}
          typeFilter={typeFilter}
          onTypeFilterChange={handlers.handleTypeFilterChange}
          placementFilter={placementFilter}
          onPlacementFilterChange={handlers.handlePlacementFilterChange}
        />

        {/* List */}
        {isLoading ? (
          <View style={styles.loader}>
            <MaterialCommunityIcons name="loading" size={32} color={colors.primary.main} />
            <Text style={styles.loaderText}>Chargement des annonces...</Text>
          </View>
        ) : (
          <FlashList
            data={announcements}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            onRefresh={handlers.refetch}
            refreshing={isLoading}
            ListEmptyComponent={
              <View style={styles.empty}>
                <MaterialCommunityIcons name="bullhorn-off-outline" size={48} color={colors.text.disabled} />
                <Text style={styles.emptyText}>Aucune annonce trouvée</Text>
              </View>
            }
            renderItem={({ item }) => (
              <AnnouncementCard
                item={item}
                onEdit={handlers.handleEdit}
                onArchive={handlers.handleArchive}
                onStats={(id) => setStatsAnnouncementId(id)}
                isArchiving={false}
              />
            )}
            ListFooterComponent={
              totalPages > 1 ? (
                <View style={styles.pagination}>
                  <TouchableOpacity
                    style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]}
                    onPress={handlers.handlePrevPage}
                    disabled={page <= 1}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="chevron-back" size={18} color={page <= 1 ? colors.text.disabled : colors.text.primary} />
                  </TouchableOpacity>
                  <Text style={styles.pageText}>Page {page} / {totalPages}</Text>
                  <TouchableOpacity
                    style={[styles.pageButton, page >= totalPages && styles.pageButtonDisabled]}
                    onPress={handlers.handleNextPage}
                    disabled={page >= totalPages}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="chevron-forward" size={18} color={page >= totalPages ? colors.text.disabled : colors.text.primary} />
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Stats Modal */}
      <AnnouncementStatsModal
        visible={!!statsAnnouncementId}
        announcementId={statsAnnouncementId}
        onClose={() => setStatsAnnouncementId(null)}
      />
    </SafeAreaView>
  );
};

export default AnnouncementListScreen;
