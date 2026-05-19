import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral[600],
    marginBottom: Theme.spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    backgroundColor: colors.neutral[50],
    marginBottom: Theme.spacing.xl,
  },
  dateBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral[700],
  },
  chip: {
    backgroundColor: colors.primary[50],
    marginBottom: Theme.spacing.xl,
    alignSelf: "flex-start",
  },
});
