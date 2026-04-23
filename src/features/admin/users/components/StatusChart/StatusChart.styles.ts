import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 20,
    padding: 40,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    marginTop: 16,
    textAlign: "center",
  },
});
