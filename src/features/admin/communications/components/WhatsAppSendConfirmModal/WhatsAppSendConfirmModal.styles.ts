import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Theme.spacing.xl,
      backgroundColor: colors.background.overlay,
    },
    card: {
      width: "100%",
      borderRadius: Theme.radius.lg,
      backgroundColor: colors.background.card,
      padding: Theme.spacing.lg,
      gap: Theme.spacing.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: Theme.spacing.sm,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary[50],
    },
    title: {
      fontSize: 17,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    summaryBox: {
      borderRadius: Theme.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Theme.spacing.md,
      gap: Theme.spacing.sm,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Theme.spacing.sm,
    },
    summaryLabel: {
      flex: 1,
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    summaryValue: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    previewLabel: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
    },
    preview: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
      backgroundColor: colors.background.paper,
      borderRadius: Theme.radius.sm,
      padding: Theme.spacing.sm,
    },
    actions: {
      flexDirection: "row",
      gap: Theme.spacing.sm,
      marginTop: 2,
    },
    button: {
      flex: 1,
      borderRadius: Theme.radius.md,
    },
  });
