import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const createWhatsappNotifyStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Theme.spacing.md,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    iconWrap: {
      marginRight: Theme.spacing.md,
    },
    textWrap: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.neutral[800],
    },
    subtitle: {
      fontSize: 12,
      color: colors.neutral[500],
      marginTop: 2,
    },
  });
