import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import type { PromoRecord } from "../../api/promoAdminApi";
import { PromoCard } from "../PromoCard";
import { styles } from "./PromoList.styles";

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
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d4a843" />
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
          <MaterialCommunityIcons name="tag-off-outline" size={64} color={Theme.neutral[300]} />
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
              <Ionicons name="chevron-back" size={20} color={page <= 1 ? "#D1D5DB" : "#1F2937"} />
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
              <Ionicons name="chevron-forward" size={20} color={page >= totalPages ? "#D1D5DB" : "#1F2937"} />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
}
