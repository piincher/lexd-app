/**
 * BadgesSection Component
 * Displays a compact badges overview on the Profile screen.
 * Shows earned/total count, horizontal scrollable badge row,
 * and a "Voir tout" button to navigate to the full BadgesScreen.
 */

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { navigationProps } from "@src/navigations/type";
import { useMyBadges, useCheckBadges } from "../../hooks/useBadges";
import type { UserBadge } from "../../api/badgeApi";

const BADGE_SIZE = 52;

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
 * Tier color mapping
 */
const tierColors: Record<string, string> = {
  BRONZE: "#CD7F32",
  SILVER: "#C0C0C0",
  GOLD: "#d4a843",
  PLATINUM: "#E5E4E2",
};

/**
 * Single badge circle for the horizontal row
 */
const BadgeItem: React.FC<{ badge: UserBadge }> = ({ badge }) => {
  const iconName = iconMap[badge.icon] || "help-circle";
  const color = badge.earned ? tierColors[badge.tier] || "#d4a843" : "rgba(255,255,255,0.2)";

  return (
    <View style={styles.badgeWrapper}>
      <View
        style={[
          styles.badgeCircle,
          {
            backgroundColor: badge.earned ? `${color}20` : "rgba(255,255,255,0.05)",
            borderColor: badge.earned ? color : "rgba(255,255,255,0.12)",
          },
        ]}
      >
        {badge.earned ? (
          <MaterialCommunityIcons name={iconName} size={22} color={color} />
        ) : (
          <MaterialCommunityIcons name="lock" size={16} color="rgba(255,255,255,0.2)" />
        )}
      </View>

      {/* Mini progress bar for unearned badges */}
      {!badge.earned && badge.progressPercentage > 0 && (
        <View style={styles.miniProgressTrack}>
          <View
            style={[
              styles.miniProgressFill,
              { width: `${Math.min(badge.progressPercentage, 100)}%` },
            ]}
          />
        </View>
      )}

      <Text
        style={[
          styles.badgeLabel,
          { color: badge.earned ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" },
        ]}
        numberOfLines={1}
      >
        {badge.name}
      </Text>
    </View>
  );
};

/**
 * BadgesSection - Profile screen section component
 */
export const BadgesSection: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { data, isLoading } = useMyBadges();
  const checkBadges = useCheckBadges();

  // Trigger badge check on mount (non-blocking)
  useEffect(() => {
    checkBadges.mutate();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#d4a843" />
          <Text style={styles.loadingText}>Chargement des badges...</Text>
        </View>
      </View>
    );
  }

  if (!data || !data.badges || data.badges.length === 0) {
    return null;
  }

  const { badges, summary } = data;

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
        onPress={() => navigation.navigate("Badges")}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="medal" size={20} color="#d4a843" />
          <Text style={styles.headerTitle}>Mes Badges</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {summary.earnedCount}/{summary.totalBadges}
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
        </View>
      </TouchableOpacity>

      {/* Horizontal scrollable badge row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.badgesRow}
      >
        {badges.map((badge) => (
          <BadgeItem key={badge.badgeId} badge={badge} />
        ))}
      </ScrollView>

      {/* Footer link */}
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigation.navigate("Badges")}
        activeOpacity={0.7}
      >
        <Text style={styles.viewAllText}>Voir tous les badges</Text>
        <MaterialCommunityIcons name="arrow-right" size={14} color="#d4a843" />
      </TouchableOpacity>
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
  // Badge row
  badgesRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 4,
  },
  badgeWrapper: {
    alignItems: "center",
    width: BADGE_SIZE + 12,
  },
  badgeCircle: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 9,
    marginTop: 4,
    textAlign: "center",
  },
  miniProgressTrack: {
    width: BADGE_SIZE - 8,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 1.5,
    overflow: "hidden",
    marginTop: 3,
  },
  miniProgressFill: {
    height: "100%",
    backgroundColor: "#d4a843",
    borderRadius: 1.5,
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
