import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.04,
  },
  blockedCard: {
    backgroundColor: isDark ? "#7F1D1D" : "#FEF2F2",
  },
  accentBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  info: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  blockedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: isDark ? "#7F1D1D" : "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 4,
  },
  blockedText: {
    fontSize: 11,
    fontWeight: "700",
    color: isDark ? "#FCA5A5" : "#EF4444",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 6,
  },
  phone: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  email: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: "400",
    flex: 1,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  blockButton: {
    backgroundColor: isDark ? "#7F1D1D" : "#FEE2E2",
  },
  unblockButton: {
    backgroundColor: isDark ? "#14532D" : "#DCFCE7",
  },
  deleteButton: {
    backgroundColor: isDark ? "#7F1D1D" : "#FEE2E2",
  },
});
