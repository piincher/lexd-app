import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: "center",
    paddingVertical: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  orderItemLast: {
    borderBottomWidth: 0,
  },
  orderInfo: {},
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
  },
  orderDate: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
