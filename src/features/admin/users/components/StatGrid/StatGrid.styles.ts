import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: "600",
    textAlign: "center",
  },
});
