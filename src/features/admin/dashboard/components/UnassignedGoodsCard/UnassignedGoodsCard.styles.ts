import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  goodsId: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.text.primary,
  },
  description: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  client: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  phone: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginTop: 1,
  },
  right: {
    alignItems: "center",
    marginLeft: 8,
  },
  badge: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  daysText: {
    fontSize: 12,
    fontWeight: "700",
  },
  chevron: {
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  date: {
    fontSize: 12,
    color: Theme.colors.text.disabled,
    flex: 1,
  },
  modeBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  modeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#3B82F6",
  },
});
