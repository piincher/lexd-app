import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ReviewCard } from "../ReviewCard";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ReviewList.styles";
import type { AdminReview } from "../../api/reviewAdminApi";

interface ReviewListProps {
  reviews: AdminReview[];
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  activeFilter: string;
  onFilterChange: (key: string) => void;
  page: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onRespond: (reviewId: string, response: string) => void;
  isResponding: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  isLoading,
  isRefetching,
  refetch,
  activeFilter,
  onFilterChange,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  onRespond,
  isResponding,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const renderReview = ({ item }: { item: AdminReview }) => (
    <ReviewCard
      review={item}
      onRespond={onRespond}
      isResponding={isResponding}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Chargement des avis...</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialIcons name="rate-review" size={64} color={colors.neutral[300]} />
          <Text style={styles.emptyTitle}>Aucun avis trouvé</Text>
          <Text style={styles.emptySubtitle}>
            {activeFilter !== "all"
              ? "Essayez de modifier vos filtres"
              : "Les avis clients apparaîtront ici"}
          </Text>
          {activeFilter !== "all" && (
            <TouchableOpacity
              style={styles.resetFilterButton}
              onPress={() => onFilterChange("all")}
              activeOpacity={0.7}
            >
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
              <Ionicons
                name="chevron-back"
                size={20}
                color={page <= 1 ? colors.neutral[300] : colors.text.primary}
              />
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {page} / {totalPages}
            </Text>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                page >= totalPages && styles.paginationButtonDisabled,
              ]}
              onPress={onNextPage}
              disabled={page >= totalPages}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={page >= totalPages ? colors.neutral[300] : colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};
