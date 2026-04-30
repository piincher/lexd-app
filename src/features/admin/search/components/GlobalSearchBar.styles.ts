import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  searchContainer: {
    marginHorizontal: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.md,
  },
  searchContainerFocused: {
    ...Theme.shadows.lg,
  },
  searchGradient: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    height: 52,
  },
  searchIcon: {
    marginRight: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: Theme.neutral[800],
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.primary[100],
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    top: 60,
    left: Theme.spacing.xl,
    right: Theme.spacing.xl,
    maxHeight: 400,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.xl,
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownGradient: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Theme.neutral[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.primary[500],
  },
  categorySection: {
    marginBottom: Theme.spacing.sm,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Theme.neutral[400],
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: 4,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
  },
  suggestionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.primary[50],
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.sm,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.neutral[800],
  },
  suggestionSubtitle: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
  },
  recentIcon: {
    marginRight: Theme.spacing.sm,
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    color: Theme.neutral[700],
  },
  removeRecentButton: {
    padding: 4,
  },
});
