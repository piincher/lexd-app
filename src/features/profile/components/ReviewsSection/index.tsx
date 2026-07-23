/**
 * ReviewsSection Component
 * Displays a compact reviews overview on the Profile screen.
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { useMyReviews, useReviewStats } from "@src/shared/hooks/useReviews";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StarRating } from "./StarRating";
import { ReviewsSectionSkeleton } from "./ReviewsSectionSkeleton";
import { getStyles } from "./ReviewsSection.styles";

export const ReviewsSection: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors);
  const { data: stats, isLoading: isStatsLoading, error: statsError, refetch: refetchStats } = useReviewStats();
  const { data: reviews, isLoading: isReviewsLoading, error: reviewsError, refetch: refetchReviews } = useMyReviews(1);
  const cardBg = colors.background.card;
  const emptyStarColor = colors.text.disabled;

  const isLoading = isStatsLoading || isReviewsLoading;
  const error = statsError || reviewsError;

  const handleRetry = () => {
    refetchStats();
    refetchReviews();
  };

  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <ReviewsSectionSkeleton />
      </View>
    );
  }

  if (error) {
    return (
      <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Ionicons name="star" size={20} color={colors.accent.gold} />
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mes Avis</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.warning} />
          <Text style={[styles.emptyTitle, { color: colors.text.secondary }]}>Impossible de charger les avis</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={[styles.retryText, { color: colors.accent.goldDark }]}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  }

  const totalReviews = stats?.totalReviews ?? reviews?.total ?? 0;
  const averageRating = stats?.averageRating ?? reviews?.averageRating ?? 0;
  const hasReviews = totalReviews > 0 && averageRating > 0;

  return (
    <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "spring", damping: 15, stiffness: 120 }} style={[styles.card, { backgroundColor: cardBg }]}>
      <TouchableOpacity style={styles.headerRow} onPress={() => navigation.navigate("MyReviews")} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <Ionicons name="star" size={20} color={colors.accent.gold} />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mes Avis</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{totalReviews}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.secondary} />
        </View>
      </TouchableOpacity>

      {!hasReviews ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="star-outline" size={40} color={colors.text.disabled} />
          <Text style={[styles.emptyTitle, { color: colors.text.secondary }]}>Aucun avis pour le moment</Text>
          <Text style={[styles.emptySubtitle, { color: colors.text.disabled }]}>
            Les avis que vous soumettrez apparaîtront ici
          </Text>
        </View>
      ) : (
        <View style={styles.ratingContainer}>
          <StarRating rating={Math.round(averageRating)} size={20} emptyStarColor={emptyStarColor} />
          <Text style={[styles.ratingValue, { color: colors.text.primary }]}>{averageRating.toFixed(1)}</Text>
          <Text style={[styles.ratingCount, { color: colors.text.secondary }]}>{totalReviews} avis</Text>
        </View>
      )}

      {hasReviews && (
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate("MyReviews")} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>Voir tous mes avis</Text>
          <MaterialCommunityIcons name="arrow-right" size={14} color={colors.accent.gold} />
        </TouchableOpacity>
      )}
    </MotiView>
  );
};
