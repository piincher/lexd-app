/**
 * CategorySectionSkeleton Styles
 */

import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 8,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
