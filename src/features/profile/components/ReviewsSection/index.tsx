/**
 * ReviewsSection Component
 * Displays a compact reviews overview on the Profile screen.
 * Shows average rating, review count, and a link to navigate
 * to the full MyReviewsScreen. Matches the BadgesSection style.
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { navigationProps } from "@src/navigations/type";
import { useMyReviews, useReviewStats } from "@src/features/customer/reviews/hooks/useReviews";

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={size}
          color={star <= rating ? "#d4a843" : "rgba(255,255,255,0.2)"}
        />
      ))}
    </View>
  );
};

export const ReviewsSection: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { data: stats, isLoading } = useReviewStats();
  const { data: reviews } = useMyReviews(1);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement des avis...</Text>
        </View>
      </View>
    );
  }

  const totalReviews = stats?.totalReviews ?? reviews?.total ?? 0;
  const averageRating = stats?.averageRating ?? 0;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 120 }}
      style={styles.card}
    >
      {/* Header row */}
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => navigation.navigate("MyReviews")}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="star" size={20} color="#d4a843" />
          <Text style={styles.headerTitle}>Mes Avis</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{totalReviews}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
        </View>
      </TouchableOpacity>

      {/* Content */}
      {totalReviews === 0 ? (
        <Text style={styles.emptyText}>Aucun avis pour le moment</Text>
      ) : (
        <View style={styles.ratingContainer}>
          <StarRating rating={Math.round(averageRating)} size={20} />
          <Text style={styles.ratingValue}>{averageRating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>
            {totalReviews} avis
          </Text>
        </View>
      )}

      {/* Footer link */}
      {totalReviews > 0 && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("MyReviews")}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>Voir tous mes avis</Text>
          <MaterialCommunityIcons name="arrow-right" size={14} color="#d4a843" />
        </TouchableOpacity>
      )}
    </MotiView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
  },
  loadingText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countBadge: {
    backgroundColor: "rgba(212,168,67,0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    color: "#d4a843",
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  // Stars
  starRow: {
    flexDirection: "row",
    gap: 2,
  },
  // Rating
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingValue: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  ratingCount: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  // Empty
  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: Fonts.regular,
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 4,
  },
  // Footer
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    color: "#d4a843",
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
});
