import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useMyReviews, useReviewStats } from "../hooks/useReviews";
import type { Review } from "../api";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={size}
          color={star <= rating ? "#d4a843" : "#D1D5DB"}
        />
      ))}
    </View>
  );
};

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const goods = typeof review.goodsId === "object" ? review.goodsId : null;
  const isMaritime = goods?.shippingMode === "sea";

  return (
    <View style={styles.card}>
      {/* Header: Goods ID + shipping mode badge */}
      <View style={styles.cardHeader}>
        <Text style={styles.goodsId}>
          {goods ? goods.goodsId : "—"}
        </Text>
        {goods && (
          <View style={[styles.badge, isMaritime ? styles.badgeMaritime : styles.badgeAerien]}>
            <Text style={[styles.badgeText, isMaritime ? styles.badgeMaritimeText : styles.badgeAerienText]}>
              {isMaritime ? "Maritime" : "Aérien"}
            </Text>
          </View>
        )}
      </View>

      {/* Star rating */}
      <StarRating rating={review.rating} />

      {/* Comment */}
      {review.comment ? (
        <Text style={styles.commentText}>{review.comment}</Text>
      ) : null}

      {/* Date */}
      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={14} color="#6B7280" />
        <Text style={styles.dateText}>{formatDate(review.createdAt)}</Text>
      </View>

      {/* Admin response */}
      {review.adminResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Réponse de l'équipe ChinaLink :</Text>
          <Text style={styles.responseText}>{review.adminResponse}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default function MyReviewsScreen({
  navigation,
}: RootStackScreenProps<"MyReviews">) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isRefetching, refetch } = useMyReviews(page);
  const { data: stats } = useReviewStats();

  const reviews = data?.reviews ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalReviews = data?.total ?? 0;

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const renderReview = useCallback(
    ({ item }: { item: Review }) => <ReviewCard review={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Mes Avis</Text>
            <Text style={styles.headerSubtitle}>
              {totalReviews} avis au total
            </Text>
          </View>
        </View>
      </View>

      {/* Loading state */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement de vos avis...</Text>
        </View>
      ) : (
        <FlashList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item._id}

          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListHeaderComponent={
            stats ? (
              <View style={styles.summaryCard}>
                <StarRating rating={Math.round(stats.averageRating)} size={24} />
                <Text style={styles.summaryAverage}>
                  {stats.averageRating.toFixed(1)} / 5
                </Text>
                <Text style={styles.summaryCount}>
                  {stats.totalReviews} avis
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="rate-review" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Aucun avis</Text>
              <Text style={styles.emptySubtitle}>
                Vous n'avez pas encore laissé d'avis
              </Text>
            </View>
          }
          ListFooterComponent={
            totalPages > 1 ? (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  style={[styles.paginationButton, page <= 1 && styles.paginationButtonDisabled]}
                  onPress={handlePrevPage}
                  disabled={page <= 1}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={page <= 1 ? "#D1D5DB" : "#1F2937"}
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
                  onPress={handleNextPage}
                  disabled={page >= totalPages}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={page >= totalPages ? "#D1D5DB" : "#1F2937"}
                  />
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* Header */
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 12 : 20,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
  },

  /* Loading */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "#6B7280",
  },

  /* List */
  listContainer: {
    padding: 16,
  },

  /* Summary card */
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryAverage: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    marginTop: 8,
  },
  summaryCount: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#6B7280",
    marginTop: 2,
  },

  /* Stars */
  starRow: {
    flexDirection: "row",
    gap: 2,
  },

  /* Card */
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  goodsId: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    flexShrink: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "uppercase",
  },
  badgeMaritime: {
    backgroundColor: "#DBEAFE",
  },
  badgeMaritimeText: {
    color: "#1D4ED8",
  },
  badgeAerien: {
    backgroundColor: "#FEF3C7",
  },
  badgeAerienText: {
    color: "#92400E",
  },

  /* Comment */
  commentText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#4B5563",
    marginTop: 8,
    lineHeight: 20,
  },

  /* Date */
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#6B7280",
  },

  /* Admin response */
  responseContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: "#6B7280",
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#374151",
    lineHeight: 20,
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: "#374151",
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },

  /* Pagination */
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  paginationText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },
});
