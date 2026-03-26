import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  clientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rank: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  goodsCount: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF4444",
    marginRight: 8,
  },
  action: {
    padding: 4,
  },
  empty: {
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
});
