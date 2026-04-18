import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import {
  useAdminReviews,
  useAdminReviewStats,
  useAdminRespondToReview,
} from "../hooks/useReviewAdmin";
import type { AdminReview } from "../api/reviewAdminApi";

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

type FilterChip = {
  label: string;
  key: string;
  filterType: "all" | "rating" | "response";
  value?: number | boolean;
};

const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all", filterType: "all" },
  { label: "5\u2605", key: "5star", filterType: "rating", value: 5 },
  { label: "4\u2605", key: "4star", filterType: "rating", value: 4 },
  { label: "3\u2605", key: "3star", filterType: "rating", value: 3 },
  { label: "2\u2605", key: "2star", filterType: "rating", value: 2 },
  { label: "1\u2605", key: "1star", filterType: "rating", value: 1 },
  { label: "Sans réponse", key: "no_response", filterType: "response", value: false as any },
  { label: "Avec réponse", key: "has_response", filterType: "response", value: true as any },
];

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

const DistributionBar: React.FC<{
  star: number;
  count: number;
  total: number;
}> = ({ star, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <View style={styles.distributionRow}>
      <Text style={styles.distributionStar}>{star}</Text>
      <Ionicons name="star" size={12} color="#d4a843" />
      <View style={styles.distributionTrack}>
        <View style={[styles.distributionFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.distributionCount}>{count}</Text>
    </View>
  );
};

type ReviewCardProps = {
  review: AdminReview;
  onRespond: (reviewId: string, response: string) => void;
  isResponding: boolean;
};

const ReviewCard = ({ review, onRespond, isResponding }: ReviewCardProps) => {
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseText, setResponseText] = useState("");

  const user = typeof review.userId === "object" ? review.userId : null;
  const goods = typeof review.goodsId === "object" ? review.goodsId : null;
  const isMaritime = goods?.shippingMode === "sea";

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      Alert.alert("Erreur", "Veuillez saisir une réponse.");
      return;
    }
    onRespond(review._id, responseText.trim());
    setShowResponseInput(false);
    setResponseText("");
  };

  return (
    <View style={styles.card}>
      {/* Client info */}
      {user && (
        <View style={styles.clientRow}>
          <Ionicons name="person-outline" size={16} color="#6B7280" />
          <Text style={styles.clientName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.clientPhone}>{user.phoneNumber}</Text>
        </View>
      )}

      {/* Goods ID + shipping mode */}
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

      {/* Admin response (existing) */}
      {review.adminResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Réponse de l'équipe :</Text>
          <Text style={styles.responseText}>{review.adminResponse}</Text>
          {review.respondedAt && (
            <Text style={styles.responseDate}>
              {formatDate(review.respondedAt)}
            </Text>
          )}
        </View>
      ) : (
        <>
          {/* Respond button */}
          {!showResponseInput ? (
            <TouchableOpacity
              style={styles.respondButton}
              onPress={() => setShowResponseInput(true)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="reply" size={18} color="#d4a843" />
              <Text style={styles.respondButtonText}>Répondre</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.responseInputContainer}>
              <TextInput
                style={styles.responseInput}
                placeholder="Votre réponse..."
                placeholderTextColor="#9CA3AF"
                value={responseText}
                onChangeText={setResponseText}
                multiline
                numberOfLines={3}
                maxLength={500}
              />
              <View style={styles.responseActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowResponseInput(false);
                    setResponseText("");
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, isResponding && styles.submitButtonDisabled]}
                  onPress={handleSubmitResponse}
                  disabled={isResponding}
                  activeOpacity={0.7}
                >
                  {isResponding ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Envoyer</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default function AdminReviewsScreen({
  navigation,
}: RootStackScreenProps<"AdminReviews">) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;

  const filters = (() => {
    if (selectedChip.filterType === "rating") {
      return { rating: selectedChip.value as number };
    }
    if (selectedChip.filterType === "response") {
      return { hasResponse: selectedChip.value as boolean };
    }
    return undefined;
  })();

  const { data, isLoading, isRefetching, refetch } = useAdminReviews(filters, page);
  const { data: stats } = useAdminReviewStats();
  const respondMutation = useAdminRespondToReview();

  const reviews = data?.reviews ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalReviews = data?.total ?? 0;

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

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

  const handleRespond = useCallback(
    (reviewId: string, response: string) => {
      respondMutation.mutate(
        { reviewId, response },
        {
          onSuccess: () => {
            Alert.alert("Succès", "Votre réponse a été enregistrée.");
          },
          onError: (error) => {
            Alert.alert("Erreur", error.message || "Impossible d'envoyer la réponse.");
          },
        }
      );
    },
    [respondMutation]
  );

  const renderReview = useCallback(
    ({ item }: { item: AdminReview }) => (
      <ReviewCard
        review={item}
        onRespond={handleRespond}
        isResponding={respondMutation.isPending}
      />
    ),
    [handleRespond, respondMutation.isPending]
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
            <Text style={styles.headerTitle}>Avis Clients</Text>
            <Text style={styles.headerSubtitle}>
              {totalReviews} avis au total
            </Text>
          </View>
        </View>
      </View>

      {/* Stats card */}
      {stats && (
        <View style={styles.statsCard}>
          <View style={styles.statsTop}>
            <View style={styles.statsLeft}>
              <Text style={styles.statsAverage}>{stats.averageRating.toFixed(1)}</Text>
              <StarRating rating={Math.round(stats.averageRating)} size={18} />
              <Text style={styles.statsTotal}>{stats.totalReviews} avis</Text>
            </View>
            <View style={styles.statsRight}>
              {[5, 4, 3, 2, 1].map((star) => (
                <DistributionBar
                  key={star}
                  star={star}
                  count={stats.distribution[star] || 0}
                  total={stats.totalReviews}
                />
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Filter chips */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.key;
            return (
              <TouchableOpacity
                key={chip.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => handleFilterChange(chip.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Loading state */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement des avis...</Text>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="rate-review" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Aucun avis trouvé</Text>
              <Text style={styles.emptySubtitle}>
                {activeFilter !== "all"
                  ? "Essayez de modifier vos filtres"
                  : "Les avis clients apparaîtront ici"}
              </Text>
              {activeFilter !== "all" && (
                <TouchableOpacity
                  style={styles.resetFilterButton}
                  onPress={() => handleFilterChange("all")}
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

  /* Stats card */
  statsCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsLeft: {
    alignItems: "center",
    marginRight: 20,
    minWidth: 80,
  },
  statsAverage: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: "#1F2937",
  },
  statsTotal: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#6B7280",
    marginTop: 4,
  },
  statsRight: {
    flex: 1,
    gap: 4,
  },
  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distributionStar: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
    width: 12,
    textAlign: "right",
  },
  distributionTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  distributionFill: {
    height: "100%",
    backgroundColor: "#d4a843",
    borderRadius: 3,
  },
  distributionCount: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
    width: 24,
    textAlign: "right",
  },

  /* Stars */
  starRow: {
    flexDirection: "row",
    gap: 2,
  },

  /* Filter chips */
  filterContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    marginTop: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
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
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#1F2937",
    flex: 1,
  },
  clientPhone: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#6B7280",
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

  /* Admin response (existing) */
  responseContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: "#1D4ED8",
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#374151",
    lineHeight: 20,
  },
  responseDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#6B7280",
    marginTop: 6,
  },

  /* Respond button */
  respondButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#d4a843",
    backgroundColor: "#FFFBF0",
  },
  respondButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#d4a843",
  },

  /* Response input */
  responseInputContainer: {
    marginTop: 12,
  },
  responseInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#1F2937",
    minHeight: 80,
    textAlignVertical: "top",
  },
  responseActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#6B7280",
  },
  submitButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#d4a843",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
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
  resetFilterButton: {
    marginTop: 16,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetFilterText: {
    fontSize: 14,
    fontFamily: Fonts.meduim,
    color: "#4B5563",
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
