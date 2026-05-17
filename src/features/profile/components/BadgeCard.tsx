/**
 * BadgeCard
 * Single badge card in the grid
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { UserBadge } from "../api/badgeApi";

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

const tierConfig: Record<string, { color: string; label: string }> = {
  BRONZE: { color: "#CD7F32", label: "Bronze" },
  SILVER: { color: "#C0C0C0", label: "Argent" },
  GOLD: { color: "#d4a843", label: "Or" },
  PLATINUM: { color: "#E5E4E2", label: "Platine" },
};

interface BadgeCardProps {
  badge: UserBadge;
  index: number;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, index }) => {
  const { colors, isDark } = useAppTheme();
  const iconName = iconMap[badge.icon] || "help-circle";
  const tier = tierConfig[badge.tier] || tierConfig.BRONZE;
  const color = badge.earned ? tier.color : colors.text.disabled;

  const cardDynamicStyle = badge.earned
    ? { borderColor: `${tier.color}40`, backgroundColor: `${tier.color}10` }
    : { borderColor: colors.border, backgroundColor: colors.background.card };

  const iconCircleDynamicStyle = {
    backgroundColor: badge.earned ? `${color}20` : colors.background.overlay,
    borderColor: badge.earned ? color : colors.border,
    ...(badge.earned ? {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    } : {}),
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: index * 60, damping: 15, stiffness: 120 }}
      style={[styles.badgeCard, cardDynamicStyle]}
    >
      {badge.earned && (
        <View style={[styles.tierLabel, { backgroundColor: `${tier.color}30` }]}>
          <Text style={[styles.tierLabelText, { color: tier.color }]}>{tier.label}</Text>
        </View>
      )}

      <View style={[styles.badgeIconCircle, iconCircleDynamicStyle]}>
        {badge.earned ? (
          <MaterialCommunityIcons name={iconName} size={28} color={color} />
        ) : (
          <MaterialCommunityIcons name="lock" size={22} color={colors.text.disabled} />
        )}
      </View>

      <Text
        style={[styles.badgeName, { color: badge.earned ? colors.text.primary : colors.text.disabled }]}
        numberOfLines={1}
      >
        {badge.name}
      </Text>

      <Text
        style={[styles.badgeDescription, { color: badge.earned ? colors.text.secondary : colors.text.disabled }]}
        numberOfLines={2}
      >
        {badge.description}
      </Text>

      {!badge.earned && (
        <View style={styles.progressSection}>
          <View style={[styles.progressTrack, { backgroundColor: colors.background.overlay }]}>
            <View style={[styles.progressFill, { width: `${Math.min(badge.progressPercentage, 100)}%`, backgroundColor: colors.accent.gold }]} />
          </View>
          <Text style={[styles.progressLabel, { color: colors.text.disabled }]}>
            {badge.currentProgress}{badge.thresholdType === "CBM" ? " CBM" : ""} / {badge.threshold}{badge.thresholdType === "CBM" ? " CBM" : ""}
          </Text>
        </View>
      )}

      {badge.earned && badge.earnedAt && (
        <Text style={[styles.earnedDate, { color: colors.text.disabled }]}>
          Obtenu le {new Date(badge.earnedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
        </Text>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  badgeCard: { width: "47%", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, minHeight: 170 },
  tierLabel: { position: "absolute", top: 8, right: 8, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  tierLabelText: { fontFamily: Fonts.bold, fontSize: 9 },
  badgeIconCircle: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, alignItems: "center", justifyContent: "center", marginBottom: 10, marginTop: 4 },
  badgeName: { fontFamily: Fonts.bold, fontSize: 14, textAlign: "center", marginBottom: 4 },
  badgeDescription: { fontFamily: Fonts.regular, fontSize: 11, textAlign: "center", lineHeight: 15, marginBottom: 8 },
  progressSection: { width: "100%", marginTop: "auto" },
  progressTrack: { height: 5, borderRadius: 2.5, overflow: "hidden", marginBottom: 4 },
  progressFill: { height: "100%", borderRadius: 2.5 },
  progressLabel: { fontFamily: Fonts.meduim, fontSize: 10, textAlign: "center" },
  earnedDate: { fontFamily: Fonts.regular, fontSize: 10, marginTop: "auto" },
});
