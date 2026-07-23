/**
 * MilestoneBadges Styles
 */

import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

const BADGE_SIZE = 50;

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  "package-variant": "package-variant",
  compass: "compass",
  airplane: "airplane",
  store: "store",
  star: "star",
  diamond: "diamond-stone",
  trophy: "trophy",
};

export const getStyles = (colors: any) =>
  StyleSheet.create({
    card: { borderRadius: RADIUS.card, padding: 16, marginBottom: 12 },
    loadingContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 8 },
    loadingText: { fontFamily: Fonts.regular, fontSize: 13 },
    errorContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 24, gap: 12 },
    errorText: { fontFamily: Fonts.meduim, fontSize: 14, textAlign: "center" },
    retryButton: { marginTop: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: hexToRgba(colors.accent.gold, 0.15), borderRadius: RADIUS.control, borderWidth: HAIRLINE, borderColor: hexToRgba(colors.accent.gold, 0.3) },
    retryText: { fontFamily: Fonts.meduim, fontSize: 13 },
    emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 24, gap: 12 },
    emptyText: { fontFamily: Fonts.meduim, fontSize: 14, textAlign: "center" },
    currentBadgeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
    currentBadgeCircle: { width: 56, height: 56, borderRadius: 28, borderWidth: 2.5, alignItems: "center", justifyContent: "center" },
    currentBadgeInfo: { flex: 1 },
    currentBadgeName: { fontFamily: Fonts.bold, fontSize: 16 },
    currentBadgeDescription: { fontFamily: Fonts.regular, fontSize: 12, marginTop: 2 },
    progressSection: { marginBottom: 14 },
    progressBarTrack: { height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 6 },
    progressBarFill: { height: "100%", borderRadius: 4 },
    progressText: { fontFamily: Fonts.meduim, fontSize: 12 },
    maxLevelText: { fontFamily: Fonts.bold, fontSize: 13, textAlign: "center", marginBottom: 14 },
    badgesRow: { flexDirection: "row", gap: 12, paddingVertical: 4 },
    badgeWrapper: { alignItems: "center", width: BADGE_SIZE + 10 },
    badgeCircle: { width: BADGE_SIZE, height: BADGE_SIZE, borderRadius: BADGE_SIZE / 2, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
    badgeLabel: { fontFamily: Fonts.meduim, fontSize: 9, marginTop: 4, textAlign: "center" },
  });
