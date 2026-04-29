/**
 * BadgeCategorySection
 * Category section with title and badge grid
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import type { UserBadge } from "../api/badgeApi";
import { BadgeCard } from "./BadgeCard";

const categoryLabels: Record<string, { title: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = {
  VOLUME: { title: "Volume", icon: "cube-send" },
  LOYALTY: { title: "Fidélité", icon: "heart-multiple" },
  ACHIEVEMENT: { title: "Accomplissement", icon: "trophy-variant" },
};

interface BadgeCategorySectionProps {
  category: string;
  badges: UserBadge[];
  startIndex: number;
}

export const BadgeCategorySection: React.FC<BadgeCategorySectionProps> = ({
  category,
  badges,
  startIndex,
}) => {
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

const styles = StyleSheet.create({
  categorySection: { marginBottom: 24 },
  categoryHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  categoryTitle: { color: "#FFFFFF", fontFamily: Fonts.bold, fontSize: 16 },
  categoryLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginLeft: 8 },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
});
