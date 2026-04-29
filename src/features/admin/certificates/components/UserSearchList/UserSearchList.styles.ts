import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Theme.colors.text.disabled,
    textAlign: "center",
  },
});
