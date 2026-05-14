import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#d4a843",
    backgroundColor: "Theme.colors.status.warning + '10'",
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
    color: Theme.colors.text.primary,
  },
  badge: {
    backgroundColor: "Theme.colors.status.warning + '15'",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D97706",
  },
  phone: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
    marginBottom: 2,
  },
  cbm: {
    fontSize: 13,
    color: "#d4a843",
    fontWeight: "600",
  },
  indicator: {
    marginLeft: 12,
  },
});
