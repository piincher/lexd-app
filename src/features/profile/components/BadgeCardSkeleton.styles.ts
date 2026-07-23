/**
 * BadgeCardSkeleton Styles
 */

import { StyleSheet } from "react-native";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  badgeCard: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: RADIUS.card,
    padding: 14,
    alignItems: "center",
    borderWidth: HAIRLINE,
    borderColor: "rgba(255,255,255,0.08)",
    minHeight: 170,
  },
  progressSection: {
    width: "100%",
    marginTop: "auto",
  },
});
