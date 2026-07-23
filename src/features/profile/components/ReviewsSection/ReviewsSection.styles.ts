/**
 * ReviewsSection Styles
 */

import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS } from "@src/shared/ui/designLanguage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStyles = (colors: any) => StyleSheet.create({
  card: {
    borderRadius: RADIUS.card,
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
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
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
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countBadge: {
    backgroundColor: colors.accent.gold + '33',
    borderRadius: RADIUS.badge,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    color: colors.accent.goldDark,
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  ratingCount: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  emptyTitle: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginTop: 8,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.control,
  },
  retryText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    color: colors.accent.goldDark,
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
});
