import { StyleSheet } from "react-native";


export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  badge: {
    backgroundColor: colors.status.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.status.warning,
  },
  phone: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  cbm: {
    fontSize: 13,
    color: colors.primary.main,
    fontWeight: "600",
  },
  indicator: {
    marginLeft: 12,
  },
});
