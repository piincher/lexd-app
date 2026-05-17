/**
 * BadgeItem - Single badge display component
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import type { UserBadge } from "../../api/badgeApi";

const BADGE_SIZE = 52;

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

const tierColors: Record<string, string> = {
  BRONZE: "#CD7F32", SILVER: "#C0C0C0", GOLD: "#d4a843", PLATINUM: "#E5E4E2",
};

interface BadgeItemProps {
  badge: UserBadge;
  isDark: boolean;
  colors: {
    text: { primary: string; disabled: string };
    neutral: { [key: string]: string };
    accent?: { gold?: string };
  };
}

export const BadgeItem: React.FC<BadgeItemProps> = ({ badge, isDark, colors }) => {
  const iconName = iconMap[badge.icon] || "help-circle";
  const color = badge.earned ? tierColors[badge.tier] || "#d4a843" : colors.text.disabled;
  const unearnedBg = colors.background.card;
  const unearnedBorder = colors.border;

  return (
    <View style={styles.badgeWrapper}>
      <View style={[styles.badgeCircle, {
        backgroundColor: badge.earned ? `${color}20` : unearnedBg,
        borderColor: badge.earned ? color : unearnedBorder
      }]}>
        {badge.earned ? (
          <MaterialCommunityIcons name={iconName} size={22} color={color} />
        ) : (
          <MaterialCommunityIcons name="lock" size={16} color={colors.text.disabled} />
        )}
      </View>
      {!badge.earned && badge.progressPercentage > 0 && (
        <View style={[styles.miniProgressTrack, { backgroundColor: colors.background.overlay }]}>
          <View style={[styles.miniProgressFill, { width: `${Math.min(badge.progressPercentage, 100)}%`, backgroundColor: colors.accent.gold || "#d4a843" }]} />
        </View>
      )}
      <Text style={[styles.badgeLabel, { color: badge.earned ? colors.text.primary : colors.text.disabled }]} numberOfLines={1}>
        {badge.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeWrapper: { alignItems: "center", width: BADGE_SIZE + 12 },
  badgeCircle: { width: BADGE_SIZE, height: BADGE_SIZE, borderRadius: BADGE_SIZE / 2, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  badgeLabel: { fontFamily: Fonts.meduim, fontSize: 9, marginTop: 4, textAlign: "center" },
  miniProgressTrack: { width: BADGE_SIZE - 8, height: 3, borderRadius: 1.5, overflow: "hidden", marginTop: 3 },
  miniProgressFill: { height: "100%", borderRadius: 1.5 },
});
