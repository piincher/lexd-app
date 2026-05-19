import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 40,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
    textAlign: "center",
  },
});
