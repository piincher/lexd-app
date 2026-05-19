import { StyleSheet } from "react-native";
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    borderRadius: Theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: colors.primary[50],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary[200],
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary[700],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  body: {
    maxHeight: 300,
  },
  emptyState: {
    padding: Theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral[400],
  },
});
