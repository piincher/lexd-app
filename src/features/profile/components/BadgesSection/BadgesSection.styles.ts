/**
 * BadgesSection Styles
 */

import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { RADIUS } from "@src/shared/ui/designLanguage";

export const styles = StyleSheet.create({
  card: { borderRadius: RADIUS.card, padding: 16, marginBottom: 12 },
  loadingContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 8 },
  loadingText: { fontFamily: Fonts.regular, fontSize: 13 },
  emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 24 },
  emptyText: { fontFamily: Fonts.meduim, fontSize: 14, marginTop: 8 },
  emptySubtext: { fontFamily: Fonts.regular, fontSize: 12, marginTop: 4, textAlign: "center" },
  retryButton: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.control },
  retryText: { fontFamily: Fonts.meduim, fontSize: 13 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 16 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  countBadge: { borderRadius: RADIUS.badge, paddingHorizontal: 8, paddingVertical: 2 },
  countText: { fontFamily: Fonts.bold, fontSize: 12 },
  badgesRow: { flexDirection: "row", gap: 10, paddingVertical: 4 },
  viewAllButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, paddingVertical: 6 },
  viewAllText: { fontFamily: Fonts.meduim, fontSize: 13 },
});
