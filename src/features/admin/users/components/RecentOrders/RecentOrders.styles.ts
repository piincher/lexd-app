import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
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
    color: Theme.colors.text.primary,
  },
  viewAll: {
    fontSize: 14,
    color: Theme.colors.primary.main,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 15,
    color: Theme.colors.text.secondary,
    textAlign: "center",
    paddingVertical: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  orderItemLast: {
    borderBottomWidth: 0,
  },
  orderInfo: {},
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.text.primary,
  },
  orderDate: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
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
