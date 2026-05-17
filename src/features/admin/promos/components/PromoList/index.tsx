import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { PromoRecord } from "../../api/promoAdminApi";
import { PromoCard } from "../PromoCard";
import { getStyles } from "./PromoList.styles";

type PromoListProps = {
  promos: PromoRecord[];
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  activeFilter: string;
  page: number;
  totalPages: number;
  onEdit: (promo: PromoRecord) => void;
  onDeactivate: (promo: PromoRecord) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onResetFilter: () => void;
};

export function PromoList({
  promos,
  isLoading,
  isRefetching,
  refetch,
  activeFilter,
  page,
  totalPages,
  onEdit,
  onDeactivate,
  onNextPage,
  onPrevPage,
  onResetFilter,
}: PromoListProps) {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Chargement des promotions...</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={promos}
      renderItem={({ item }) => <PromoCard promo={item} onEdit={onEdit} onDeactivate={onDeactivate} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="tag-off-outline" size={64} color={colors.text.disabled} />
          <Text style={styles.emptyTitle}>Aucune promotion trouvée</Text>
          <Text style={styles.emptySubtitle}>
            {activeFilter !== "all"
              ? "Essayez de modifier vos filtres"
              : "Les promotions apparaîtront ici une fois créées"}
          </Text>
          {activeFilter !== "all" && (
            <TouchableOpacity style={styles.resetFilterButton} onPress={onResetFilter} activeOpacity={0.7}>
              <Text style={styles.resetFilterText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          )}
        </View>
      }
      ListFooterComponent={
        totalPages > 1 ? (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, page <= 1 && styles.paginationButtonDisabled]}
              onPress={onPrevPage}
              disabled={page <= 1}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color={page <= 1 ? colors.text.disabled : colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {page} / {totalPages}
            </Text>
            <TouchableOpacity
              style={[styles.paginationButton, page >= totalPages && styles.paginationButtonDisabled]}
              onPress={onNextPage}
              disabled={page >= totalPages}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={20} color={page >= totalPages ? colors.text.disabled : colors.text.primary} />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
}
