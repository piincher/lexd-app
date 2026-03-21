/**
 * BadgesScreen
 * Full screen showing all badges in a categorized grid.
 * Categories: Volume, Fidélité, Accomplissement
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { navigationProps } from "@src/navigations/type";
import { useMyBadges, useCheckBadges } from "../hooks/useBadges";
import type { UserBadge } from "../api/badgeApi";

/**
 * Map badge icon names to MaterialCommunityIcons glyph names
 */
const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  "package-variant": "package-variant",
  "compass-outline": "compass-outline",
  "map-marker-distance": "map-marker-distance",
  store: "store",
  "star-circle": "star-circle",
  "diamond-stone": "diamond-stone",
  "truck-delivery": "truck-delivery",
  heart: "heart",
  "shield-star": "shield-star",
  certificate: "certificate",
};

/**
 * Tier color and label mapping
 */
const tierConfig: Record<string, { color: string; label: string }> = {
  BRONZE: { color: "#CD7F32", label: "Bronze" },
  SILVER: { color: "#C0C0C0", label: "Argent" },
  GOLD: { color: "#d4a843", label: "Or" },
  PLATINUM: { color: "#E5E4E2", label: "Platine" },
};

/**
 * Category labels in French
 */
const categoryLabels: Record<string, { title: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = {
  VOLUME: { title: "Volume", icon: "cube-send" },
  LOYALTY: { title: "Fidélité", icon: "heart-multiple" },
  ACHIEVEMENT: { title: "Accomplissement", icon: "trophy-variant" },
};

/**
 * Single badge card in the grid
 */
const BadgeCard: React.FC<{ badge: UserBadge; index: number }> = ({ badge, index }) => {
  const iconName = iconMap[badge.icon] || "help-circle";
  const tier = tierConfig[badge.tier] || tierConfig.BRONZE;
  const color = badge.earned ? tier.color : "rgba(255,255,255,0.2)";

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: index * 60, damping: 15, stiffness: 120 }}
      style={[
        styles.badgeCard,
        badge.earned && {
          borderColor: `${tier.color}40`,
          backgroundColor: `${tier.color}10`,
        },
      ]}
    >
      {/* Tier label */}
      {badge.earned && (
        <View style={[styles.tierLabel, { backgroundColor: `${tier.color}30` }]}>
          <Text style={[styles.tierLabelText, { color: tier.color }]}>{tier.label}</Text>
        </View>
      )}

      {/* Icon */}
      <View
        style={[
          styles.badgeIconCircle,
          {
            backgroundColor: badge.earned ? `${color}20` : "rgba(255,255,255,0.05)",
            borderColor: badge.earned ? color : "rgba(255,255,255,0.12)",
          },
          badge.earned && {
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 4,
          },
        ]}
      >
        {badge.earned ? (
          <MaterialCommunityIcons name={iconName} size={28} color={color} />
        ) : (
          <MaterialCommunityIcons name="lock" size={22} color="rgba(255,255,255,0.2)" />
        )}
      </View>

      {/* Name */}
      <Text
        style={[
          styles.badgeName,
          { color: badge.earned ? "#FFFFFF" : "rgba(255,255,255,0.4)" },
        ]}
        numberOfLines={1}
      >
        {badge.name}
      </Text>

      {/* Description */}
      <Text
        style={[
          styles.badgeDescription,
          { color: badge.earned ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" },
        ]}
        numberOfLines={2}
      >
        {badge.description}
      </Text>

      {/* Progress bar for unearned badges */}
      {!badge.earned && (
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(badge.progressPercentage, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {badge.currentProgress}
            {badge.thresholdType === "CBM" ? " CBM" : ""} / {badge.threshold}
            {badge.thresholdType === "CBM" ? " CBM" : ""}
          </Text>
        </View>
      )}

      {/* Earned date */}
      {badge.earned && badge.earnedAt && (
        <Text style={styles.earnedDate}>
          Obtenu le{" "}
          {new Date(badge.earnedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      )}
    </MotiView>
  );
};

/**
 * Category section with title and badge grid
 */
const CategorySection: React.FC<{
  category: string;
  badges: UserBadge[];
  startIndex: number;
}> = ({ category, badges, startIndex }) => {
  const config = categoryLabels[category] || { title: category, icon: "help-circle" as const };

  if (badges.length === 0) return null;

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <MaterialCommunityIcons name={config.icon} size={20} color="#d4a843" />
        <Text style={styles.categoryTitle}>{config.title}</Text>
        <View style={styles.categoryLine} />
      </View>
      <View style={styles.badgeGrid}>
        {badges.map((badge, idx) => (
          <BadgeCard key={badge.badgeId} badge={badge} index={startIndex + idx} />
        ))}
      </View>
    </View>
  );
};

/**
 * BadgesScreen Component
 */
const BadgesScreen: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { data, isLoading, refetch, isRefetching } = useMyBadges();
  const checkBadges = useCheckBadges();

  const handleRefresh = async () => {
    await checkBadges.mutateAsync();
    refetch();
  };

  // Group badges by category
  const volumeBadges = data?.badges.filter((b) => b.category === "VOLUME") || [];
  const loyaltyBadges = data?.badges.filter((b) => b.category === "LOYALTY") || [];
  const achievementBadges = data?.badges.filter((b) => b.category === "ACHIEVEMENT") || [];

  return (
    <LinearGradient colors={["#1a237e", "#4a148c", "#880e4f"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes Badges</Text>
          <View style={styles.headerSpacer} />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#d4a843" />
            <Text style={styles.loadingText}>Chargement des badges...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={handleRefresh}
                tintColor="#d4a843"
                colors={["#d4a843"]}
              />
            }
          >
            {/* Summary card */}
            {data?.summary && (
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                style={styles.summaryCard}
              >
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="medal" size={24} color="#d4a843" />
                    <Text style={styles.summaryValue}>{data.summary.earnedCount}</Text>
                    <Text style={styles.summaryLabel}>Badges obtenus</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="cube-send" size={24} color="#3B82F6" />
                    <Text style={styles.summaryValue}>{data.summary.totalCBM.toFixed(1)}</Text>
                    <Text style={styles.summaryLabel}>CBM total</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <MaterialCommunityIcons name="truck-check" size={24} color="#10B981" />
                    <Text style={styles.summaryValue}>{data.summary.shipmentCount}</Text>
                    <Text style={styles.summaryLabel}>Expéditions</Text>
                  </View>
                </View>
              </MotiView>
            )}

            {/* Badge categories */}
            <CategorySection
              category="VOLUME"
              badges={volumeBadges}
              startIndex={0}
            />
            <CategorySection
              category="LOYALTY"
              badges={loyaltyBadges}
              startIndex={volumeBadges.length}
            />
            <CategorySection
              category="ACHIEVEMENT"
              badges={achievementBadges}
              startIndex={volumeBadges.length + loyaltyBadges.length}
            />

            {/* Bottom spacer */}
            <View style={{ height: 40 }} />
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  headerSpacer: {
    width: 40,
  },
  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  // Summary card
  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.2)",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 22,
    marginTop: 6,
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 2,
    textAlign: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  // Category
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 8,
  },
  // Badge grid (2 columns)
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  // Badge card
  badgeCard: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    minHeight: 170,
  },
  tierLabel: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tierLabelText: {
    fontFamily: Fonts.bold,
    fontSize: 9,
  },
  badgeIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 4,
  },
  badgeName: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  badgeDescription: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 15,
    marginBottom: 8,
  },
  // Progress
  progressSection: {
    width: "100%",
    marginTop: "auto",
  },
  progressTrack: {
    height: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2.5,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#d4a843",
    borderRadius: 2.5,
  },
  progressLabel: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: Fonts.meduim,
    fontSize: 10,
    textAlign: "center",
  },
  // Earned date
  earnedDate: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: Fonts.regular,
    fontSize: 10,
    marginTop: "auto",
  },
});

export default BadgesScreen;
